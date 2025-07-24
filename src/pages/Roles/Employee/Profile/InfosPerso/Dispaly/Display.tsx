import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import InfoPersoDispalyForm from '@/components/DisplayForms/InfoPersoDisplayForm/InfoPersoDisplayForm'
import ProfileBanner from '../../components/ProfileBanner'
import { useState } from 'react'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import UploadAvatarModal from '../../components/UploadAvatarModal'

export default function Display() {
  const { userDetails, isLoadingUser } = useDashboardContext()
  const [activeUploadAvatarModal, setActiveUploadAvatarModal] =
    useState<boolean>(false)

  return (
    <>
      <ProfileBanner setActiveUploadAvatarModal={setActiveUploadAvatarModal} />
      <div className="w-11/12 mx-auto max-w-[1280px] pb-20">
        <InfoPersoDispalyForm loading={isLoadingUser} details={userDetails} />
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
