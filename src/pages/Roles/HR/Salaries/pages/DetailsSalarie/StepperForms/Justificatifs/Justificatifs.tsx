import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PdfIcon from '@/assets/icons/pdf-icon.png'
import { Download } from 'lucide-react'

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (b: boolean) => void
  labels: string[]
  goNext: () => void
  goBack: () => void
}

export default function Justificatifs({
  currentStepIndex,
  setActiveValidateIntegrationModal,
  labels,
  goNext,
  goBack,
}: PropsType) {
  const onSubmit = () => {
    goNext()
    if (currentStepIndex === labels.length - 1) {
      setActiveValidateIntegrationModal(true)
    }
  }

  const filesCards = [
    {
      id: 1,
      title: 'carte-vitale.pdf',
      size: 5.3,
    },
    {
      id: 2,
      title: 'RIB.pdf',
      size: 5.3,
    },
    {
      id: 3,
      title: `pièce-d'identité.pdf`,
      size: 5.3,
    },
    {
      id: 4,
      title: 'justificatif-de-domicile.pdf',
      size: 5.3,
    },
  ]

  return (
    <section>
      <div className="grid grid-cols-1 bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
        {/* file card */}
        {filesCards.map((file) => (
          <div
            key={file.id}
            className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
            <img src={PdfIcon} alt="pdf-icon" className="w-40" />
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black">
                  {file.title}
                </span>
                <span className="text-xs text-gray-400">{file.size} Mb</span>
              </div>
              <Download className="hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full mt-20 flex gap-16 justify-center">
        <Button onClick={goBack} type="button" variant="outline" size="lg">
          <ChevronLeft /> Revenir
        </Button>

        <Button onClick={onSubmit} variant="default" size="lg">
          {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
          <ChevronRight />
        </Button>
      </div>
    </section>
  )
}
