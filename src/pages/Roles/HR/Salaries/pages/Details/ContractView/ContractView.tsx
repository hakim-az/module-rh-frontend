import { useState } from 'react'
import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import IntegrateSalarieModel from '../components/Modals/IntegrateSalarieModel/IntegrateSalarieModel'
import PagePath from '@/components/PagePath/PagePath'
import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import ContractDispalyForm from '@/components/DisplayForms/ContractDispalyForm/ContractDispalyForm'

type IProps = {
  statusLabel: React.ReactNode
}

// types
export interface Step {
  label: string
  status: 'done' | 'current' | 'upcoming'
}

export default function SalarieValidation({ statusLabel }: IProps) {
  const { salarieDetails, isLoadingSalarieDetails } = useSalarieDetailsContext()
  // states
  const [activeValidateSalarieModal, setActiveValidateSalarieModal] =
    useState<boolean>(false)

  return (
    <>
      <PagePath />
      <div className="p-4 w-11/12 mx-auto pb-20 max-w-[1200px]">
        {statusLabel}

        <section className="w-full mx-auto gap-10 flex flex-col ">
          <ContractDispalyForm
            details={salarieDetails}
            loading={isLoadingSalarieDetails}
          />
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setActiveValidateSalarieModal(true)}
              className="mb-5 mr-5 flex items-center justify-center gap-3 hover:scale-110 transition-all ease delay-75 cursor-pointer bg-green-500 text-white px-8 py-2 rounded">
              Approuver le salarié
            </button>
          </div>
        </section>
      </div>
      <CustomModal
        openModal={activeValidateSalarieModal}
        setOpenModal={setActiveValidateSalarieModal}>
        <IntegrateSalarieModel
          setActiveValidateSalarieModal={setActiveValidateSalarieModal}
        />
      </CustomModal>
    </>
  )
}
