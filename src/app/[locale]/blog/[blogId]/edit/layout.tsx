import { ReactNode } from 'react'

import AuthGuardLayout from '@/components/HOC/AuthGuard'
import { UserRoles } from '@/shared/types'

interface PatientLayoutProps {
  children: ReactNode
}

const EditBlogLayout = ({ children }: PatientLayoutProps) => {
  return <AuthGuardLayout targetRole={[UserRoles.DOCTOR]}>{children}</AuthGuardLayout>
}

export default EditBlogLayout
