import DisplayInput from '@/components/DisplayInput/DisplayInput'

export default function InfosPerso() {
  return (
    <section className="w-full mx-auto gap-10 flex flex-col ">
      {/* identité */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Identité :
        </span>
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
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Naissance et nationalité :
        </span>
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
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Coordonnées :
        </span>
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
        {/* Domicilié fiscalement hors de France */}
        {/* <DisplayInput
          label="E-mail personnelle"
          value="azzaz.abdelhakim@gmail.com"
        /> */}
      </div>
    </section>
  )
}
