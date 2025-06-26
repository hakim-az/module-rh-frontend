import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import FileViewer from './components/FileViewer/FileViewer'
import { useState } from 'react'
import SignContractModal from './components/SignContractModal/SignContractModal'

export default function Step3() {
  // states
  const [activeSignContractModal, setActiveSignContractModal] =
    useState<boolean>(false)
  return (
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
  )
}
