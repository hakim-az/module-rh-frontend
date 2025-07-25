export interface Naissance {
  dateDeNaissance: string
  paysDeNaissance: string
  departementDeNaissance: string
  communeDeNaissance: string
  paysDeNationalite: string
}

export interface Adresse {
  pays: string
  codePostal: string
  ville: string
  adresse: string
  complementAdresse?: string
  domiciliteHorsLaFrance: boolean
}

export interface Paiement {
  iban: string
  bic: string
}

export interface Urgence {
  nomComplet: string
  lienAvecLeSalarie: string
  telephone: string
}

export interface Justificatif {
  fichierCarteVitalePdf?: File
  fichierRibPdf?: File
  fichierPieceIdentitePdf?: File
  fichierJustificatifDomicilePdf?: File
  fichierAmeli?: File
}

export interface Contrat {
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
  naissance: Naissance
  adresse: Adresse
  paiement: Paiement
  urgence: Urgence
  justificatif: Justificatif
  contrat: Contrat
}

export interface Absence {
  id: string
  idUser: string
  typeAbsence: string
  dateDebut: string
  dateFin: string
  note: string
  statut: string
  motifDeRefus: string
  fichierJustificatifPdf: string
  createdAt: string
  updatedAt: string
  user: AbsenceUser
}

export interface AbsenceUser {
  nomDeNaissance: string
  prenom: string
  emailProfessionnel: string
  avatar: string
}

export interface Coffre {
  id: string
  idUser: string
  typeBulletin: string
  mois: string
  annee: string
  note: string
  fichierJustificatifPdf: string
  createdAt: string
  updatedAt: string
  user: CoffreUser
}

export interface CoffreUser {
  nomDeNaissance: string
  prenom: string
  emailProfessionnel: string
  avatar: string
}

export interface Restauration {
  id: string
  idUser: string
  nbrJours: string
  mois: string
  annee: string
  note: string
  fichierJustificatifPdf: string
  createdAt: string
  updatedAt: string
  user: RestaurationUser
}

export interface RestaurationUser {
  nomDeNaissance: string
  prenom: string
  emailProfessionnel: string
  avatar: string
}
