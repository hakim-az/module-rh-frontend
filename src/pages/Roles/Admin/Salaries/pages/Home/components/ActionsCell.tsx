import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, InfoIcon, Ban } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/KeyCloakContext/useAuth'
import { useMutation } from '@tanstack/react-query'

interface ActionsCellProps {
  id: string // l'ID de l'utilisateur
  statut: string
}

export default function ActionsCell({ id, statut }: ActionsCellProps) {
  const navigate = useNavigate()
  const { banUser, enableUser } = useAuth()

  // Mutation pour bannir un utilisateur
  const banUserMutation = useMutation({
    mutationFn: () => banUser(id),
    onSuccess: () => {
      console.log(`✅ Utilisateur ${id} banni avec succès`)
      window.location.reload()
    },
    onError: (error) => {
      console.error('❌ Échec du bannissement de l’utilisateur :', error)
    },
  })

  // Mutation pour réactiver un utilisateur
  const enableUserMutation = useMutation({
    mutationFn: () => enableUser(id),
    onSuccess: () => {
      console.log(`✅ Utilisateur ${id} réactivé avec succès`)
      window.location.reload()
    },
    onError: (error) => {
      console.error('❌ Échec de la réactivation de l’utilisateur :', error)
    },
  })

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
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
            <InfoIcon className="mr-2 h-4 w-4 group-hover:text-blue-500" />
            <span className="group-hover:text-blue-500">Détails salarié</span>
          </DropdownMenuItem>

          {/* Bannir / Réactiver seulement si approuvé ou banni */}
          {(statut === 'user-approuved' || statut === 'user-banned') &&
            (statut === 'user-banned' ? (
              <DropdownMenuItem
                className="group cursor-pointer"
                disabled={enableUserMutation.isPending}
                onClick={() => enableUserMutation.mutate()}>
                <Ban className="mr-2 h-4 w-4 group-hover:text-green-500" />
                <span className="group-hover:text-green-500">
                  {enableUserMutation.isPending
                    ? 'Activation...'
                    : 'Réactiver l’utilisateur'}
                </span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="group cursor-pointer"
                disabled={banUserMutation.isPending}
                onClick={() => banUserMutation.mutate()}>
                <Ban className="mr-2 h-4 w-4 group-hover:text-red-500" />
                <span className="group-hover:text-red-500">
                  {banUserMutation.isPending
                    ? 'Bannissement...'
                    : 'Bannir l’utilisateur'}
                </span>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
