import { CreditCard } from 'lucide-react'

export default function Banner() {
  return (
    <div className="w-11/12 p-10 relative mx-auto overflow-hidden bg-[#1E3A8A]/20 my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg">
      <CreditCard className="absolute right-0 bottom-0 -m-14 w-96 h-96 stroke-[#1E3A8A]/10 lg:stroke-[#1E3A8A]/80" />
      <div>
        <span className="text-[#1E3A8A] text-2xl inline-block mb-4 font-medium">
          Gérez les titres-restaurant et leurs suivis :
        </span>
        <ul className="list-disc pl-6 text-lg text-[#1E3A8A]">
          <li>Visualisez la liste des suivis des titres-restaurant ajoutés.</li>
          <li>Consultez les détails de chaque titre-restaurant.</li>
          <li>Ajoutez un nouveau suivi de titre-restaurant.</li>
          <li>Modifiez les suivis existants facilement.</li>
          <li>Assurez un suivi précis et à jour des titres-restaurant.</li>
        </ul>
      </div>
    </div>
  )
}
