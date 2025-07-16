import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Download } from 'lucide-react'

import DisplayInput from '@/components/DisplayInput/DisplayInput'
import PagePath from '@/components/PagePath/PagePath'
import PDFIcon from '@/assets/icons/pdf-icon.png'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

import type { ICoffreFort } from '../Home/components/CoffreFortTable'
import { downloadFile } from '@/lib/downloadFile'

export default function Details() {
  const { idCoffre } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [absenceDetails, setAbsenceDetails] = useState<ICoffreFort | null>(null)

  const fetchAbsenceDetails = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coffres/${idCoffre}`
      )
      setAbsenceDetails(response.data)
    } catch (error) {
      console.error('Failed to fetch absence details:', error)
    } finally {
      setIsLoading(false)
    }
  }, [idCoffre])

  const handleDownload = useCallback(async () => {
    if (!absenceDetails?.fichierJustificatifPdf) return

    setIsLoading(true)
    try {
      await downloadFile(absenceDetails.fichierJustificatifPdf)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [absenceDetails])

  useEffect(() => {
    fetchAbsenceDetails()
  }, [fetchAbsenceDetails])

  if (isLoading) {
    return (
      <>
        <PagePath />
        <div className="w-11/12 mt-10 max-w-[1280px] flex items-center justify-center mx-auto h-80 bg-white border border-gray-300 rounded-lg">
          <LoadingSpinner />
        </div>
      </>
    )
  }

  return (
    <>
      <PagePath />

      <div className="w-11/12 max-w-[1280px] mb-20 mt-5 mx-auto grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-10 gap-y-8 rounded-md border border-gray-200 shadow-md">
        <DisplayInput
          label="Salarié"
          value={
            absenceDetails?.user
              ? `${absenceDetails?.user?.nomDeNaissance} ${absenceDetails?.user?.prenom}`
              : '-'
          }
        />

        <DisplayInput
          label="Type Bulletin"
          value={absenceDetails?.typeBulletin.replace('_', ' ') ?? '-'}
        />

        <DisplayInput label="Mois" value={absenceDetails?.mois ?? '-'} />

        <DisplayInput label="Année" value={absenceDetails?.annee ?? '-'} />

        <div className="lg:col-span-2">
          <DisplayInput label="Note" value={absenceDetails?.note || '-'} />
        </div>

        {absenceDetails?.fichierJustificatifPdf && (
          <div className="border p-10 flex flex-col items-center justify-center border-gray-300 rounded shadow-2xs">
            <img src={PDFIcon} alt="pdf-icon" className="w-40 mb-4" />
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold">Justificatif</span>
              <Download
                onClick={handleDownload}
                className="hover:text-blue-500 cursor-pointer transition-colors"
                size={32}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
