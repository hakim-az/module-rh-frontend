import { Download } from 'lucide-react'
import PdfIcon from '@/assets/icons/pdf-icon.png'
import { useCallback, useState } from 'react'
import { downloadFile } from '@/lib/downloadFile'

interface IProps {
  file: string | undefined
}

export default function DownloadJustificatif({ file }: IProps) {
  const [isLoadingFile, setIsLoadingFile] = useState(false)

  const handleDownload = useCallback(async (fileName: string | undefined) => {
    setIsLoadingFile(true)
    if (!fileName) return

    // Extract only the path starting from "uploads/"
    const extractedPath = fileName.replace(/^.*\/uploads\//, 'uploads/')

    try {
      await downloadFile(extractedPath)
      setIsLoadingFile(false)
    } catch (error) {
      console.error('Download failed:', error)
      setIsLoadingFile(false)
    }
  }, [])
  return (
    <>
      {file !== 'undefined' && (
        <div className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
          <img src={PdfIcon} alt="pdf-icon" className="w-40" />
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black">
                Justificatif
              </span>
              <span className="text-xs text-gray-400">~5.3 Mb</span>
            </div>
            {isLoadingFile ? (
              <span className="text-xs text-gray-400 animate-pulse">
                Téléchargement...
              </span>
            ) : file ? (
              <Download
                onClick={() => typeof file === 'string' && handleDownload(file)}
                className="hover:text-blue-600 cursor-pointer"
              />
            ) : (
              <span className="text-xs text-red-400">Aucun fichier</span>
            )}
          </div>
        </div>
      )}
    </>
  )
}
