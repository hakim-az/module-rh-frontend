import { useSalarieDetailsContext } from '@/contexts/SalarieDetails/SalariDetailsContext'
import { FilePenLine } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`

interface IPropsType {
  initiateSignature: () => void | Promise<void>
  status: string
}

export default function FileViewer({ initiateSignature, status }: IPropsType) {
  const { salarieDetails } = useSalarieDetailsContext()
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

  return (
    <section className="min-h-screen  py-20">
      <div
        ref={containerRef}
        className="mx-auto flex items-center bg-white justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded"
        style={{ maxWidth: '800px', minWidth: '300px' }}>
        <Document
          file={salarieDetails?.contrat.fichierContratSignerPdf}
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
          <button
            type="button"
            disabled={status === 'loading'}
            onClick={initiateSignature}
            className="mb-5 mr-5 flex disabled:opacity-30 disabled:cursor-not-allowed items-center justify-center gap-3 float-end hover:scale-110 transition-all ease delay-75 cursor-pointer bg-blue-500 text-white px-8 py-2 rounded">
            {status === 'loading' ? (
              'Chargement...'
            ) : (
              <>
                Signer contrat <FilePenLine />
              </>
            )}
          </button>
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
