import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, InfoIcon, SquarePenIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ActionsCellProps {
  id: string
  statut: string
}

export default function ActionsCell({ id, statut }: ActionsCellProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer group flex items-center gap-2 py-2"
            onClick={() => navigate(`details/${id}`)}>
            <InfoIcon className="w-4 h-4 group-hover:text-blue-500" />
            <span className="group-hover:text-blue-500">Détails d'absence</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer group flex items-center gap-2 py-2"
            disabled={statut !== 'en-attente'}
            onClick={() => navigate(`update/${id}`)}>
            <SquarePenIcon className="w-4 h-4 group-hover:text-blue-500" />
            <span className="group-hover:text-blue-500">
              Modifier l'absence
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
