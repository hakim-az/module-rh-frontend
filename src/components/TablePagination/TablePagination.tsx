import { Button } from '@/components/ui/button'
import type { Table } from '@tanstack/react-table'

interface TablePaginationProps<T> {
  table: Table<T>
}

export default function TablePagination<T>({ table }: TablePaginationProps<T>) {
  if (!table.getRowModel().rows?.length) return null

  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex

  const getPaginationPages = (): (number | 'dots')[] => {
    const pages: (number | 'dots')[] = []

    if (pageCount <= 4) {
      for (let i = 0; i < pageCount; i++) pages.push(i)
    } else {
      if (currentPage <= 1) {
        pages.push(0, 1, 2, 'dots', pageCount - 1)
      } else if (currentPage >= pageCount - 2) {
        pages.push(0, 'dots', pageCount - 3, pageCount - 2, pageCount - 1)
      } else {
        pages.push(
          0,
          'dots',
          currentPage,
          currentPage + 1,
          'dots',
          pageCount - 1
        )
      }
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center py-8">
      <nav className="flex items-center space-x-1 text-sm">
        {/* Previous */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <span className="sr-only">Previous</span>
          <span className="text-gray-500">{'<'}</span>
        </Button>

        {/* Page numbers */}
        {getPaginationPages().map((page) => {
          if (page === 'dots') {
            return (
              <span key={`dots-${page}`} className="px-2 text-gray-500">
                ...
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <Button
              key={page}
              variant={isActive ? 'outline' : 'ghost'}
              className={`h-8 w-8 p-0 ${isActive ? 'font-bold' : ''}`}
              onClick={() => table.setPageIndex(page)}>
              {page + 1}
            </Button>
          )
        })}

        {/* Next */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <span className="sr-only">Next</span>
          <span className="text-gray-500">{'>'}</span>
        </Button>
      </nav>
    </div>
  )
}
