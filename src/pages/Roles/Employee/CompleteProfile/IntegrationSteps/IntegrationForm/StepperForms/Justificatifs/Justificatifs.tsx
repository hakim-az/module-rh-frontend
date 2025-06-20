import FileUploader from '@/components/FileUploader/FileUploader'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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
  // states
  const [carteVitale, setCarteVitale] = useState<File | null>(null)
  const [rib, setRib] = useState<File | null>(null)
  const [pieceIdentite, setPieceIdentite] = useState<File | null>(null)
  const [justificatifDomicile, setJustificatifDomicile] = useState<File | null>(
    null
  )
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {
    goNext()
    if (currentStepIndex === labels.length - 1) {
      setActiveValidateIntegrationModal(true)
    }
  }

  console.log(carteVitale, rib, pieceIdentite, justificatifDomicile)

  useEffect(() => {
    register('carteVitale', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })
    register('rib', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })
    register('pieceIdentite', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })
    register('justificatifDomicile', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })
  }, [register])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
          <FileUploader
            title="Carte Vitale"
            name="carteVitale"
            setValue={setValue}
            onFileSelect={setCarteVitale}
            error={
              typeof errors.carteVitale?.message === 'string'
                ? errors.carteVitale.message
                : undefined
            }
          />

          <FileUploader
            title="RIB"
            name="rib"
            setValue={setValue}
            onFileSelect={setRib}
            error={
              typeof errors.rib?.message === 'string'
                ? errors.rib.message
                : undefined
            }
          />

          <FileUploader
            title="Pièce d'identité"
            name="pieceIdentite"
            setValue={setValue}
            onFileSelect={setPieceIdentite}
            error={
              typeof errors.pieceIdentite?.message === 'string'
                ? errors.pieceIdentite.message
                : undefined
            }
          />

          <FileUploader
            title="Justificatif de domicile"
            name="justificatifDomicile"
            setValue={setValue}
            onFileSelect={setJustificatifDomicile}
            error={
              typeof errors.justificatifDomicile?.message === 'string'
                ? errors.justificatifDomicile.message
                : undefined
            }
          />
        </div>

        <div className="w-full mt-20 flex gap-16 justify-center">
          <Button onClick={goBack} type="button" variant="outline" size="lg">
            <ChevronLeft /> Revenir
          </Button>

          <Button type="submit" variant="default" size="lg">
            {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
            <ChevronRight />
          </Button>
        </div>
      </section>
    </form>
  )
}
