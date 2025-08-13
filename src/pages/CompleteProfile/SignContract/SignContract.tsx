import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import FileViewer from './components/FileViewer/FileViewer'
import { useState } from 'react'
import SignContractModal from './components/SignContractModal/SignContractModal'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import ContractUploader from './components/ContractUploader/ContractUploader'

export default function SignContract() {
  const { userDetails } = useDashboardContext()
  // states
  const [activeSignContractModal, setActiveSignContractModal] =
    useState<boolean>(false)
  return (
    <>
      {userDetails?.statut === 'contract-uploaded' && (
        <>
          <FileViewer setActiveSignContractModal={setActiveSignContractModal} />
          <CustomModal
            openModal={activeSignContractModal}
            setOpenModal={setActiveSignContractModal}>
            <SignContractModal
              setActiveSignContractModal={setActiveSignContractModal}
            />
          </CustomModal>
        </>
      )}
      {userDetails?.statut === 'email-sent' && (
        <>
          <ContractUploader />
        </>
      )}
    </>
  )
}
