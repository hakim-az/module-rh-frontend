import { useLocation } from 'react-router-dom'
import { pagePath } from '@/lib/PagePath'

function PagePath() {
  // path
  const location = useLocation()
  const formattedPath = pagePath(location.pathname)
  return (
    <div className="flex items-center w-full h-16 px-4 md:px-6 lg:px-8 xl:px-10">
      <span className="text-sm capitalize text-blue-600 font-medium lg:text-base font-robotoMedium">
        {formattedPath}
      </span>
    </div>
  )
}

export default PagePath
