import { Download, Eye, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
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

  // download file
  const [downloadingKey, setDownloadingKey] = useState<boolean>(false)

  const forceDownload = async (url: string | undefined, filename?: string) => {
    if (!url) return // ⬅️ guard against undefined

    setDownloadingKey(true)
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
      setDownloadingKey(false)
    }
  }

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
          {fileName && (
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
          {fileName && (
            <DropdownMenuItem
              className="cursor-pointer group flex items-center gap-2 py-2"
              disabled={downloadingKey || fileName === 'undefined'}
              onClick={() => forceDownload(fileName)}>
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
