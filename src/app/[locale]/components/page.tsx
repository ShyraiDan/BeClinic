'use client'

import { toast } from 'sonner'

import { StyledModal } from '@/components/StyledModal/StyledModal'
import { StyledSelect } from '@/components/StyledSelect/StyledSelect'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogDescription, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { ErrorText } from '@/components/ui/errorText'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Toaster } from '@/components/ui/sonner'
import { StyledLink } from '@/components/ui/styledLink'
import { StyledLinkButton } from '@/components/ui/styledLinkButton'

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

      <StyledSelect onChange={() => {}} options={mockedValues} triggerClassName='w-80' placeholder='Select an option' />

      <StyledModal triggerButton={<Button>Open Modal</Button>}>
        <>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name-1'>Name</Label>
              <Input id='name-1' name='name' defaultValue='Pedro Duarte' />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='username-1'>Username</Label>
              <Input id='username-1' name='username' defaultValue='@peduarte' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </>
      </StyledModal>

      <Toaster richColors />
    </>
  )
}
