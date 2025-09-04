'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ErrorText } from '@/components/ui/errorText'
import { Label } from '@/components/ui/label'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { StyledLink } from '@/components/ui/styledLink'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { StyledSelect } from '@/components/StyledSelect/StyledSelect'

export default function Home() {
  const mockedValues = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' }
  ]

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

      <StyledLink href='/'>Styled Link</StyledLink>

      <StyledLinkButton href='/'>Styled Link</StyledLinkButton>

      <StyledSelect options={mockedValues} triggerClassName='w-80' placeholder='Select an option' />

      <Toaster richColors />
    </>
  )
}
