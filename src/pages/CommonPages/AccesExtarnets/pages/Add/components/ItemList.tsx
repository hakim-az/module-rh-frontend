const apps = [
  { name: 'Microsoft 365', value: 'MS365' },
  { name: 'Plénitude', value: 'PLN' },
  { name: 'OHM Energie', value: 'OHM' },
  { name: 'Winlead', value: 'WLD' },
  { name: 'ECA', value: 'ECA' },
  { name: 'Neoliane', value: 'NEO' },
  { name: 'Mondiale TV', value: 'MTV' },
  { name: 'Génération de badges', value: 'BADGES' },
]

interface IProps {
  setCurrentItem: (item: string) => void
  currentItem: string
}

export default function ItemList({ setCurrentItem, currentItem }: IProps) {
  return (
    <div className="flex flex-col gap-5">
      {apps.map((app, index) => {
        const isActive = currentItem === app.value

        return (
          <div
            key={index}
            onClick={() => setCurrentItem(app.value)}
            className={`p-3 rounded-md flex items-center gap-4 cursor-pointer transition-all ease-in-out delay-20
              ${isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 hover:bg-blue-500 hover:text-white'}
            `}>
            {/* icon */}
            <span
              className={`size-10 inline-block rounded-sm transition-all ease-in-out delay-20
                ${isActive ? 'bg-white' : 'bg-blue-200 group-hover:bg-white'}
              `}
            />
            {/* label */}
            <span
              className={`transition-all pr-10  hidden lg:inline-block ease-in-out delay-20
                ${isActive ? 'text-white' : ''}
              `}>
              {app.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
