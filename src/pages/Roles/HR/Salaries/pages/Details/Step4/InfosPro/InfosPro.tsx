import DisplayInput from '@/components/DisplayInput/DisplayInput'

export default function InfosPro() {
  return (
    <section className="w-full mx-auto gap-10 flex flex-col ">
      {/* Informations bancaire */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Informations bancaire :
        </span>
        {/* IBAN */}
        <DisplayInput label="IBAN" value="1234567890" />
        {/* BIC */}
        <DisplayInput label="BIC" value="1234567890" />
      </div>
      {/* Contact d'urgence */}
      <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Contact d'urgence :
        </span>
        {/* Nom complet */}
        <DisplayInput label="Nom complet" value="AZZAZ Hichem" />
        {/* Lien avec le salarié */}
        <DisplayInput label="Lien avec le salarié " value="Frère" />
        {/* Téléphone */}
        <DisplayInput label="Téléphone" value="+33 7 77 77 77 77 " />
      </div>
    </section>
  )
}
