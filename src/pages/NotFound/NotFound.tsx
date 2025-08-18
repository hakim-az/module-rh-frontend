import { Link } from 'react-router-dom'
import BgNotFound from '@/assets/images/browser.png'

export default function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-primaryBlue bg-opacity-5">
      {/* Container */}
      <div className="container mx-auto flex flex-col items-center justify-center h-full">
        {/* image */}
        <img
          src={BgNotFound}
          alt="background_not_found"
          className="w-1/3 md:w-1/4 lg:w-1/5 mb-10"
        />
        {/* content */}
        <div className="flex flex-col items-center gap-3 lg:gap-5">
          <h1 className="font-black text-4xl sm:text-6xl text-primaryblack">
            Page non trouvée.
          </h1>
          <p className="font-sans text-center text-md sm:text-lg text-secondaryblack">
            La page que vous recherchez est introuvable ou n'existe pas.
          </p>
        </div>
        <Link
          to="/"
          className="mt-20 py-2 px-12 bg-black text-white rounded hover:scale-105 ease-linear">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
