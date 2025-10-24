import PagePath from '@/components/PagePath/PagePath'
import ItemList from './components/ItemList'
import { useState } from 'react'
import Microsoft from './sections/Microsoft/Microsoft'
import Badges from './sections/Badges/Badges'
import Eca from './sections/Eca/Eca'
import MondialTv from './sections/MondialTv/MondialTv'
import Neoliane from './sections/Neoliane/Neoliane'
import Ohm from './sections/Ohm/Ohm'
import Plenitude from './sections/Plenitude/Plenitude'
import Winlead from './sections/Winlead/Winlead'

export default function Add() {
  const [currentItem, setCurrentItem] = useState('MS365')

  const renderSection = (currentItem: string) => {
    switch (currentItem) {
      case 'MS365':
        return <Microsoft />
      case 'BADGES':
        return <Badges />
      case 'ECA':
        return <Eca />
      case 'MTV':
        return <MondialTv />
      case 'NEO':
        return <Neoliane />
      case 'OHM':
        return <Ohm />
      case 'PLN':
        return <Plenitude />
      case 'WLD':
        return <Winlead />
      default:
        return <span>Section not found</span>
    }
  }
  return (
    <>
      <PagePath />
      <section className="w-11/12 max-w-[1280px] mx-auto pb-20 pt-8 flex items-start justify-between gap-5 md:gap-8 lg:gap-16">
        <ItemList setCurrentItem={setCurrentItem} currentItem={currentItem} />
        <div className="flex flex-col gap-20 flex-1">
          {renderSection(currentItem)}
        </div>
      </section>
    </>
  )
}
