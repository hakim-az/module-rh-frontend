import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router-dom'

interface PropsType {
  setActiveSendRequestModal: (activeSendRequestModal: boolean) => void
}

export default function SendRequestModal({
  setActiveSendRequestModal,
}: PropsType) {
  const navigate = useNavigate()
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full section-email">
      {/* Hero icon */}
      <CheckCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-green-500" />
      {/* content */}
      <div className="w-full h-full section-title ">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Ajouter titre restaurant
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point d'ajouter un enregistrement de
          titres-restaurant pour le salarié sélectionné. Vérifiez que le mois,
          l'année, le nombre de jours ouvrés et les justificatifs sont corrects.
          Une fois confirmé, le salarié pourra consulter cette information dans
          son historique.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          onClick={() => setActiveSendRequestModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(`/accueil/titre-restaurant`)
          }}
          className="w-2/3 disabled:cursor-not-allowed py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          Valider
        </button>
      </div>
    </div>
  )
}
