import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { FormContext } from './SalariDetailsContext'
import type { User } from '@/types/user.types'
import axios from 'axios'

type Props = {
  children: React.ReactNode
}

export default function SalarieDetailsProvider({ children }: Props) {
  const [isLoadingSalarieDetails, setIsLoadingSalarieDetails] = useState(false)
  const [salarieDetails, setSalarieDetails] = useState<User>()
  const [userId, setUserId] = useState<string | undefined>(undefined)

  const fetchSalarieDetails = useCallback(async (id: string) => {
    setIsLoadingSalarieDetails(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id}`
      )
      setSalarieDetails(response.data.data)
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    } finally {
      setIsLoadingSalarieDetails(false)
    }
  }, [])

  // Watch for changes to userId
  useEffect(() => {
    if (userId) {
      fetchSalarieDetails(userId)
    }
  }, [userId, fetchSalarieDetails])

  const value = useMemo(
    () => ({
      isLoadingSalarieDetails,
      salarieDetails,
      setUserId, // expose the setter
    }),
    [isLoadingSalarieDetails, salarieDetails]
  )

  return <FormContext value={value}>{children}</FormContext>
}
