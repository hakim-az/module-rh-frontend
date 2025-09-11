import { useParams } from 'react-router-dom'

import UploadContract from './UploadContract/UploadContract'
import WaitSignature from './WaitSignature/WaitSignature'
import SalarieValidation from './SalarieValidation/SalarieValidation'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import { useEffect } from 'react'
import ContractView from './ContractView/ContractView'

export default function Details() {
  const { idSalarie } = useParams()

  const { salarieDetails, setUserId } = useSalarieDetailsContext()

  useEffect(() => {
    if (idSalarie) {
      setUserId(idSalarie)
    }
  }, [idSalarie, setUserId])

  function getStepLabel(step: string) {
    switch (step) {
      case 'user-created':
        return (
          <div className="w-full flex items-center justify-center mb-10">
            <span className="bg-[#9CA3AF] text-white px-2 py-1 rounded">
              Compte créé
            </span>
          </div>
        )
      case 'profile-completed':
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#3B82F6] text-white px-8 py-2 rounded">
              Formulaire completer
            </span>
          </div>
        )
      case 'contract-uploaded':
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#FBBF24] text-black px-8 py-2 rounded">
              Contrat prêt
            </span>
          </div>
        )
      case 'email-sent':
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#6366F1] text-white px-8 py-2 rounded">
              Email envoyé
            </span>
          </div>
        )
      case 'contract-signed':
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#EC4899] text-white px-8 py-2 rounded">
              Contrat signé
            </span>
          </div>
        )
      case 'user-approuved':
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#10B981] text-white px-8 py-2 rounded">
              Accès validé
            </span>
          </div>
        )
      case 'user-banned':
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-red-500 text-white px-8 py-2 rounded">
              Accès désactiver
            </span>
          </div>
        )
      default:
        return null
    }
  }

  //   Upload contract
  if (salarieDetails?.statut === 'profile-completed') {
    return <UploadContract statusLabel={getStepLabel(salarieDetails?.statut)} />
  }
  //  Wait signature
  if (
    salarieDetails?.statut === 'contract-uploaded' ||
    salarieDetails?.statut === 'email-sent'
  ) {
    return <WaitSignature statusLabel={getStepLabel(salarieDetails?.statut)} />
  }
  // Contrat signer
  if (salarieDetails?.statut === 'contract-signed') {
    return <ContractView statusLabel={getStepLabel(salarieDetails?.statut)} />
  }
  // Salarie validation
  if (
    salarieDetails?.statut === 'user-approuved' ||
    salarieDetails?.statut === 'user-banned'
  ) {
    return (
      <SalarieValidation statusLabel={getStepLabel(salarieDetails?.statut)} />
    )
  }
}
