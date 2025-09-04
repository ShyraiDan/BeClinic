import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface StyledModalProps {
  triggerButton: React.ReactNode
  contentClassName?: string
  children: React.ReactNode
}

export const StyledModal = ({ triggerButton, contentClassName, children }: StyledModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className={contentClassName}>{children}</DialogContent>
    </Dialog>
  )
}
