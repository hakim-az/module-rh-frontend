export interface IAbsence {
  id: string
  idUser: string
  typeAbsence: string
  dateDebut: string
  dateFin: string
  note: string
  statut: string
  motifDeRefus: string
  fichierJustificatifPdf: string
  total: number
  createdAt: string
  updatedAt: string
  user: {
    nomDeNaissance: string
    prenom: string
    emailProfessionnel: string
    avatar: string
  }
}

export type ICoffreFort = {
  id: string
  idUser: string
  typeBulletin: string
  mois: string
  annee: string
  note: string
  fichierJustificatifPdf: string
  createdAt: string
  updatedAt: string
  user: {
    nomDeNaissance: string
    prenom: string
    emailProfessionnel: string
    avatar: string
  }
}

export type ITitreRestau = {
  id: string
  idUser: string
  nbrJours: string
  mois: string
  annee: string
  note: string
  fichierJustificatifPdf: string
  createdAt: string
  updatedAt: string
  user: {
    nomDeNaissance: string
    prenom: string
    emailProfessionnel: string
    avatar: string
  }
}
