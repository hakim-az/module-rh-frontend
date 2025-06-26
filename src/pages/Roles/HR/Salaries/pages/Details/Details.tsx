import { useParams } from 'react-router-dom'

// steps
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'
import Step5 from './Step5/Step5'

export default function Details() {
  const { step } = useParams()

  function getStepLabel(step: number) {
    switch (step) {
      case 1:
        return (
          <div className="w-full flex items-center justify-center mb-10">
            <span className="bg-[#9CA3AF] text-white px-2 py-1 rounded">
              Compte créé
            </span>
          </div>
        )
      case 2:
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#3B82F6] text-white px-8 py-2 rounded">
              Formulaire reçu
            </span>
          </div>
        )
      case 3:
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#FBBF24] text-black px-8 py-2 rounded">
              Contrat prêt
            </span>
          </div>
        )
      case 4:
        return (
          <div className="w-full flex items-center justify-center mb-12">
            <span className="bg-[#EC4899] text-white px-8 py-2 rounded">
              Contrat signé
            </span>
          </div>
        )
      case 5:
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
  if (step === '1') {
    return <Step1 />
  }
  //   step 2
  if (step === '2') {
    return <Step2 statusLabel={getStepLabel(Number(step))} />
  }
  //   step 3
  if (step === '3') {
    return <Step3 statusLabel={getStepLabel(Number(step))} />
  }
  //   step 4
  if (step === '4') {
    return <Step4 statusLabel={getStepLabel(Number(step))} />
  }
  //   step 5
  if (step === '5') {
    return <Step5 statusLabel={getStepLabel(Number(step))} />
  }
}
