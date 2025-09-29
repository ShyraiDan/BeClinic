'use client'

import { notFound } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

import { UserRoles } from '@/shared/types'

interface AuthGuardProps {
  targetRole: UserRoles[]
  children: ReactNode
  needSubscription?: boolean
  className?: string
}

const AuthClientGuard = ({ targetRole, children }: AuthGuardProps) => {
  const { data: session } = useSession()

  if (session && !targetRole.includes(session.user.role || UserRoles.GUEST)) {
    notFound()
  }

  return children
}

export default AuthClientGuard
