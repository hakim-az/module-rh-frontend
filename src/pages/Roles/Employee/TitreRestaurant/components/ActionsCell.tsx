import { downloadFile } from '@/lib/downloadFile'
import { Download } from 'lucide-react'
import { useCallback, useState } from 'react'

interface ActionsCellProps {
  fileName: string
}

export default function ActionsCell({ fileName }: ActionsCellProps) {
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
    <div className="flex items-center justify-center">
      {isLoadingFile ? (
        <>Loading...</>
      ) : (
        <Download
          onClick={() => {
            handleDownload(fileName)
          }}
          className="hover:text-blue-500 cursor-pointer  transition-all ease-in-out delay-75"
        />
      )}
    </div>
  )
}
