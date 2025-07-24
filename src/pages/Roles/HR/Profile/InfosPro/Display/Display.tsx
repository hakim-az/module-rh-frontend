import ProfileBanner from '../../components/ProfileBanner'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import JustificatifsDisplayForm from '@/components/DisplayForms/JustificatifsDisplayForm/JustificatifsDisplayForm'
import InfoProDisplayForm from '@/components/DisplayForms/InfoProDisplayForm/InfoProDisplayForm'
import ContractDispalyForm from '@/components/DisplayForms/ContractDispalyForm/ContractDispalyForm'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import UploadAvatarModal from '../../components/UploadAvatarModal'
import { useState } from 'react'

export default function InfosPro() {
  const { userDetails, isLoadingUser } = useDashboardContext()
  const [activeUploadAvatarModal, setActiveUploadAvatarModal] =
    useState<boolean>(false)

  return (
    <>
      <ProfileBanner setActiveUploadAvatarModal={setActiveUploadAvatarModal} />
      <div className="w-11/12 flex flex-col gap-12 mx-auto max-w-[1280px] pb-20">
        <InfoProDisplayForm loading={isLoadingUser} details={userDetails} />
        <JustificatifsDisplayForm
          loading={isLoadingUser}
          details={userDetails}
        />
        <ContractDispalyForm loading={isLoadingUser} details={userDetails} />
      </div>
      <CustomModal
        openModal={activeUploadAvatarModal}
        setOpenModal={setActiveUploadAvatarModal}>
        <UploadAvatarModal
          setActiveSendRequestModal={setActiveUploadAvatarModal}
        />
      </CustomModal>
    </>
  )
}
