import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { CircleUserRound } from 'lucide-react'

interface IProps {
  setActiveUploadAvatarModal: (activeUploadAvatarModal: boolean) => void
}

export default function ProfileBanner({ setActiveUploadAvatarModal }: IProps) {
  const { userDetails } = useDashboardContext()
  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname

  const isPersonalInfo = pathname.includes('informations-personnelles')
  const isProfessionalInfo = pathname.includes('informations-professionnelles')
  return (
    <div className="w-full relative h-[260px] mb-32 lg:h-[300px] bg-[#1E3A8A]/20 border-b-4 border-b-black">
      <div className="w-11/12 max-w-[1280px] mt-[200px] lg:mt-[228px] gap-10 flex items-center justify-start mx-auto bottom-0">
        <div className="relative">
          {userDetails?.avatar === '' ? (
            <CircleUserRound width={40} height={40} />
          ) : (
            <img
              src={userDetails?.avatar}
              alt="user-avatar"
              className="size-10 min-w-10 min-h-10 rounded bg-white border border-gray-300"
            />
          )}
          <PencilSquareIcon
            onClick={() => setActiveUploadAvatarModal(true)}
            className="w-8 p-1 rounded-md stroke-white bg-blue-500 hover:scale-110 transition-all ease-in-out delay-75 bottom-1 cursor-pointer right-1 absolute"
          />
        </div>
        <div className="flex flex-col gap-3 bg-black/40 py-3 px-6 rounded min-w-[200px] text-white">
          <span className="text-lg capitalize lg:text-xl font-medium">
            {userDetails?.nomDeNaissance} {userDetails?.prenom}
          </span>
          <span className="text-base capitalize lg:text-lg">
            {userDetails?.contrat?.poste}
          </span>
        </div>
      </div>
      {isPersonalInfo && (
        <button
          type="button"
          onClick={() => navigate('modifier-informations-personnelles')}
          className="absolute bg-[#1E3A8A] text-white px-8 py-2 rounded right-8 top-8 hover:scale-105 transition-all ease-in-out delay-75">
          Modifier mes informations personnelles
        </button>
      )}

      {isProfessionalInfo && (
        <button
          type="button"
          onClick={() => navigate('modifier-informations-professionnelles')}
          className="absolute bg-[#1E3A8A] text-white px-8 py-2 rounded right-8 top-8 hover:scale-105 transition-all ease-in-out delay-75">
          Modifier mes informations professionnelles
        </button>
      )}
    </div>
  )
}
