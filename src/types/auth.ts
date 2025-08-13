export interface LoginRequest {
  client_id: string
  client_secret: string
  grant_type: string
  username?: string
  password?: string
}

export interface AuthResponse {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  'not-before-policy': number
  session_state: string
  scope: string
}

export interface SignupRequest {
  createdTimestamp?: number
  username: string
  enabled: boolean
  totp: boolean
  emailVerified: boolean
  firstName: string
  lastName: string
  email: string
  disableableCredentialTypes: string[]
  requiredActions: string[]
  notBefore: number
  access: {
    manageGroupMembership: boolean
    view: boolean
    mapRoles: boolean
    impersonate: boolean
    manage: boolean
  }
  realmRoles?: string[]
  groupIds?: string[]
  groups?: string[]
  credentials?: Array<{
    type: string
    value: string
    temporary: boolean
  }>
}

export interface AuthUser {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  token: string
  refreshToken: string

  // Keycloak specific
  realmAccess: {
    roles?: string[]
  }
  resourceAccess: {
    [resource: string]: {
      roles?: string[]
    }
  }
  scope: string
  emailVerified: boolean
  fullName: string
  groups: string[]
}
