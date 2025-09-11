import { Lock } from 'lucide-react'

export default function Banner() {
  return (
    <div className="w-11/12 p-8 lg:p-10 relative mx-auto overflow-hidden bg-[#C2185B]/20 my-16 max-w-[1280px] text-white min-h-[320px] rounded-lg">
      <Lock className="absolute right-0 bottom-0 -m-14 w-96 h-96 stroke-[#C2185B]/20 lg:stroke-[#C2185B]/80" />
      <div>
        <span className="text-[#C2185B] text-2xl inline-block mb-4 font-medium">
          Gérez votre coffre-fort numérique en toute sécurité :
        </span>
        <ul className="list-disc pl-6 text-lg text-[#C2185B]">
          <li>Consultez la liste des documents ajoutés.</li>
          <li>Visualisez les détails de chaque document stocké.</li>
          <li>
            Ajoutez des documents tels que bulletins de paie, attestations, etc.
          </li>
          <li>Modifiez les documents existants facilement.</li>
          <li>Assurez la confidentialité et la sécurité des données.</li>
        </ul>
      </div>
    </div>
  )
}
