import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

function UserInfoCard() {
  const { wideNavbar } = useDashboardContext()

  return (
    <div className="flex flex-col items-center justify-center py-4 font-poppins">
      {/* user iamge */}
      <img
        className={` rounded-full border-2  border-[#4c72fd60] object-cover shadow-sm shadow-primaryBlue ${wideNavbar ? 'size-[60px]' : 'size-12'}`}
        src=""
        alt="user-avatar"
      />
      {/* user info */}
      <div className="flex flex-col items-center pt-2">
        <span
          className={`text-primaryBlue font-semibold capitalize text-center mb-1 ${wideNavbar ? 'text-lg' : 'text-xs'}`}>
          John Doe
        </span>
        <span
          className={` text-primarygray font-robotoMedium text-center ${wideNavbar ? 'text-sm' : 'text-[10px]'}`}>
          Role
        </span>
      </div>
    </div>
  )
}

export default UserInfoCard
