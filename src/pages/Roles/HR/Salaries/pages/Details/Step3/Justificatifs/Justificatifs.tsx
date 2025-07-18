import { useCallback, useState } from 'react'
import { Download } from 'lucide-react'
import PdfIcon from '@/assets/icons/pdf-icon.png'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import { downloadFile } from '@/lib/downloadFile'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

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

export default function Justificatifs() {
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
        </section>
      )}
    </>
  )
}
