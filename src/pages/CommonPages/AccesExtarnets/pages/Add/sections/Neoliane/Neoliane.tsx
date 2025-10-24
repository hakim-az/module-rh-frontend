import SectionHeader from '../../components/SectionHeader'

export default function Neoliane() {
  return (
    <>
      <SectionHeader
        title="Neoliane"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa laudantium mollitia doloremque dolor, at expedita accusamus repellendus excepturi recusandae labore aut quod optio odit incidunt sed deserunt maiores a debitis ad, harum corporis consectetur distinctio error. Tempore, a cum saepe dolore quas odit iste quos dolorum, tempora, ipsam consectetur?"
      />
      <iframe
        src="https://www.monneoliane.fr/"
        width="100%"
        height="600"
        sandbox="allow-forms allow-scripts"
        title="Espace Client ECA Assurances"></iframe>

      <a
        href="https://www.monneoliane.fr/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline">
        Ouvrir Mon Néoliane
      </a>
    </>
  )
}
