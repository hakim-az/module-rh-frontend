import DisplayInput from '@/components/DisplayInput/DisplayInput'
import PagePath from '@/components/PagePath/PagePath'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import { useState } from 'react'
import ApprouverAbsenceModal from './Modals/ApprouverAbsenceModal'
import RefuserAbsenceModal from './Modals/RefuserAbsenceModal'
import axios from 'axios'
import DownloadJustificatif from '@/components/DownloadJustificatif/DownloadJustificatif'
import DisplayPdf from '@/components/DisplayPdf/DisplayPdf'
import DisplayTextarea from '@/components/DisplayTextarea/DisplayTextarea'
import { formatDateToLabel } from '@/lib/formatDate'
import type { IAbsence } from '@/types/tables/rh'
import { useQuery } from '@tanstack/react-query'

export default function Details() {
  const { absenceId } = useParams()
  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [fileUrl, setFileUrl] = useState<string | undefined>('')

  const [activeApprouverAbsenceModal, setActiveApprouverAbsenceModal] =
    useState(false)
  const [activeRefuserAbsenceModal, setActiveRefuserAbsenceModal] =
    useState(false)

  // ✅ Fetch with React Query
  const {
    data: absenceDetails,
    isLoading,
    isError,
  } = useQuery<IAbsence>({
    queryKey: ['absence-details', absenceId],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/absences/${absenceId}`
      )
      return response.data
    },
    enabled: !!absenceId,
  })

  return (
    <>
      <PagePath />

      {absenceDetails?.statut === 'approuver' && (
        <div className="w-11/12 mx-auto max-w-[1280px] mb-10 flex items-center justify-center">
          <span className="bg-green-600 text-white text-lg font-medium px-14 py-2 rounded">
            Approuver
          </span>
        </div>
      )}
      {absenceDetails?.statut === 'refuser' && (
        <div className="w-11/12 flex-col gap-5 mx-auto max-w-[1280px] mb-10 flex items-center justify-center">
          <span className="bg-red-600  text-white text-lg font-medium px-14 py-2 rounded">
            Refuser
          </span>
          <span className="inline-block w-full h-36 overflow-y-scroll no-scrollbar p-4 rounded border border-red-500 bg-white">
            {absenceDetails.motifDeRefus}
          </span>
        </div>
      )}

      {/* details */}
      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">
          Chargement...
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-red-500">
          Une erreur est survenue lors du chargement des détails de l’absence.
        </div>
      ) : (
        <div className="w-11/12 max-w-[1280px] mb-20 mt-5 mx-auto grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-10 gap-y-8 rounded-md border border-gray-200 shadow-md">
          {/* Type d'absence */}
          <div className="col-span-1 lg:col-span-2">
            <DisplayInput
              label="Type d'absence"
              value={
                absenceDetails?.typeAbsence
                  ? absenceDetails.typeAbsence.replace(/_/g, ' ')
                  : '-'
              }
            />
          </div>

          {/* Date de début */}
          <DisplayInput
            label="Date de début"
            value={
              absenceDetails?.dateDebut
                ? formatDateToLabel(absenceDetails.dateDebut)
                : '-'
            }
          />

          {/* Date de fin */}
          <DisplayInput
            label="Date de fin"
            value={
              absenceDetails?.dateFin
                ? formatDateToLabel(absenceDetails.dateFin)
                : '-'
            }
          />

          {/* Note */}
          <div className="col-span-1 lg:col-span-2">
            <DisplayTextarea label="Note" value={absenceDetails?.note || '-'} />
          </div>

          {/* Justificatif */}
          <DownloadJustificatif
            file={absenceDetails?.fichierJustificatifPdf}
            setFileUrl={setFileUrl}
            setOpenPdfModal={setOpenPdfModal}
          />
        </div>
      )}

      {/* Approuver / Refuser */}
      <div className="w-11/12 max-w-[1280px] mb-20 mx-auto">
        {absenceDetails?.statut === 'en-attente' && (
          <div className="flex items-center justify-center gap-8">
            <Button
              onClick={() => setActiveRefuserAbsenceModal(true)}
              className="w-32 bg-red-500 hover:bg-red-400">
              Refuser
            </Button>
            <Button
              onClick={() => setActiveApprouverAbsenceModal(true)}
              className="w-32 bg-green-500 hover:bg-green-400">
              Approuver
            </Button>
          </div>
        )}
      </div>

      {/* Approuver Modal */}
      <CustomModal
        openModal={activeApprouverAbsenceModal}
        setOpenModal={setActiveApprouverAbsenceModal}>
        <ApprouverAbsenceModal
          setActiveApprouverAbsenceModal={setActiveApprouverAbsenceModal}
          absenceId={absenceDetails?.id}
        />
      </CustomModal>

      {/* Refuser Modal */}
      <CustomModal
        openModal={activeRefuserAbsenceModal}
        setOpenModal={setActiveRefuserAbsenceModal}>
        <RefuserAbsenceModal
          setActiveRefuserAbsenceModal={setActiveRefuserAbsenceModal}
          absenceId={absenceDetails?.id}
        />
      </CustomModal>

      {/* PDF Viewer */}
      <DisplayPdf
        openModal={openPdfModal}
        setOpenModal={setOpenPdfModal}
        fileUrl={fileUrl}
      />
    </>
  )
}
