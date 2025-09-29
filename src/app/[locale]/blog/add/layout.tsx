import { ReactNode } from 'react'

import AuthGuardLayout from '@/components/HOC/AuthGuard'
import { UserRoles } from '@/shared/types'

interface PatientLayoutProps {
  children: ReactNode
}

const AddBlogLayout = ({ children }: PatientLayoutProps) => {
  return <AuthGuardLayout targetRole={[UserRoles.DOCTOR]}>{children}</AuthGuardLayout>
}

export default AddBlogLayout
