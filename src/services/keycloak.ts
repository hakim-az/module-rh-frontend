import type { AuthResponse, SignupRequest } from '@/types/auth'

const KEYCLOAK_BASE_URL = import.meta.env.VITE_KEYCLOAK_BASE_URL
const REALM = import.meta.env.VITE_KEYCLOAK_REALM
const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET

class KeycloakService {
  private adminToken: string | null = null

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(
      `${KEYCLOAK_BASE_URL}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'password',
          username,
          password,
        }),
      }
    )

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: 'Invalid credentials' }))
      throw new Error(error.error_description || error.error || 'Login failed')
    }

    return response.json()
  }

  async getAdminToken(): Promise<string> {
    if (this.adminToken) {
      return this.adminToken
    }

    const response = await fetch(
      `${KEYCLOAK_BASE_URL}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'client_credentials',
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to get admin token')
    }

    const data: AuthResponse = await response.json()
    this.adminToken = data.access_token

    // Clear admin token before it expires
    setTimeout(
      () => {
        this.adminToken = null
      },
      (data.expires_in - 60) * 1000
    )

    return this.adminToken
  }

  async signup(
    userData: Omit<
      SignupRequest,
      | 'createdTimestamp'
      | 'enabled'
      | 'totp'
      | 'emailVerified'
      | 'disableableCredentialTypes'
      | 'requiredActions'
      | 'notBefore'
      | 'access'
      | 'realmRoles'
    > & {
      password: string
      telephonePersonnel: string
      avatar?: string
      role?: string
      statut?: string
    }
  ): Promise<void> {
    const adminToken = await this.getAdminToken()

    const signupData: SignupRequest = {
      createdTimestamp: Date.now(),
      username: userData.username,
      enabled: true,
      totp: false,
      emailVerified: true,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      disableableCredentialTypes: [],
      requiredActions: [],
      notBefore: 0,
      access: {
        manageGroupMembership: true,
        view: true,
        mapRoles: true,
        impersonate: true,
        manage: true,
      },
      realmRoles: ['EMPLOYEE'],
      credentials: [
        {
          type: 'password',
          value: userData.password,
          temporary: false,
        },
      ],
    }

    // 1. Create Keycloak user
    const kcResponse = await fetch(
      `${KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(signupData),
      }
    )

    if (!kcResponse.ok) {
      const error = await kcResponse
        .json()
        .catch(() => ({ error: 'Signup failed' }))
      throw new Error(
        error.errorMessage || error.error || 'Failed to create user'
      )
    }

    // 2. Extract Keycloak user ID from Location header
    const locationHeader = kcResponse.headers.get('Location')
    if (!locationHeader) throw new Error('Keycloak did not return user ID')
    const keycloakId = locationHeader.split('/').pop()

    // 3. Register user in your backend database
    try {
      const formData = new FormData()
      formData.append('id', keycloakId!)
      formData.append('role', 'employee')
      formData.append('statut', 'user-registred')
      formData.append('avatar', '')
      formData.append('emailPersonnel', userData.email)
      formData.append('nomDeNaissance', userData.lastName)
      formData.append('password', userData.password)
      formData.append('prenom', userData.firstName)
      formData.append('telephonePersonnel', userData.telephonePersonnel)

      const apiResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text()

        // ❌ Cleanup: Delete Keycloak user on API failure
        await fetch(
          `${KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users/${keycloakId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        )

        throw new Error(`Failed to create user in app: ${errorText}`)
      }
    } catch (err) {
      // Fallback cleanup in case of unexpected error
      await fetch(
        `${KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users/${keycloakId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      )

      throw err
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(
      `${KEYCLOAK_BASE_URL}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    return response.json()
  }
}

export const keycloakService = new KeycloakService()
