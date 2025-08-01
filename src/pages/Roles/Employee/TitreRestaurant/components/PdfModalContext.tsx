import { createContext, use } from 'react'

export const PdfModalContext = createContext<{
  openPdfModal: boolean
  setOpenPdfModal: (val: boolean) => void
  fileUrl: string
  setFileUrl: (val: string) => void
} | null>(null)

export const usePdfModal = () => {
  const ctx = use(PdfModalContext)
  if (!ctx) {
    throw new Error('usePdfModal must be used within PdfModalContext.Provider')
  }
  return ctx
}
