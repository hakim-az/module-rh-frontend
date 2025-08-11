import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { FormContext } from './SalariDetailsContext'
import type { User } from '@/types/user.types'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

// API function
async function fetchSalarieDetails(userId: string | undefined) {
  if (!userId) return undefined // don't call API without userId
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`
  )
  return data.data as User
}

export default function SalarieDetailsProvider({ children }: Props) {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const queryClient = useQueryClient()

  // Fetch salarie details with React Query
  const {
    data: salarieDetails,
    isLoading: isLoadingSalarieDetails,
    error,
  } = useQuery({
    queryKey: ['salarieDetails', userId],
    queryFn: () => fetchSalarieDetails(userId),
    enabled: !!userId, // only fetch when userId is set
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  })

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch user details:', error)
    }
  }, [error])

  // Manual refresh
  const refreshSalarieDetails = useCallback(() => {
    if (userId) {
      queryClient.invalidateQueries({
        queryKey: ['salarieDetails', userId],
      })
    }
  }, [queryClient, userId])

  const value = useMemo(
    () => ({
      isLoadingSalarieDetails,
      salarieDetails,
      setUserId, // expose setter to trigger fetching
      refreshSalarieDetails, // manual refetch
    }),
    [isLoadingSalarieDetails, salarieDetails, refreshSalarieDetails]
  )

  return <FormContext value={value}>{children}</FormContext>
}
