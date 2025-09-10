import type { User } from '@/types/user.types'
import { Download, Eye } from 'lucide-react'
import { useState } from 'react'
import PdfIcon from '@/assets/icons/pdf-icon.png'
import DisplayPdf from '@/components/DisplayPdf/DisplayPdf'

interface IProps {
  details: User | undefined
  loading: boolean
}

const documents = [
  { label: 'Carte vitale', key: 'fichierCarteVitalePdf' },
  { label: 'RIB', key: 'fichierRibPdf' },
  { label: "Pièce d'identité Recto", key: 'fichierPieceIdentitePdf' },
  { label: "Pièce d'identité Verso", key: 'fichierPieceIdentitePdfVerso' },
  { label: 'Justificatif de domicile', key: 'fichierJustificatifDomicilePdf' },
  { label: 'Attestation Ameli', key: 'fichierAmeli' },
  { label: 'Autre Fichier', key: 'autreFichier' },
]

export default function JustificatifsDisplayForm({ details, loading }: IProps) {
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null)
  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | undefined>('')

  const forceDownload = async (url: string, key: string, filename?: string) => {
    setDownloadingKey(key)
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename || url.split('/').pop() || 'file.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloadingKey(null)
    }
  }

  const renderCard = (label: string, fileKey: string) => {
    const fileUrl = details?.justificatif?.[
      fileKey as keyof typeof details.justificatif
    ] as string | undefined

    return (
      <div
        key={fileKey}
        className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
        <img src={PdfIcon} alt="pdf-icon" className="w-40" />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-black">{label}</span>
          </div>
          <div className="flex items-center justify-center gap-5">
            <Eye
              onClick={() => {
                setOpenPdfModal(true)
                setFileUrl(fileUrl)
              }}
              className="hover:text-blue-600 cursor-pointer"
            />
            {downloadingKey === fileKey ? (
              <span className="text-xs text-gray-400 animate-pulse">
                Téléchargement...
              </span>
            ) : fileUrl ? (
              <Download
                onClick={() => forceDownload(fileUrl, fileKey)}
                className="hover:text-blue-600 cursor-pointer"
              />
            ) : (
              <span className="text-xs text-red-400">Aucun fichier</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <section>
          <div className="grid grid-cols-1 bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
            {documents.map(({ label, key }) => renderCard(label, key))}
          </div>
        </section>
      )}
      <DisplayPdf
        openModal={openPdfModal}
        setOpenModal={setOpenPdfModal}
        fileUrl={fileUrl}
      />
    </>
  )
}
