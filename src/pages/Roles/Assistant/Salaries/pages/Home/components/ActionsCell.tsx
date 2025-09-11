import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, InfoIcon, Lock } from 'lucide-react'
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
          {/* Action détails */}
          <DropdownMenuItem
            disabled={statut === 'user-registred'}
            className="group cursor-pointer"
            onClick={() => navigate(`details/${id}`)}>
            <InfoIcon className="group-hover:text-blue-500 " />
            <span className="group-hover:text-blue-500">Détails salarié</span>
          </DropdownMenuItem>

          {/* Action coffre fort */}
          <DropdownMenuItem
            disabled={statut === 'user-registred'}
            className="group cursor-pointer"
            onClick={() => navigate(`coffre/${id}`)}>
            <Lock className="group-hover:text-blue-500 " />
            <span className="group-hover:text-blue-500">Coffre salarié</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
