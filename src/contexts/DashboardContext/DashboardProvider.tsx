import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { FormContext } from './DashboardContext'
import type { User } from '@/types/user.types'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

async function fetchUserDetails(userId: string | null) {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  if (!userId) return undefined // use undefined, not null
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data.data as User
}

export default function DashboardProvider({ children }: Props) {
  const [wideNavbar, setWideNavbar] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const queryClient = useQueryClient()

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const authUserRaw = sessionStorage.getItem('auth_user') // changed here
      if (authUserRaw) {
        const authUser = JSON.parse(authUserRaw)
        if (authUser?.id) {
          setUserId(authUser.id)
        } else {
          console.warn('No user ID found in auth_user object.')
        }
      }
    } catch (err) {
      console.error('Failed to parse auth_user from sessionStorage:', err) // changed here
    }
  }, [])

  const {
    data: userDetails,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ['userDetails', userId],
    queryFn: () => fetchUserDetails(userId),
    enabled: !!userId, // only run if userId is set
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  })

  // Handle fetch errors
  useEffect(() => {
    if (error) {
      console.error('Failed to fetch user details:', error)
    }
  }, [error])

  // Manual refresh function
  const refreshUserDetails = useCallback(() => {
    if (userId) {
      queryClient.invalidateQueries({
        queryKey: ['userDetails', userId],
      })
    }
  }, [queryClient, userId])

  const value = useMemo(
    () => ({
      wideNavbar,
      setWideNavbar,
      userDetails,
      isLoadingUser,
      refreshUserDetails,
    }),
    [wideNavbar, userDetails, isLoadingUser, refreshUserDetails]
  )

  return <FormContext value={value}>{children}</FormContext>
}
