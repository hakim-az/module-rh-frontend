import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { CircleUserRound } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

interface IProps {
  setActiveUploadAvatarModal: (val: boolean) => void
}

export default function ProfileBanner({ setActiveUploadAvatarModal }: IProps) {
  const { userDetails } = useDashboardContext()
  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname

  const isPersonalInfo = pathname.includes('informations-personnelles')
  const isProfessionalInfo = pathname.includes('informations-professionnelles')
  return (
    <div className="bg-[#1E3A8A] md:sticky md:top-36 rounded-md border border-gray-300 flex flex-col items-center justify-center p-8">
      {/* avatar */}
      <div className="relative">
        {userDetails?.avatar === '' ? (
          <CircleUserRound
            width={144}
            height={144}
            className="bg-white rounded-full"
          />
        ) : (
          <img
            src={userDetails?.avatar}
            alt="user-avatar"
            className="h-48 object-cover bg-gray-300 border-2 border-black rounded-full"
          />
        )}
        <PencilSquareIcon
          onClick={() => setActiveUploadAvatarModal(true)}
          className="w-8 p-1 rounded-md stroke-white bg-blue-500 hover:scale-110 transition-all ease-in-out delay-75 bottom-1 cursor-pointer right-2 absolute"
        />
      </div>
      {/* content */}
      <div className="flex text-white gap-2 flex-col items-center justify-center mt-10">
        <span className="text-2xl font-semibold">
          {userDetails?.nomDeNaissance} {userDetails?.prenom}
        </span>
        <span className="text-lg font-medium">
          {userDetails?.emailProfessionnel}
        </span>
      </div>
      {/* update button */}
      {isPersonalInfo && (
        <button
          type="button"
          onClick={() => navigate('modifier-informations-personnelles')}
          className=" bg-white mt-24 text-sm font-medium text-[#1E3A8A] px-8 py-3.5 rounded hover:scale-105 transition-all ease-in-out delay-75">
          Modifier mes informations personnelles
        </button>
      )}

      {isProfessionalInfo && (
        <button
          type="button"
          onClick={() => navigate('modifier-informations-professionnelles')}
          className=" bg-white mt-24 text-sm font-medium text-[#1E3A8A] px-8 py-3.5 rounded hover:scale-105 transition-all ease-in-out delay-75">
          Modifier mes informations professionnelles
        </button>
      )}
    </div>
  )
}
