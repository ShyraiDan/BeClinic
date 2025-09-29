import { notFound } from 'next/navigation'
import { ReactNode, Suspense } from 'react'

import { auth } from '@/auth'
import { LoadingContainer } from '@/components/ui/container'
import { UserRoles } from '@/shared/types'

interface AuthGuardProps {
  targetRole: UserRoles[]
  children: ReactNode
  className?: string
}

const AuthGuard = async ({ children, targetRole }: AuthGuardProps) => {
  const session = await auth()

  if (!targetRole.includes(session?.user?.role || UserRoles.GUEST)) {
    notFound()
  }

  return children
}

const AuthGuardLayout = ({ targetRole, children, className }: AuthGuardProps) => (
  <Suspense fallback={<LoadingContainer className={className} />}>
    <AuthGuard targetRole={targetRole}>{children}</AuthGuard>
  </Suspense>
)

export default AuthGuardLayout
