import { createContext } from 'react'

export interface EmployeePersonalInformations {
  id: string
  civilite: string
  prenom: string
  nom_de_naissance: string
  nom_usuel: string
  situation_familiale: string
  numero_ssr: string
  date_de_naissance: string
  pays_de_naissance: string
  departement_de_naissance: string
  commune_de_naissance: string
  pays_de_nationalite: string
  email_perso: string
  email_pro: string
  tel_perso: string
  tel_pro: string
  pays: string
  code_postal: string
  ville: string
  adresse: string
  complement_adresse: string
  fiscalement_hors_france: boolean
}
export interface EmployeeProfesionalInformations {
  iban: string
  bic: string
  nom_complet: string
  lien_avec_salarie: string
  tel: string
}

export interface IContractInfo {
  poste: string
  type_de_contrat: string
  date_de_début: Date
  date_de_fin: Date
  matricule: string
  etablisment_de_sante: string
  service_de_sante: string
  salaire: number
  contrat: File
}

export interface IntegrationFormContextType {
  employeePersonalInfo: EmployeePersonalInformations
  setEmployeePersonalInfo: React.Dispatch<
    React.SetStateAction<EmployeePersonalInformations>
  >
  employeeProfesionalInfo: EmployeeProfesionalInformations
  setEmployeeProfesionalInfo: React.Dispatch<
    React.SetStateAction<EmployeeProfesionalInformations>
  >
  carteVitale: File | null
  setCarteVitale: React.Dispatch<React.SetStateAction<File | null>>
  rib: File | null
  setRib: React.Dispatch<React.SetStateAction<File | null>>
  pieceIdentite: File | null
  setPieceIdentite: React.Dispatch<React.SetStateAction<File | null>>
  justificatifDomicile: File | null
  setJustificatifDomicile: React.Dispatch<React.SetStateAction<File | null>>
  ameli: File | null
  setAmeli: React.Dispatch<React.SetStateAction<File | null>>
  pieceIdentiteVerso: File | null
  setPieceIdentiteVerso: React.Dispatch<React.SetStateAction<File | null>>
  autreFichier: File | null
  setAutreFichier: React.Dispatch<React.SetStateAction<File | null>>
  contractInfo: IContractInfo | undefined
  setContractInfo: React.Dispatch<
    React.SetStateAction<IContractInfo | undefined>
  >
  contrat: File | undefined
  setContrat: React.Dispatch<React.SetStateAction<File | undefined>>
}

export const IntegrationFormContext = createContext<
  IntegrationFormContextType | undefined
>(undefined)
