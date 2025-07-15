import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Download } from 'lucide-react'

import DisplayInput from '@/components/DisplayInput/DisplayInput'
import PagePath from '@/components/PagePath/PagePath'
import PDFIcon from '@/assets/icons/pdf-icon.png'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

import type { IAbsence } from '../Home/components/AbsencesTable'
import { downloadFile } from '@/lib/downloadFile'

export default function Details() {
  const { absenceId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [absenceDetails, setAbsenceDetails] = useState<IAbsence | null>(null)

  const fetchAbsenceDetails = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:3000/absences/${absenceId}`
      )
      setAbsenceDetails(response.data)
    } catch (error) {
      console.error('Failed to fetch absence details:', error)
    } finally {
      setIsLoading(false)
    }
  }, [absenceId])

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

  const renderStatus = () => {
    const status = absenceDetails?.statut
    const baseClass =
      'text-white text-lg font-medium px-14 py-2 rounded mb-10 mx-auto w-11/12 max-w-[1280px] flex justify-center'

    switch (status) {
      case 'approuver':
        return <div className={`${baseClass} bg-green-600`}>Approuvée</div>
      case 'en-attente':
        return <div className={`${baseClass} bg-black`}>En attente</div>
      case 'refusser':
        return (
          <div className="flex flex-col gap-5 items-center w-11/12 max-w-[1280px] mx-auto mb-10">
            <span className="bg-red-600 text-white text-lg font-medium px-14 py-2 rounded">
              Refusée
            </span>
            <span className="inline-block w-full h-36 overflow-y-scroll no-scrollbar p-4 rounded border border-red-500 bg-white">
              {absenceDetails?.motifDeRefus || 'Motif non fourni'}
            </span>
          </div>
        )
      default:
        return null
    }
  }

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
      {renderStatus()}

      <div className="w-11/12 max-w-[1280px] mb-20 mt-5 mx-auto grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-10 gap-y-8 rounded-md border border-gray-200 shadow-md">
        <div className="col-span-1 lg:col-span-2">
          <DisplayInput
            label="Type d'absence"
            value={absenceDetails?.typeAbsence.replace(/_/g, ' ') || '-'}
          />
        </div>

        <DisplayInput
          label="Date de début"
          value={absenceDetails?.dateDebut.slice(0, 10) || '-'}
        />

        <DisplayInput
          label="Date de fin"
          value={absenceDetails?.dateFin.slice(0, 10) || '-'}
        />

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
