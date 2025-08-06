import { CalendarOff } from 'lucide-react'

export default function Banner() {
  return (
    <div className="w-11/12 p-6 lg:p-10 relative mx-auto overflow-hidden bg-[#fff] border border-gray-300 my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg">
      <CalendarOff className="absolute right-0 bottom-0 -my-14 w-96 h-96 stroke-[#000000]/5 lg:stroke-[#000000]/80" />
      <div>
        <span className="text-[#000000] text-2xl inline-block mb-4 font-medium">
          Gérez vos absences simplement :
        </span>
        <ul className="list-disc pl-6 text-lg text-[#000000]">
          <li>Consultez toutes vos demandes d'absence.</li>
          <li>Visualisez les détails de chaque demande.</li>
          <li>Soumettez une nouvelle absence en quelques clics.</li>
          <li>Modifiez ou supprimez une demande en attente.</li>
          <li>Suivez le statut de traitement en temps réel.</li>
        </ul>
      </div>
    </div>
  )
}
