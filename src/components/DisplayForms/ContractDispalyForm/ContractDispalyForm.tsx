import DisplayInput from '@/components/DisplayInput/DisplayInput'
import { formatDateToLabel } from '@/lib/formatDate'
import type { User } from '@/types/user.types'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`

interface IProps {
  details: User | undefined
  loading: boolean
}

export default function ContractDispalyForm({ details, loading }: IProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [width, setWidth] = useState(800)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const clamped = Math.max(300, Math.min(800, containerWidth))
        setWidth(clamped)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goPrev = () => setPageNumber((prev) => Math.max(prev - 1, 1))
  const goNext = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1))

  if (loading) {
    return <>Loading...</>
  }

  return (
    <section className="min-h-screen pb-20">
      <div className="grid grid-cols-1 mb-20 bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Définition du contrat :
        </span>
        {/* Poste */}
        <DisplayInput label="Poste" value={details?.contrat.poste ?? '-'} />
        {/* Type de contrat */}
        <DisplayInput
          label="Type de contrat"
          value={details?.contrat.typeContrat ?? '-'}
        />
        {/* Date de début */}
        <DisplayInput
          label="Date de début"
          value={formatDateToLabel(details?.contrat.dateDebut) ?? '-'}
        />
        {/* Date de fin */}
        <DisplayInput
          label="Date de fin"
          value={formatDateToLabel(details?.contrat.dateFin) ?? '-'}
        />
        {/* Matricule */}
        <DisplayInput
          label="Matricule"
          value={details?.contrat.matricule ?? '-'}
        />
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          L'établissement et le service de santé :
        </span>
        {/* Etablissement */}
        <DisplayInput
          label="Etablissement"
          value={details?.contrat.etablissementDeSante ?? '-'}
        />
        {/* Service de santé */}
        <DisplayInput
          label="Service de santé"
          value={details?.contrat.serviceDeSante ?? '-'}
        />
      </div>
      <div className="grid grid-cols-1 mb-20 bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
        <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
          Rémunération :
        </span>
        {/* Mode de salaire de base */}
        <DisplayInput
          label="Mode de salaire de base"
          value={details?.contrat.salaire ?? '-'}
        />
      </div>
      <div
        ref={containerRef}
        className="mx-auto flex items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded"
        style={{ maxWidth: '800px', minWidth: '300px' }}>
        <Document
          file={
            ['contract-uploaded', 'email-sent'].includes(details?.statut ?? '')
              ? (details?.contrat?.fichierContratNonSignerPdf ?? '')
              : ['contract-signed', 'user-approuved'].includes(
                    details?.statut ?? ''
                  )
                ? (details?.contrat?.fichierContratSignerPdf ?? '')
                : ''
          }
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      {/* pagination */}
      <div className="flex justify-center gap-5 flex-wrap mt-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={pageNumber <= 1}
          className="px-5 py-1 disabled:cursor-not-allowed disabled:opacity-50 bg-white border border-gray-400 cursor-pointer rounded">
          Prev
        </button>
        <span>
          Page {pageNumber} of {numPages || '...'}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={pageNumber >= (numPages || 1)}
          className="px-5 py-1 disabled:cursor-not-allowed disabled:opacity-50 text-white bg-black border border-gray-400 cursor-pointer rounded">
          Next
        </button>
      </div>
    </section>
  )
}
