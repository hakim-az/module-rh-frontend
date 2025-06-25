import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`

export default function FileViewer() {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [width, setWidth] = useState(800)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const clamped = Math.max(300, Math.min(1000, containerWidth))
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
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-center gap-2 flex-wrap mb-4">
        <button type="button" onClick={goPrev} disabled={pageNumber <= 1}>
          Prev
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={pageNumber >= (numPages || 1)}>
          Next
        </button>
        <span>
          Page {pageNumber} of {numPages || '...'}
        </span>
      </div>

      <div
        ref={containerRef}
        className="mx-auto bg-red-400 w-full px-2"
        style={{ maxWidth: '1000px', minWidth: '300px' }}>
        <Document
          file="/files/sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            width={width}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  )
}
