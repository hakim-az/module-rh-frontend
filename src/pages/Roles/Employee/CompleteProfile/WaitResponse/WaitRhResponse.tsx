import Banner from '../components/Banner/Banner'
import Header from '../components/Header/Header'
import FileViewer from './components/FileViewer/FileViewer'

export default function WaitResponse() {
  return (
    <>
      <Header />
      <Banner
        title="03 - Attendre validation du RH"
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel repellendus aspernatur minus quo odit sunt consequatur porro soluta tenetur molestiae necessitatibus consequuntur in dicta maxime voluptatibus, autem debitis dolore explicabo harum expedita! Consectetur alias nam accusantium numquam doloribus minus nihil incidunt dolores quis id repudiandae iusto quidem facere quam est cum atque repellat et tempora nostrum, quae voluptatum! Ex, porro inventore! Totam atque id, accusamus libero fugit quo distinctio sapiente!"
      />
      <FileViewer />
    </>
  )
}
