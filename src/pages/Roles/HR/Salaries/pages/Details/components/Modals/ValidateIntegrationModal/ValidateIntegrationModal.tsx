import { CheckCircleIcon } from '@heroicons/react/16/solid'

interface PropsType {
  setActiveValidateIntegrationModal: (
    activeValidateIntegrationModal: boolean
  ) => void
}

export default function ValidateIntegrationModal({
  setActiveValidateIntegrationModal,
}: PropsType) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full section-email">
      {/* Hero icon */}
      <CheckCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-green-500" />
      {/* content */}
      <div className="w-full h-full section-title ">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Approuver formulaire d'intégration ajouter et contrat
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point de valider les informations du salarié.Une fois
          confirmé, vous pourrez ajouter et envoyer le contrat de travail.
          Veillez à ce que toutes les données soient exactes avant de
          poursuivre.
        </p>
      </div>
      {/* buttons */}
      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          onClick={() => setActiveValidateIntegrationModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem('userStatus', 'step-4')
            setActiveValidateIntegrationModal(false)
            window.location.reload()
          }}
          className="w-2/3 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          Valider
        </button>
      </div>
    </div>
  )
}
