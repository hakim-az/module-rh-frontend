import CustomModal from '@/components/Headers/CustomModal/CustomModal'
import Banner from '../components/Banner/Banner'
import Header from '../components/Header/Header'
import FileViewer from './components/FileViewer/FileViewer'
import { useState } from 'react'
import SignContractModal from './components/SignContractModal/SignContractModal'

export default function SignContract() {
  // states
  const [activeSignContractModal, setActiveSignContractModal] =
    useState<boolean>(false)
  return (
    <>
      <Header />
      <Banner
        title="02 - Signature du contrat"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel repellendus aspernatur minus quo odit sunt consequatur porro soluta tenetur molestiae necessitatibus consequuntur in dicta maxime voluptatibus, autem debitis dolore explicabo harum expedita! Consectetur alias nam accusantium numquam doloribus minus nihil incidunt dolores quis id repudiandae iusto quidem facere quam est cum atque repellat et tempora nostrum, quae voluptatum! Ex, porro inventore! Totam atque id, accusamus libero fugit quo distinctio sapiente!"
      />
      <FileViewer setActiveSignContractModal={setActiveSignContractModal} />
      <CustomModal
        openModal={activeSignContractModal}
        setOpenModal={setActiveSignContractModal}>
        <SignContractModal
          setActiveSignContractModal={setActiveSignContractModal}
        />
      </CustomModal>
    </>
  )
}
