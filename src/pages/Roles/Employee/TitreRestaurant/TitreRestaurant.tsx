import { useMemo, useState } from 'react'
import Banner from './components/Banner'
import TitreRestaurantTable from './components/TitreRestaurantTable'
import DisplayPdf from '@/components/DisplayPdf/DisplayPdf'
import { PdfModalContext } from './components/PdfModalContext'

export default function TitreRestaurant() {
  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [fileUrl, setFileUrl] = useState('')

  const contextValue = useMemo(
    () => ({ openPdfModal, setOpenPdfModal, fileUrl, setFileUrl }),
    [fileUrl, openPdfModal]
  )
  return (
    <PdfModalContext value={contextValue}>
      <Banner />
      <TitreRestaurantTable />
      <DisplayPdf
        openModal={openPdfModal}
        setOpenModal={setOpenPdfModal}
        fileUrl={fileUrl}
      />
    </PdfModalContext>
  )
}
