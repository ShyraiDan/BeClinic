'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ErrorText } from '@/components/ui/errorText'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  return (
    <>
      <Button>Button</Button>
      <div className='mt-4'>
        <Label>Label</Label>
        <Input />
        <ErrorText>Error</ErrorText>
      </div>
      <Button onClick={() => toast.success('Success')}>Click</Button>
      <Button onClick={() => toast.error('Error')}>Click</Button>

      <Skeleton className='w-10 h-10' />

      <Toaster richColors />
    </>
  )
}
