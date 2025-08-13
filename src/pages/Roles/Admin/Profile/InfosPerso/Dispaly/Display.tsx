import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import InfoPersoDispalyForm from '@/components/DisplayForms/InfoPersoDisplayForm/InfoPersoDisplayForm'
import { useState } from 'react'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import UploadAvatarModal from '../../components/UploadAvatarModal'
import ProfileBanner from '../../components/ProfileBanner'

export default function Display() {
  const { userDetails, isLoadingUser } = useDashboardContext()
  const [activeUploadAvatarModal, setActiveUploadAvatarModal] =
    useState<boolean>(false)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 max-w-[1280px] mx-auto py-16 gap-x-8 gap-y-16 items-start">
      {/* banner */}
      <ProfileBanner setActiveUploadAvatarModal={setActiveUploadAvatarModal} />
      <div className="col-span-1 lg:col-span-2">
        <InfoPersoDispalyForm loading={isLoadingUser} details={userDetails} />
      </div>
      <CustomModal
        openModal={activeUploadAvatarModal}
        setOpenModal={setActiveUploadAvatarModal}>
        <UploadAvatarModal
          setActiveSendRequestModal={setActiveUploadAvatarModal}
        />
      </CustomModal>
    </section>
  )
}
