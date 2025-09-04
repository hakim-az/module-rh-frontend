import { TableCell, TableRow } from '@/components/ui/table'
import { CloudAlert } from 'lucide-react'

interface PropsType {
  title: string
  content: string
  columns: number
}

export default function NotFoundTable({ title, content, columns }: PropsType) {
  return (
    <TableRow>
      <TableCell colSpan={columns} className="h-[350px] w-full">
        <div className="flex items-center justify-center flex-col gap-6 pb-10">
          <CloudAlert width={250} height={250} />
          <div className="flex flex-col gap-3 text-center">
            <span className="text-3xl font-medium">{title}</span>
            <p className="text-lg">{content}</p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  )
}
