import { useLocation, useNavigate } from 'react-router-dom'
import { pagePath } from '@/lib/PagePath'
import { CircleArrowLeft } from 'lucide-react'

function PagePath() {
  const location = useLocation()
  const formattedPath = pagePath(location.pathname)
  const navigate = useNavigate()
  return (
    <div className="flex items-center w-full h-16 px-4 md:px-6 lg:px-8 xl:px-10 text-blue-600 gap-4">
      <CircleArrowLeft
        onClick={() => navigate(-1)}
        className="cursor-pointer"
      />
      <span className="text-sm capitalize  font-medium lg:text-base font-robotoMedium">
        {formattedPath}
      </span>
    </div>
  )
}

export default PagePath
