import { downloadFile } from '@/lib/downloadFile'
import { Download, Eye, MoreHorizontal } from 'lucide-react'
import { useCallback, useState } from 'react'
import { usePdfModal } from './PdfModalContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface ActionsCellProps {
  fileName: string
}

export default function ActionsCell({ fileName }: ActionsCellProps) {
  const { setOpenPdfModal, setFileUrl } = usePdfModal()

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {!fileName && (
            <DropdownMenuItem
              className="cursor-pointer group flex items-center gap-2 py-2"
              onClick={() => {
                setOpenPdfModal(true)
                setFileUrl(fileName)
              }}>
              <Eye className="w-4 h-4 group-hover:text-blue-500" />
              <span className="group-hover:text-blue-500">
                Détails du justificatif
              </span>
            </DropdownMenuItem>
          )}
          {!fileName && (
            <DropdownMenuItem
              className="cursor-pointer group flex items-center gap-2 py-2"
              disabled={isLoadingFile}
              onClick={() => {
                handleDownload(fileName)
              }}>
              <Download className="w-4 h-4 group-hover:text-blue-500" />
              <span className="group-hover:text-blue-500">
                Télécharger le justificatif
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
