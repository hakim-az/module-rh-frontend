// import { useLocation, useNavigate } from 'react-router-dom'
// import { pagePath } from '@/lib/PagePath'
// import { CircleArrowLeft } from 'lucide-react'

// function PagePath() {
//   const location = useLocation()
//   const formattedPath = pagePath(location.pathname)
//   const navigate = useNavigate()
//   return (
//     <div className="flex items-center w-full h-16 px-4 md:px-6 lg:px-8 xl:px-10 text-blue-600 gap-4">
//       <CircleArrowLeft
//         onClick={() => navigate(-1)}
//         className="cursor-pointer"
//       />
//       <span className="text-sm capitalize  font-medium lg:text-base font-robotoMedium">
//         {formattedPath}
//       </span>
//     </div>
//   )
// }

// export default PagePath

import { useLocation, useNavigate } from 'react-router-dom'
import { CircleArrowLeft } from 'lucide-react'
import { pagePath } from '@/lib/PagePath'

function PagePath() {
  const location = useLocation()
  const navigate = useNavigate()

  // decodeURIComponent pour afficher correctement les accents (%C3%A9 -> é)
  const pathname = decodeURIComponent(location.pathname || '')

  // split et filtrage
  const parts = pathname.split('/').filter(Boolean)
  const lastPart = parts[parts.length - 1] || ''

  // Patterns d'ID courants
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i // UUID avec tirets
  const mongoIdRegex = /^[0-9a-f]{24}$/i // Mongo ObjectId
  const hex32Regex = /^[0-9a-f]{32}$/i // hex sans tirets (32 chars)
  const numericIdRegex = /^\d+$/ // nombres purs

  const isIdLike =
    uuidRegex.test(lastPart) ||
    mongoIdRegex.test(lastPart) ||
    hex32Regex.test(lastPart) ||
    numericIdRegex.test(lastPart)

  const cleanedParts = isIdLike ? parts.slice(0, -1) : parts
  const cleanedPath = '/' + cleanedParts.join('/')

  const formattedPath = pagePath(cleanedPath)

  return (
    <div className="flex items-center w-full h-16 px-4 md:px-6 lg:px-8 xl:px-10 text-blue-600 gap-4">
      <CircleArrowLeft
        onClick={() => navigate(-1)}
        className="cursor-pointer hover:text-blue-800 transition-colors"
        role="button"
        aria-label="Retour"
      />
      <span className="text-sm capitalize font-medium lg:text-base font-robotoMedium">
        {formattedPath}
      </span>
    </div>
  )
}

export default PagePath
