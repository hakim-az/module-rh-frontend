import FileUploader from '@/components/FileUploader/FileUploader'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIntegrationFormDataContext } from '@/contexts/CompleteProfile/IntegrationForm/useIntegrationFormDataContext'

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
  const {
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
  } = useIntegrationFormDataContext()
  // states
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
    register('ameli', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })
    register('pieceIdentiteVerso', {
      required: 'Ce champ est requis',
      validate: {
        size: (file: File) =>
          file && file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })
    register('autreFichier', {
      validate: {
        size: (file: File) =>
          !file || file.size <= 10 * 1024 * 1024
            ? true
            : 'Le fichier doit faire moins de 10 Mo',
      },
    })
    if (carteVitale) setValue('carteVitale', carteVitale)
    if (rib) setValue('rib', rib)
    if (pieceIdentite) setValue('pieceIdentite', pieceIdentite)
    if (justificatifDomicile)
      setValue('justificatifDomicile', justificatifDomicile)
    if (ameli) setValue('ameli', ameli)
    if (pieceIdentite) setValue('pieceIdentite', pieceIdentite)
    if (autreFichier) setValue('autreFichier', autreFichier)
  }, [
    carteVitale,
    justificatifDomicile,
    pieceIdentite,
    ameli,
    register,
    rib,
    setValue,
    autreFichier,
  ])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 p-7 gap-10 rounded-md border bg-white border-gray-200 shadow-md w-full">
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
            defaultFile={carteVitale ?? undefined}
            required
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
            defaultFile={rib ?? undefined}
            required
          />

          <FileUploader
            title="Pièce d'identité Recto"
            name="pieceIdentite"
            setValue={setValue}
            onFileSelect={setPieceIdentite}
            error={
              typeof errors.pieceIdentite?.message === 'string'
                ? errors.pieceIdentite.message
                : undefined
            }
            defaultFile={pieceIdentite ?? undefined}
            required
          />

          <FileUploader
            title="Pièce d'identité Verso"
            name="pieceIdentiteVerso"
            setValue={setValue}
            onFileSelect={setPieceIdentiteVerso}
            error={
              typeof errors.pieceIdentiteVerso?.message === 'string'
                ? errors.pieceIdentiteVerso.message
                : undefined
            }
            defaultFile={pieceIdentiteVerso ?? undefined}
            required
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
            defaultFile={justificatifDomicile ?? undefined}
            required
          />

          <FileUploader
            title="Attestation Ameli"
            name="ameli"
            setValue={setValue}
            onFileSelect={setAmeli}
            error={
              typeof errors.ameli?.message === 'string'
                ? errors.ameli.message
                : undefined
            }
            defaultFile={ameli ?? undefined}
            required
          />

          <FileUploader
            title="Autre fichier"
            name="autreFichier"
            setValue={setValue}
            onFileSelect={setAutreFichier}
            error={
              typeof errors.autreFichier?.message === 'string'
                ? errors.autreFichier.message
                : undefined
            }
            defaultFile={autreFichier ?? undefined}
            required={false}
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
