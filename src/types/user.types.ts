export interface CreateUserDto {
  role: string
  statut: string
  civilite: string
  prenom: string
  nomDeNaissance: string
  nomUsuel?: string
  situationFamiliale: string
  numeroSecuriteSociale: string
  emailPersonnel: string
  emailProfessionnel?: string
  telephonePersonnel: string
  telephoneProfessionnel?: string
  avatar?: string
  naissance?: NaissanceDto
  adresse?: AdresseDto
  paiement?: PaiementDto
  urgence?: UrgenceDto
  justificatif?: JustificatifDto
}

export interface NaissanceDto {
  dateDeNaissance: string
  paysDeNaissance: string
  departementDeNaissance: string
  communeDeNaissance: string
  paysDeNationalite: string
}

export interface AdresseDto {
  pays: string
  codePostal: string
  ville: string
  adresse: string
  complementAdresse?: string
  domiciliteHorsLaFrance: boolean
}

export interface PaiementDto {
  iban: string
  bic: string
}

export interface UrgenceDto {
  nomComplet: string
  lienAvecLeSalarie: string
  telephone: string
}

export interface JustificatifDto {
  fichierCarteVitalePdf?: File
  fichierRibPdf?: File
  fichierPieceIdentitePdf?: File
  fichierJustificatifDomicilePdf?: File
}

export interface User {
  id: string
  role: string
  statut: string
  civilite: string
  prenom: string
  nomDeNaissance: string
  nomUsuel?: string
  situationFamiliale: string
  numeroSecuriteSociale: string
  emailPersonnel: string
  emailProfessionnel?: string
  telephonePersonnel: string
  telephoneProfessionnel?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}
