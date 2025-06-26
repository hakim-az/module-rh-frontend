import { useEffect, useState } from 'react'
import Step1 from './Step1/Step1'
import Step2 from './Step2/Step2'
import Step3 from './Step3/Step3'
import Step4 from './Step4/Step4'

type UserStatus = 'step-1' | 'step-2' | 'step-3' | 'step-4'

export default function Details() {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedRole = localStorage.getItem('userStatus') as UserStatus | null
      const validRoles: UserStatus[] = ['step-1', 'step-2', 'step-3', 'step-4']

      if (storedRole && validRoles.includes(storedRole)) {
        setUserStatus(storedRole)
      } else {
        setUserStatus('step-1') // fallback
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  //   step 1
  if (userStatus === 'step-1') {
    return <Step1 />
  }
  //   step 2
  if (userStatus === 'step-2') {
    return <Step2 />
  }
  //   step 3
  if (userStatus === 'step-3') {
    return <Step3 />
  }
  //   step 4
  if (userStatus === 'step-4') {
    return <Step4 />
  }
}
