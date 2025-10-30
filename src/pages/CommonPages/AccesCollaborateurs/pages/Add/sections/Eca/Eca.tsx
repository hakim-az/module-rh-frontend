import SectionHeader from '../../components/SectionHeader'

export default function Eca() {
  return (
    <>
      <SectionHeader
        title="ECA"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa laudantium mollitia doloremque dolor, at expedita accusamus repellendus excepturi recusandae labore aut quod optio odit incidunt sed deserunt maiores a debitis ad, harum corporis consectetur distinctio error. Tempore, a cum saepe dolore quas odit iste quos dolorum, tempora, ipsam consectetur?"
      />

      <iframe
        src="https://espace-client.eca-assurances.com/login"
        width="100%"
        height="600"
        sandbox="allow-forms allow-scripts"
        title="Espace Client ECA Assurances"
      />

      <a
        href="https://espace-client.eca-assurances.com/login"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline">
        Ouvrir Mon ECA
      </a>
    </>
  )
}
