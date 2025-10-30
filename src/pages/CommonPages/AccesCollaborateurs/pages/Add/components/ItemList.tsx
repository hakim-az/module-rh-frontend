import ECA from '@/assets/icons/ECA.png'
import MS365 from '@/assets/icons/MS365.png'
import MTV from '@/assets/icons//MTV.png'
import NEO from '@/assets/icons/NEO.png'
import OHM from '@/assets/icons/OHM.png'
import PLN from '@/assets/icons/PLN.png'
import WINLEAD from '@/assets/icons/winlead.png'

const apps = [
  { name: 'Microsoft 365', value: 'MS365', logo: MS365 },
  { name: 'Winlead', value: 'WLD', logo: WINLEAD },
  { name: 'ECA', value: 'ECA', logo: ECA },
  { name: 'Neoliane', value: 'NEO', logo: NEO },
  { name: 'Mondial TV', value: 'MTV', logo: MTV },
  { name: 'Plénitude', value: 'PLN', logo: PLN },
  { name: 'OHM Energie', value: 'OHM', logo: OHM },
  { name: 'Génération de badges', value: 'BADGES', logo: ECA },
]

interface IProps {
  setCurrentItem: (item: string) => void
  currentItem: string
}

export default function ItemList({ setCurrentItem, currentItem }: IProps) {
  return (
    <div className="flex flex-col gap-4">
      {apps.map((app, index) => {
        const isActive = currentItem === app.value

        return (
          <div
            key={index}
            onClick={() => setCurrentItem(app.value)}
            className={`p-3 rounded-md flex items-center border gap-4 cursor-pointer transition-all ease-in-out delay-20
              ${isActive ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white  border-gray-100 shadow hover:bg-blue-100 '}
            `}>
            {/* icon */}
            <img
              src={app.logo}
              className="size-10 inline-block rounded-sm transition-all ease-in-out delay-20"
              alt=""
            />
            {/* label */}
            <span
              className={`transition-all w-[180px] hidden lg:inline-block ease-in-out delay-20 ${isActive ? 'text-white font-semibold' : ''}`}>
              {app.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
