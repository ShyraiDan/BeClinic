import { ReactNode } from 'react'

import TanstackProvider from '@/providers/TanstackProvider'

interface PatientLayoutProps {
  children: ReactNode
}

const PatientLayout = ({ children }: PatientLayoutProps) => {
  return <TanstackProvider>{children}</TanstackProvider>
}

export default PatientLayout
