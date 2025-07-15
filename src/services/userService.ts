import axios, { type AxiosResponse } from 'axios'
import type { CreateUserDto, User, ApiResponse } from '@/types/user.types'

const API_BASE_URL = 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

export class UserService {
  static async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const formData = new FormData()

      // Add basic user fields
      formData.append('role', userData.role)
      formData.append('statut', userData.statut)
      formData.append('civilite', userData.civilite)
      formData.append('prenom', userData.prenom)
      formData.append('nomDeNaissance', userData.nomDeNaissance)

      if (userData.nomUsuel) {
        formData.append('nomUsuel', userData.nomUsuel)
      }

      formData.append('situationFamiliale', userData.situationFamiliale)
      formData.append('numeroSecuriteSociale', userData.numeroSecuriteSociale)
      formData.append('emailPersonnel', userData.emailPersonnel)

      if (userData.emailProfessionnel) {
        formData.append('emailProfessionnel', userData.emailProfessionnel)
      }

      formData.append('telephonePersonnel', userData.telephonePersonnel)

      if (userData.telephoneProfessionnel) {
        formData.append(
          'telephoneProfessionnel',
          userData.telephoneProfessionnel
        )
      }

      formData.append('avatar', userData.avatar || '')

      // Add nested objects as JSON strings
      if (userData.naissance) {
        formData.append('naissance[idUser]', 'test1234')
        formData.append(
          'naissance[dateDeNaissance]',
          userData.naissance.dateDeNaissance
        )
        formData.append(
          'naissance[paysDeNaissance]',
          userData.naissance.paysDeNaissance
        )
        formData.append(
          'naissance[departementDeNaissance]',
          userData.naissance.departementDeNaissance
        )
        formData.append(
          'naissance[communeDeNaissance]',
          userData.naissance.communeDeNaissance
        )
        formData.append(
          'naissance[paysDeNationalite]',
          userData.naissance.paysDeNationalite
        )
      }

      if (userData.adresse) {
        formData.append('adresse[idUser]', 'test1234')
        formData.append('adresse[pays]', userData.adresse.pays)
        formData.append('adresse[codePostal]', userData.adresse.codePostal)
        formData.append('adresse[ville]', userData.adresse.ville)
        formData.append('adresse[adresse]', userData.adresse.adresse)
        if (userData.adresse.complementAdresse) {
          formData.append(
            'adresse[complementAdresse]',
            userData.adresse.complementAdresse
          )
        }
        formData.append('adresse[domiciliteHorsLaFrance]', 'false')
      }

      if (userData.paiement) {
        formData.append('paiement[idUser]', 'test1234')
        formData.append('paiement[iban]', userData.paiement.iban)
        formData.append('paiement[bic]', userData.paiement.bic)
      }

      if (userData.urgence) {
        formData.append('urgence[idUser]', 'test1234')
        formData.append('urgence[nomComplet]', userData.urgence.nomComplet)
        formData.append(
          'urgence[lienAvecLeSalarie]',
          userData.urgence.lienAvecLeSalarie
        )
        formData.append('urgence[telephone]', userData.urgence.telephone)
      }

      // Add files individually if they exist
      if (userData.justificatif) {
        console.log('Processing justificatif files:', {
          fichierCarteVitalePdf:
            userData.justificatif.fichierCarteVitalePdf?.name,
          fichierRibPdf: userData.justificatif.fichierRibPdf?.name,
          fichierPieceIdentitePdf:
            userData.justificatif.fichierPieceIdentitePdf?.name,
          fichierJustificatifDomicilePdf:
            userData.justificatif.fichierJustificatifDomicilePdf?.name,
        })

        if (
          userData.justificatif.fichierCarteVitalePdf &&
          userData.justificatif.fichierCarteVitalePdf instanceof File
        ) {
          formData.append(
            'justificatif[fichierCarteVitalePdf]',
            userData.justificatif.fichierCarteVitalePdf
          )
          console.log('Added fichierCarteVitalePdf to FormData')
        }
        if (
          userData.justificatif.fichierRibPdf &&
          userData.justificatif.fichierRibPdf instanceof File
        ) {
          formData.append(
            'justificatif[fichierRibPdf]',
            userData.justificatif.fichierRibPdf
          )
          console.log('Added fichierRibPdf to FormData')
        }
        if (
          userData.justificatif.fichierPieceIdentitePdf &&
          userData.justificatif.fichierPieceIdentitePdf instanceof File
        ) {
          formData.append(
            'justificatif[fichierPieceIdentitePdf]',
            userData.justificatif.fichierPieceIdentitePdf
          )
          console.log('Added fichierPieceIdentitePdf to FormData')
        }
        if (
          userData.justificatif.fichierJustificatifDomicilePdf &&
          userData.justificatif.fichierJustificatifDomicilePdf instanceof File
        ) {
          formData.append(
            'justificatif[fichierJustificatifDomicilePdf]',
            userData.justificatif.fichierJustificatifDomicilePdf
          )
          console.log('Added fichierJustificatifDomicilePdf to FormData')
        }

        // Only add justificatif section if at least one file exists
        const hasAnyFile = [
          userData.justificatif.fichierCarteVitalePdf,
          userData.justificatif.fichierRibPdf,
          userData.justificatif.fichierPieceIdentitePdf,
          userData.justificatif.fichierJustificatifDomicilePdf,
        ].some((file) => file instanceof File)

        if (hasAnyFile) {
          // Add idUser for justificatif
          formData.append('justificatif[idUser]', 'test1234')
        }
      }
      const response: AxiosResponse<ApiResponse<User>> = await apiClient.post(
        '/users',
        formData
      )

      if (response.data.success && response.data.data) {
        return response.data.data
      } else {
        throw new Error(response.data.message || 'Failed to create user')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorResponse = error.response.data as ApiResponse<never>
        throw new Error(errorResponse.message || 'Failed to create user')
      } else {
        throw new Error('Network error occurred')
      }
    }
  }

  static async getUserById(id: string): Promise<User> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await apiClient.get(
        `/users/${id}`
      )

      if (response.data.success && response.data.data) {
        return response.data.data
      } else {
        throw new Error(response.data.message || 'Failed to fetch user')
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorResponse = error.response.data as ApiResponse<never>
        throw new Error(errorResponse.message || 'Failed to fetch user')
      } else {
        throw new Error('Network error occurred')
      }
    }
  }
}
