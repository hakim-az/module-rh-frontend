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
  naissance: {
    id: string
    idUser: string
    dateDeNaissance: string
    paysDeNaissance: string
    departementDeNaissance: string
    communeDeNaissance: string
    paysDeNationalite: string
    createdAt: string
    updatedAt: string
  }
  adresse: {
    id: string
    idUser: string
    pays: string
    codePostal: string
    ville: string
    adresse: string
    complementAdresse: string
    domiciliteHorsLaFrance: string
    createdAt: string
    updatedAt: string
  }
  paiement: {
    id: string
    idUser: string
    iban: string
    bic: string
    createdAt: string
    updatedAt: string
  }
  urgence: {
    id: string
    idUser: string
    nomComplet: string
    lienAvecLeSalarie: string
    telephone: string
    createdAt: string
    updatedAt: string
  }
  justificatif: {
    id: string
    idUser: string
    fichierCarteVitalePdf: string
    fichierRibPdf: string
    fichierPieceIdentitePdf: string
    fichierJustificatifDomicilePdf: string
    createdAt: string
    updatedAt: string
  }
  contrat: {
    id: string
    idUser: string
    poste: string
    typeContrat: string
    dateDebut: string
    dateFin: string
    etablissementDeSante: string
    serviceDeSante: string
    matricule: string
    salaire: string
    fichierContratNonSignerPdf: string
    fichierContratSignerPdf: string
    createdAt: string
    updatedAt: string
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}
