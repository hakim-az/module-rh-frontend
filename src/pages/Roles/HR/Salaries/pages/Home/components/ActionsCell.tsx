import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/KeyCloakContext/useAuth'
import { notify } from '@/lib/ToastNotification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { MoreHorizontal, InfoIcon, Lock, Ban, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface ActionsCellProps {
  id: string
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

  const queryClient = useQueryClient()

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  // Mutation pour supprimer un utilisateur
  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      notify({
        message: 'Salarié supprimé avec succès',
        type: 'success',
      })
      queryClient.invalidateQueries({ queryKey: ['users'] }) // Invalidate users list
      setTimeout(() => {
        navigate(0) // Refresh page
      }, 200)
    },
    onError: (error) => {
      console.error(error)
      notify({
        message: 'Échec de la suppression du salarié',
        type: 'error',
      })
    },
  })

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

          {/* Action détails */}
          <DropdownMenuItem
            disabled={statut === 'user-registred'}
            className="group cursor-pointer"
            onClick={() => deleteUserMutation.mutate()}>
            <Trash className="group-hover:text-red-500 " />
            <span className="group-hover:text-red-500">Supprimer salarié</span>
          </DropdownMenuItem>

          {/* Action coffre fort */}
          <DropdownMenuItem
            disabled={statut === 'user-registred'}
            className="group cursor-pointer"
            onClick={() => navigate(`coffre/${id}`)}>
            <Lock className="group-hover:text-blue-500 " />
            <span className="group-hover:text-blue-500">Coffre salarié</span>
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
                    ? 'Désactivation...'
                    : 'Désactiver l’utilisateur'}
                </span>
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
