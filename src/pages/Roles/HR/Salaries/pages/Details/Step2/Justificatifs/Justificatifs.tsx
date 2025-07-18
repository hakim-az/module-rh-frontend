import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import PdfIcon from '@/assets/icons/pdf-icon.png'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import { downloadFile } from '@/lib/downloadFile'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

interface PropsType {
  currentStepIndex: number
  labels: string[]
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
}

const documents = [
  {
    label: 'Carte vitale',
    key: 'fichierCarteVitalePdf',
  },
  {
    label: 'RIB',
    key: 'fichierRibPdf',
  },
  {
    label: "Pièce d'identité",
    key: 'fichierPieceIdentitePdf',
  },
  {
    label: 'Justificatif de domicile',
    key: 'fichierJustificatifDomicilePdf',
  },
]

export default function Justificatifs({
  currentStepIndex,
  labels,
  setCurrentStepIndex,
}: PropsType) {
  const { salarieDetails, isLoadingSalarieDetails } = useSalarieDetailsContext()
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null)

  const handleDownload = useCallback(
    async (fileName: string | undefined, key: string) => {
      if (!fileName) return
      setDownloadingKey(key)
      try {
        await downloadFile(fileName)
      } catch (error) {
        console.error('Download failed:', error)
      } finally {
        setDownloadingKey(null)
      }
    },
    []
  )

  // handle go next
  const goNext = () => {
    if (currentStepIndex < labels.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // handle go back
  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const renderCard = (label: string, fileKey: string) => {
    const fileUrl =
      salarieDetails?.justificatif?.[
        fileKey as keyof typeof salarieDetails.justificatif
      ]

    return (
      <div
        key={fileKey}
        className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
        <img src={PdfIcon} alt="pdf-icon" className="w-40" />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-black">{label}</span>
            <span className="text-xs text-gray-400">~5.3 Mb</span>
          </div>
          {downloadingKey === fileKey ? (
            <span className="text-xs text-gray-400 animate-pulse">
              Téléchargement...
            </span>
          ) : fileUrl ? (
            <Download
              onClick={() => handleDownload(fileUrl, fileKey)}
              className="hover:text-blue-600 cursor-pointer"
            />
          ) : (
            <span className="text-xs text-red-400">Aucun fichier</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoadingSalarieDetails ? (
        <div className="w-full bg-white h-80 flex items-center justify-center border border-gray-300 rounded-md shadow">
          <LoadingSpinner />
        </div>
      ) : (
        <section>
          <div className="grid grid-cols-1 bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
            {documents.map(({ label, key }) => renderCard(label, key))}
          </div>

          <div className="w-full mt-20 flex gap-16 justify-center">
            <Button onClick={goBack} type="button" variant="outline" size="lg">
              <ChevronLeft /> Revenir
            </Button>

            <Button onClick={goNext} variant="default" size="lg">
              {currentStepIndex === labels.length - 1 ? 'Valider' : 'Continuer'}
              <ChevronRight />
            </Button>
          </div>
        </section>
      )}
    </>
  )
}
