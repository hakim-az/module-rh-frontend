import { CalendarOff } from 'lucide-react'

export default function Banner() {
  return (
    <div className="w-11/12 p-10 relative mx-auto overflow-hidden bg-[#C2185B]/20 my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg">
      <CalendarOff className="absolute right-0 bottom-0 -my-14 w-96 h-96 stroke-[#C2185B]/20 lg:stroke-[#C2185B]/80" />
      <div>
        <span className="text-[#C2185B] text-2xl inline-block mb-4 font-medium">
          Gérez les demandes d'absence efficacement :
        </span>
        <ul className="list-disc pl-6 text-lg text-[#C2185B]">
          <li>Visualisez la liste complète des demandes d'absence.</li>
          <li>Consultez les détails de chaque demande rapidement.</li>
          <li>Approuvez ou refusez les demandes en un seul clic.</li>
          <li>Suivez en temps réel le statut des demandes.</li>
          <li>Assurez une gestion fluide et transparente des absences.</li>
        </ul>
      </div>
    </div>
  )
}
