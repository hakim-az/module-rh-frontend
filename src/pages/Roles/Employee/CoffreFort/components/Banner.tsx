import { Lock } from 'lucide-react'

export default function Banner() {
  return (
    <div className="w-11/12 p-10 relative mx-auto overflow-hidden bg-[#fff] border border-gray-300 my-16 max-w-[1280px] text-white h-[320px] rounded-lg">
      <Lock className="absolute right-0 bottom-0 -m-14 w-96 h-96 stroke-[#000000]/80" />
      <div>
        <span className="text-[#000000] text-2xl inline-block mb-4 font-medium">
          Vos documents professionnels, accessibles en toute sécurité :
        </span>
        <ul className="list-disc pl-6 text-lg text-[#000000]">
          <li>Consultez la liste de vos documents personnels.</li>
          <li>Visualisez les détails de chaque document RH.</li>
          <li>Téléchargez vos fichiers au format PDF à tout moment.</li>
          <li>Accédez à vos bulletins de paie, attestations et plus.</li>
          <li>Vos données sont conservées de manière confidentielle.</li>
        </ul>
      </div>
    </div>
  )
}
