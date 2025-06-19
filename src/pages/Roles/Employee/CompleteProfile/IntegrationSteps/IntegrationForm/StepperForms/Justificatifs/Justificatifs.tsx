import FileUploader from '@/components/FileUploader/FileUploader'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PropsType {
  currentStepIndex: number
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
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
  const [carteVitale, setCarteVitale] = useState<File | null>(null)
  const [rib, setRib] = useState<File | null>(null)
  const [piececeIdentite, setPiececeIdentite] = useState<File | null>(null)
  const [justificatifDeDomicile, setJustificatifDeDomicile] =
    useState<File | null>(null)

  // 🔍 Watch for file changes
  useEffect(() => {
    if (carteVitale) {
      console.log('Selected file:', carteVitale)
      // You can handle upload or validation here too
    }
  }, [carteVitale])
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
        {/* Carte vitale */}
        <FileUploader
          file={carteVitale}
          setFile={setCarteVitale}
          title="Carte vitale"
        />
        {/* RIB */}
        <FileUploader file={rib} setFile={setRib} title="RIB" />
        {/* Pièce d'identité */}
        <FileUploader
          file={piececeIdentite}
          setFile={setPiececeIdentite}
          title="Pièce d'identité"
        />
        {/* Justificatif de domicile */}
        <FileUploader
          file={justificatifDeDomicile}
          setFile={setJustificatifDeDomicile}
          title="Justificatif de domicile"
        />
      </div>
      <div className="w-full mt-20 flex gap-16 justify-center">
        {/* revenir */}
        <Button
          onClick={goBack}
          // disabled={currentStepIndex === 0}
          variant="outline"
          size={'lg'}>
          <ChevronLeft /> Revenir
        </Button>
        {/* continuer */}
        <Button
          type="button"
          onClick={() => {
            goNext()
            if (currentStepIndex === labels.length - 1) {
              setActiveValidateIntegrationModal(true)
            }
          }}
          disabled={currentStepIndex === labels.length}
          variant="default"
          size={'lg'}>
          {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
          <ChevronRight />
        </Button>
      </div>
    </section>
  )
}
