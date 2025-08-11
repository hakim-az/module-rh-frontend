import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import DisplayInput from '@/components/DisplayInput/DisplayInput'
import PagePath from '@/components/PagePath/PagePath'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import DownloadJustificatif from '@/components/DownloadJustificatif/DownloadJustificatif'
import DisplayPdf from '@/components/DisplayPdf/DisplayPdf'
import type { ITitreRestau } from '@/types/tables/rh'
import DisplayTextarea from '@/components/DisplayTextarea/DisplayTextarea'

export default function Details() {
  const { idTitre } = useParams()
  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | undefined>('')

  const {
    data: absenceDetails,
    isLoading,
    isError,
  } = useQuery<ITitreRestau>({
    queryKey: ['restaux-details', idTitre],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/restaux/${idTitre}`
      )
      return response.data
    },
    enabled: !!idTitre,
  })

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

  if (isError) {
    return (
      <>
        <PagePath />
        <div className="w-11/12 mt-10 max-w-[1280px] text-center text-red-600 mx-auto h-20 flex items-center justify-center bg-white border border-gray-300 rounded-lg">
          Erreur lors du chargement des détails.
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
              ? `${absenceDetails.user.nomDeNaissance} ${absenceDetails.user.prenom}`
              : '-'
          }
        />

        <DisplayInput
          label="Nombre de jours ouvrés"
          value={absenceDetails?.nbrJours ?? '-'}
        />

        <DisplayInput label="Mois" value={absenceDetails?.mois ?? '-'} />

        <DisplayInput label="Année" value={absenceDetails?.annee ?? '-'} />

        <div className="lg:col-span-2">
          <DisplayTextarea label="Note" value={absenceDetails?.note || '-'} />
        </div>

        {/* justificatif */}
        <DownloadJustificatif
          file={absenceDetails?.fichierJustificatifPdf}
          setFileUrl={setFileUrl}
          setOpenPdfModal={setOpenPdfModal}
        />

        <DisplayPdf
          openModal={openPdfModal}
          setOpenModal={setOpenPdfModal}
          fileUrl={fileUrl}
        />
      </div>
    </>
  )
}
