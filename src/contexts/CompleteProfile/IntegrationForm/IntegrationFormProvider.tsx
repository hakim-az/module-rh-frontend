import React, { useState, useMemo } from 'react'
import { IntegrationFormContext } from './IntegrationFormContext'
import type { IContractInfo } from './IntegrationFormContext'

type Props = {
  children: React.ReactNode
}

export default function IntegrationFormProvider({ children }: Props) {
  // employee personal informations
  const [employeePersonalInfo, setEmployeePersonalInfo] = useState({
    id: '',
    civilite: '',
    prenom: '',
    nom_de_naissance: '',
    nom_usuel: '',
    situation_familiale: '',
    numero_ssr: '',
    date_de_naissance: '',
    pays_de_naissance: '',
    departement_de_naissance: '',
    commune_de_naissance: '',
    pays_de_nationalite: '',
    email_perso: '',
    email_pro: '',
    tel_perso: '',
    tel_pro: '',
    pays: '',
    code_postal: '',
    ville: '',
    adresse: '',
    complement_adresse: '',
    fiscalement_hors_france: false,
  })

  // employee pro informations
  const [employeeProfesionalInfo, setEmployeeProfesionalInfo] = useState({
    iban: '',
    bic: '',
    nom_complet: '',
    lien_avec_salarie: '',
    tel: '',
  })

  // employee justificatif
  const [carteVitale, setCarteVitale] = useState<File | null>(null)
  const [rib, setRib] = useState<File | null>(null)
  const [pieceIdentite, setPieceIdentite] = useState<File | null>(null)
  const [justificatifDomicile, setJustificatifDomicile] = useState<File | null>(
    null
  )
  const [ameli, setAmeli] = useState<File | null>(null)
  const [pieceIdentiteVerso, setPieceIdentiteVerso] = useState<File | null>(
    null
  )
  const [autreFichier, setAutreFichier] = useState<File | null>(null)

  // employee contract
  const [contractInfo, setContractInfo] = useState<IContractInfo>()
  const [contrat, setContrat] = useState<File | undefined>(undefined)

  const contextValue = useMemo(
    () => ({
      employeePersonalInfo,
      setEmployeePersonalInfo,
      employeeProfesionalInfo,
      setEmployeeProfesionalInfo,
      carteVitale,
      setCarteVitale,
      rib,
      setRib,
      pieceIdentite,
      setPieceIdentite,
      justificatifDomicile,
      setJustificatifDomicile,
      ameli,
      setAmeli,
      pieceIdentiteVerso,
      setPieceIdentiteVerso,
      autreFichier,
      setAutreFichier,
      contractInfo,
      setContractInfo,
      contrat,
      setContrat,
    }),
    [
      employeePersonalInfo,
      employeeProfesionalInfo,
      carteVitale,
      rib,
      pieceIdentite,
      justificatifDomicile,
      ameli,
      pieceIdentiteVerso,
      autreFichier,
      contractInfo,
      contrat,
    ]
  )

  return (
    <IntegrationFormContext value={contextValue}>
      {children}
    </IntegrationFormContext>
  )
}
