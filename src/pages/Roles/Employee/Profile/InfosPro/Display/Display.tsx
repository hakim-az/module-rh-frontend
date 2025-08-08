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
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 max-w-[1280px] mx-auto py-16 gap-x-8 gap-y-16 items-start">
      <ProfileBanner setActiveUploadAvatarModal={setActiveUploadAvatarModal} />
      <div className="col-span-1 lg:col-span-2">
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
    </section>
  )
}
