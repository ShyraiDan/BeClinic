'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ErrorText } from '@/components/ui/errorText'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

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

      <Toaster richColors />
    </>
  )
}
