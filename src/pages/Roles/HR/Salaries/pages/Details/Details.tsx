import { useParams } from 'react-router-dom'

// steps
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'
import Step5 from './Step5/Step5'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import { useEffect } from 'react'

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
      default:
        return null
    }
  }

  //   step 1
  if (salarieDetails?.statut === 'user-created') {
    return <Step1 />
  }
  //   step 2
  if (salarieDetails?.statut === 'profile-completed') {
    return <Step2 statusLabel={getStepLabel(salarieDetails?.statut)} />
  }
  //   step 3
  if (
    salarieDetails?.statut === 'contract-uploaded' ||
    salarieDetails?.statut === 'email-sent'
  ) {
    return <Step3 statusLabel={getStepLabel(salarieDetails?.statut)} />
  }
  //   step 4
  if (salarieDetails?.statut === 'contract-signed') {
    return <Step4 statusLabel={getStepLabel(salarieDetails?.statut)} />
  }
  //   step 5
  if (salarieDetails?.statut === 'user-approuved') {
    return <Step5 statusLabel={getStepLabel(salarieDetails?.statut)} />
  }
}
