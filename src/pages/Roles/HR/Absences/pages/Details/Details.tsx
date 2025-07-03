import DisplayInput from '@/components/DisplayInput/DisplayInput'
import PagePath from '@/components/PagePath/PagePath'
import PDFIcon from '@/assets/icons/pdf-icon.png'
import { Download } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import { useState } from 'react'
import ApprouverAbsenceModal from './Modals/ApprouverAbsenceModal'
import RefuserAbsenceModal from './Modals/RefuserAbsenceModal'

export default function Details() {
  const { statut } = useParams<{
    statut: string
    absenceId: string
  }>()

  const [activeApprouverAbsenceModal, setActiveApprouverAbsenceModal] =
    useState(false)
  const [activeRefuserAbsenceModal, setActiveRefuserAbsenceModal] =
    useState(false)
  return (
    <>
      <PagePath />

      {statut === 'approuver' && (
        <div className="w-11/12 mx-auto max-w-[1280px] mb-10 flex items-center justify-center">
          <span className="bg-green-600 text-white text-lg font-medium px-14 py-2 rounded">
            Approuver
          </span>
        </div>
      )}
      {statut === 'refuser' && (
        <div className="w-11/12 flex-col gap-5 mx-auto max-w-[1280px] mb-10 flex items-center justify-center">
          <span className="bg-red-600  text-white text-lg font-medium px-14 py-2 rounded">
            Refuser
          </span>
          <span className="inline-block w-full h-36 overflow-y-scroll no-scrollbar p-4 rounded border border-red-500 bg-white">
            Motif de refus
          </span>
        </div>
      )}

      {/* details */}
      <div className="w-11/12 max-w-[1280px] mb-20 mt-5 mx-auto grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-10 gap-y-8 rounded-md border border-gray-200 shadow-md">
        {/* Type d'absence */}
        <div className="col-span-2">
          <DisplayInput label="Type d'absence" value="Congé maladie" />
        </div>
        {/* Date de début */}
        <DisplayInput label="Date de début" value="01-01-2015" />
        {/* Date de fin */}
        <DisplayInput label="Date de fin" value="10-01-2015" />
        {/* Note */}
        <div className="col-span-2">
          <DisplayInput label="Note" value="Note" />
        </div>
        {/* justificatif */}
        <div className="col-span-1">
          <div className="border flex items-center justify-between p-4 border-gray-300 rounded shadow-2xs">
            <div className="flex items-center gap-4">
              <img src={PDFIcon} alt="" />
              <div className="flex flex-col">
                <span className="font-semibold">Justificatif.pdf</span>
                <span className="text-sm text-gray-500">5.3 Mb</span>
              </div>
            </div>
            <Download
              className="hover:text-blue-500 cursor-pointer transition-all ease-in-out delay-75"
              size={32}
            />
          </div>
        </div>
        {/* submit buttons */}
      </div>
      <div className="w-11/12 max-w-[1280px] mx-auto">
        {statut === 'en-attente' && (
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
      {/* approuver */}
      <CustomModal
        openModal={activeApprouverAbsenceModal}
        setOpenModal={setActiveApprouverAbsenceModal}>
        <ApprouverAbsenceModal
          setActiveApprouverAbsenceModal={setActiveApprouverAbsenceModal}
        />
      </CustomModal>
      {/* refuser */}
      <CustomModal
        openModal={activeRefuserAbsenceModal}
        setOpenModal={setActiveRefuserAbsenceModal}>
        <RefuserAbsenceModal
          setActiveRefuserAbsenceModal={setActiveRefuserAbsenceModal}
        />
      </CustomModal>
    </>
  )
}
