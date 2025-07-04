import DisplayInput from '@/components/DisplayInput/DisplayInput'
import ProfileBanner from './components/ProfileBanner'
import { Download } from 'lucide-react'
import PDFIcon from '@/assets/icons/pdf-icon.png'

export default function InfosPro() {
  return (
    <>
      <ProfileBanner />
      <section className="w-11/12 max-w-[1200px] pb-28 mx-auto gap-10 flex flex-col ">
        {/* Informations bancaire : */}
        <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Informations bancaire :
          </span>
          {/* IBAN */}
          <DisplayInput label="IBAN" value="0987654321" />
          {/* BIC */}
          <DisplayInput label="BIC" value="0987654321" />
        </div>
        {/* Contacte d'urgence : */}
        <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Informations bancaire :
          </span>
          {/* Nom complet */}
          <DisplayInput label="Nom complet" value="John doe" />
          {/* Lien avec le salarié */}
          <DisplayInput label="Lien avec le salarié" value="Frère" />
          {/* Téléphone */}
          <DisplayInput label="Téléphone" value="07 77 77 77 77" />
        </div>
        {/* Contacte d'urgence : */}
        <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Définition du contrat :
          </span>
          {/* Poste */}
          <DisplayInput label="Poste" value="Développeur Full-stack" />
          {/* Type de cpntrat */}
          <DisplayInput label="Type de cpntrat" value="Stage" />
          {/* Date de début */}
          <DisplayInput label="Date de début" value="19/05/2025" />
          {/* Date de fin */}
          <DisplayInput label="Date de fin" value="31/08/2025" />
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            L'établissement et le service de santé : :
          </span>
          {/* Etablissement de sante */}
          <DisplayInput label="Etablissement de sante" value="Test" />
          {/* Service de santé */}
          <DisplayInput label="Service de santé" value="Test" />
        </div>
        {/* Contacte d'urgence : */}
        <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Rémuniration:
          </span>
          {/* Mode salaire de base */}
          <DisplayInput label="Mode salaire de base" value="1100" />
        </div>
        {/* documents */}
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-12 w-full">
          {/* card 01 */}
          <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
            <img src={PDFIcon} alt="" className="w-48" />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">carte-vitale.pdf</span>
                <span className="text-gray-400">5.3 Mb</span>
              </div>
              <Download
                className="hover:text-blue-500 cursor-pointer"
                size={32}
              />
            </div>
          </div>
          {/* card 01 */}
          <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
            <img src={PDFIcon} alt="" className="w-48" />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">carte-vitale.pdf</span>
                <span className="text-gray-400">5.3 Mb</span>
              </div>
              <Download
                className="hover:text-blue-500 cursor-pointer"
                size={32}
              />
            </div>
          </div>
          {/* card 01 */}
          <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
            <img src={PDFIcon} alt="" className="w-48" />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">carte-vitale.pdf</span>
                <span className="text-gray-400">5.3 Mb</span>
              </div>
              <Download
                className="hover:text-blue-500 cursor-pointer"
                size={32}
              />
            </div>
          </div>
          {/* card 01 */}
          <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
            <img src={PDFIcon} alt="" className="w-48" />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">carte-vitale.pdf</span>
                <span className="text-gray-400">5.3 Mb</span>
              </div>
              <Download
                className="hover:text-blue-500 cursor-pointer"
                size={32}
              />
            </div>
          </div>
          {/* card 01 */}
          <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
            <img src={PDFIcon} alt="" className="w-48" />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">carte-vitale.pdf</span>
                <span className="text-gray-400">5.3 Mb</span>
              </div>
              <Download
                className="hover:text-blue-500 cursor-pointer"
                size={32}
              />
            </div>
          </div>
          {/* card 01 */}
          <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
            <img src={PDFIcon} alt="" className="w-48" />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">carte-vitale.pdf</span>
                <span className="text-gray-400">5.3 Mb</span>
              </div>
              <Download
                className="hover:text-blue-500 cursor-pointer"
                size={32}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
