import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import SectionHeader from '../../components/SectionHeader'
import DisplayAccountInfo from './components/DisplayAccountInfo'
import EcaDemande from './components/EcaDemande'
import type { Acces } from '@/types/user.types'
import EcaCreation from './components/EcaCreation'

export default function Eca() {
  const { salarieDetails } = useSalarieDetailsContext()

  const EcaAccess: Acces | undefined = salarieDetails?.acces?.find(
    (access) => access.productCode === 'ECA'
  )

  const hasAccess = !!EcaAccess
  const isPending = EcaAccess?.status === 'encours' // only true when access exists without password

  return (
    <>
      <SectionHeader
        title="ECA"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit..."
      />

      {!hasAccess && <EcaDemande />}
      {hasAccess && isPending && <EcaCreation id={EcaAccess.id} />}
      {hasAccess && !isPending && <DisplayAccountInfo />}
    </>
  )
}
