import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import SectionHeader from '../../components/SectionHeader'
import DisplayAccountInfo from './components/DisplayAccountInfo'
import NeolianeDemande from './components/NeolianeDemande'
import type { Acces } from '@/types/user.types'
import NeolianeCreation from './components/NeolianeCreation'

export default function Eca() {
  const { salarieDetails } = useSalarieDetailsContext()

  const NeolianeAcces: Acces | undefined = salarieDetails?.acces?.find(
    (access) => access.productCode === 'Neoliane'
  )

  const hasAccess = !!NeolianeAcces
  const isPending = NeolianeAcces?.status === 'encours' // only true when access exists without password

  return (
    <>
      <SectionHeader
        title="Neoliane"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit..."
      />

      {!hasAccess && <NeolianeDemande />}
      {hasAccess && isPending && <NeolianeCreation id={NeolianeAcces.id} />}
      {hasAccess && !isPending && <DisplayAccountInfo />}
    </>
  )
}
