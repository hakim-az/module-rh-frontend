import { useMemo, useState } from 'react'
import { PdfModalContext } from './components/PdfModalContext'
import Banner from './components/Banner'
import CoffreFortTable from './components/CoffreFortTable'
import DisplayPdf from '@/components/DisplayPdf/DisplayPdf'

export default function CoffreFort() {
  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [fileUrl, setFileUrl] = useState('')

  const contextValue = useMemo(
    () => ({ openPdfModal, setOpenPdfModal, fileUrl, setFileUrl }),
    [fileUrl, openPdfModal]
  )

  return (
    <PdfModalContext value={contextValue}>
      <Banner />
      <CoffreFortTable />
      <DisplayPdf
        openModal={openPdfModal}
        setOpenModal={setOpenPdfModal}
        fileUrl={fileUrl}
      />
    </PdfModalContext>
  )
}
