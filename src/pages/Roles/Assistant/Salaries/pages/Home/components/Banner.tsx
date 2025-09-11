import { Users } from 'lucide-react'

export default function Banner() {
  return (
    <div className="w-11/12 p-10 relative mx-auto overflow-hidden bg-[#2A9D8F]/20 my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg">
      <Users className="absolute right-0 bottom-0 -m-8 w-96 h-96 stroke-[#2A9D8F]/10 lg:stroke-[#2A9D8F]/80" />
      <div className="max-w-[700px] ">
        <span className="text-[#2A9D8F] text-2xl inline-block mb-4 font-medium">
          Gérez les salariés selon leur statut :
        </span>
        <ul className="list-disc pl-6 text-lg text-[#2A9D8F]">
          <li>
            Consultez la liste et les fiches détaillées des salariés
            enregistrés.
          </li>
          <li>
            <strong>Statut : Formulaire complété</strong> — Ajoutez les
            informations du contrat, joignez le fichier PDF et envoyez-le au
            salarié.
          </li>
          <li>
            <strong>Statut : Contrat signé</strong> — Validez le salarié pour
            lui permettre d'accéder à son dashboard.
          </li>
        </ul>
      </div>
    </div>
  )
}
