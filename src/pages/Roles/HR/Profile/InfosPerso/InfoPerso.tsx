import DisplayInput from '@/components/DisplayInput/DisplayInput'
import ProfileBanner from './components/ProfileBanner'
import { SquarePen } from 'lucide-react'

export default function InfoPerso() {
  return (
    <>
      <ProfileBanner />
      <section className="w-11/12 max-w-[1200px] pb-28 mx-auto gap-10 flex flex-col ">
        {/* identité */}
        <div className="grid relative grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Identité :
          </span>
          <SquarePen
            size={36}
            className="absolute top-4 right-4 bg-white p-2 cursor-pointer rounded text-black border border-black hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all ease-in-out delay-75"
          />
          {/* civilité */}
          <DisplayInput label="Civilité" value="M" />
          {/* Prénom */}
          <DisplayInput label="Prénom" value="Abdelhakim" />
          {/* Nom de naissance */}
          <DisplayInput label="Nome de naissance" value="AZZAZ" />
          {/* Nom usuel */}
          <DisplayInput label="Nom usuel" value="AZZAZ" />
          {/* Situation familiale */}
          <DisplayInput label="Situation familiale" value="Célibataire" />
          {/* Numéro de sécurité sociale */}
          <DisplayInput
            label="Numéro de sécurité sociale"
            value="234365983667738"
          />
        </div>
        {/* Naissance et nationalité : */}
        <div className="grid relative grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Naissance et nationalité :
          </span>
          <SquarePen
            size={36}
            className="absolute top-4 right-4 bg-white p-2 cursor-pointer rounded text-black border border-black hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all ease-in-out delay-75"
          />
          {/* Date de naissance */}
          <DisplayInput label="Date de naissance" value="19/08/2001" />
          {/* Pays de naissance */}
          <DisplayInput label="Pays de naissance" value="Algérie" />
          {/* Départmemnt de naissance */}
          <DisplayInput label="Départmemnt de naissance" value="Alger" />
          {/* commune de naissance */}
          <DisplayInput label="commune de naissance" value="Alger" />
          {/* Pays de nationalité */}
          <DisplayInput label="Pays de nationalité" value="Algérie" />
        </div>
        {/* coordonnées & adresse */}
        <div className="grid relative grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Coordonnées :
          </span>
          <SquarePen
            size={36}
            className="absolute top-4 right-4 bg-white p-2 cursor-pointer rounded text-black border border-black hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all ease-in-out delay-75"
          />
          {/* E-mail personnelle */}
          <DisplayInput
            label="E-mail personnelle"
            value="azzaz.abdelhakim@gmail.com"
          />
          {/* E-mail professionnel */}
          <DisplayInput
            label="E-mail professionnel"
            value="a.azzaz@finanssor.fr"
          />
          {/* Téléphone portable personnelle */}
          <DisplayInput
            label="Téléphone portable personnelle"
            value="+33 7 77 77 77 77"
          />
          {/* Téléphone portable professionnel */}
          <DisplayInput
            label="Téléphone portable professionnel"
            value="+33 7 77 77 77 77"
          />
          {/* adresse */}
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Adresse :
          </span>
          {/* Pays */}
          <DisplayInput label="Pays" value="France" />
          {/* Code postal */}
          <DisplayInput label="Code postal" value="92240" />
          {/* Ville */}
          <DisplayInput label="Ville" value="Malakoff" />
          {/* Adresse */}
          <DisplayInput label="Adresse" value="20 rue pierre valette" />
          {/* Complément d'adresse */}
          <DisplayInput label="Complément d'adresse" value="Appartement 306" />
        </div>
        {/* Informations bancaire : */}
        <div className="grid relative grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Informations bancaire :
          </span>
          <SquarePen
            size={36}
            className="absolute top-4 right-4 bg-white p-2 cursor-pointer rounded text-black border border-black hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all ease-in-out delay-75"
          />
          {/* IBAN */}
          <DisplayInput label="IBAN" value="0987654321" />
          {/* BIC */}
          <DisplayInput label="BIC" value="0987654321" />
        </div>
        {/* Contacte d'urgence : */}
        <div className="grid relative grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
          <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
            Informations bancaire :
          </span>
          <SquarePen
            size={36}
            className="absolute top-4 right-4 bg-white p-2 cursor-pointer rounded text-black border border-black hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all ease-in-out delay-75"
          />
          {/* Nom complet */}
          <DisplayInput label="Nom complet" value="John doe" />
          {/* Lien avec le salarié */}
          <DisplayInput label="Lien avec le salarié" value="Frère" />
          {/* Téléphone */}
          <DisplayInput label="Téléphone" value="07 77 77 77 77" />
        </div>
      </section>
    </>
  )
}
