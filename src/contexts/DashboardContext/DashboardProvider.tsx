import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { FormContext } from './DashboardContext'
import type { User } from '@/types/user.types'
import axios from 'axios'

type Props = {
  children: React.ReactNode
}

export default function DashboardProvider({ children }: Props) {
  const [wideNavbar, setWideNavbar] = useState<boolean>(false)
  const [userStatus, setUserStatus] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [userDetails, setUserDetails] = useState<User>()

  const fetchAbsenceDetails = useCallback(async () => {
    setIsLoadingUser(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`
      )
      setUserDetails(response.data.data)
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    } finally {
      setIsLoadingUser(false)
    }
  }, [userId])

  useEffect(() => {
    fetchAbsenceDetails()
  }, [fetchAbsenceDetails])

  useEffect(() => {
    const storedStatus = localStorage.getItem('userStatus')
    const storedUserId = localStorage.getItem('userId')
    setUserStatus(storedStatus)
    setUserId(storedUserId)
  }, [])

  const value = useMemo(
    () => ({
      wideNavbar,
      setWideNavbar,
      userDetails,
      isLoadingUser,
      userStatus,
    }),
    [isLoadingUser, userDetails, userStatus, wideNavbar]
  )

  return <FormContext value={value}>{children}</FormContext>
}
