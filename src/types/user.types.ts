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
  fichierAmeli?: File
}

export interface ContratDto {
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
  naissance: NaissanceDto
  adresse: AdresseDto
  paiement: PaiementDto
  urgence: UrgenceDto
  justificatif: JustificatifDto
  contrat: ContratDto
}
