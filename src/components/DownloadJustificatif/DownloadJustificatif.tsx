import { Download, Eye } from 'lucide-react'
import PdfIcon from '@/assets/icons/pdf-icon.png'
import { useState } from 'react'

interface IProps {
  file: string | undefined
  setFileUrl: (val: string | undefined) => void
  setOpenPdfModal: (val: boolean) => void
}

export default function DownloadJustificatif({
  file,
  setFileUrl,
  setOpenPdfModal,
}: IProps) {
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null)

  const forceDownload = async (url: string, filename?: string) => {
    const key = 'justificatifAbsence'
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

  return (
    <>
      {file && (
        <div className="flex flex-col gap-8 items-center p-7 justify-center border border-gray-300 rounded-md">
          <img src={PdfIcon} alt="pdf-icon" className="w-40" />
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black">
                Justificatif d&apos;absence
              </span>
            </div>

            <div className="flex items-center justify-center gap-5">
              <Eye
                onClick={() => {
                  setOpenPdfModal(true)
                  setFileUrl(file)
                }}
                className="hover:text-blue-600 cursor-pointer"
              />
              {downloadingKey ? (
                <span className="text-xs text-gray-400 animate-pulse">
                  Téléchargement...
                </span>
              ) : (
                <Download
                  onClick={() => forceDownload(file)}
                  className="hover:text-blue-600 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
