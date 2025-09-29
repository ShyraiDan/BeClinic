import { ReactNode } from 'react'

import AuthGuardLayout from '@/components/HOC/AuthGuard'
import TanstackProvider from '@/providers/TanstackProvider'
import { UserRoles } from '@/shared/types'

interface PatientLayoutProps {
  children: ReactNode
}

const PatientLayout = ({ children }: PatientLayoutProps) => {
  return (
    <TanstackProvider>
      <AuthGuardLayout targetRole={[UserRoles.DOCTOR]}>{children}</AuthGuardLayout>
    </TanstackProvider>
  )
}

export default PatientLayout
