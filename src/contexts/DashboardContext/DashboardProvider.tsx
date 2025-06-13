import React, { useMemo, useState } from 'react'
import { FormContext } from './DashboardContext'

type Props = {
  children: React.ReactNode
}

export default function DashboardProvider({ children }: Props) {
  const [wideNavbar, setWideNavbar] = useState<boolean>(false)

  const value = useMemo(() => ({ wideNavbar, setWideNavbar }), [wideNavbar])

  return <FormContext value={value}>{children}</FormContext>
}
