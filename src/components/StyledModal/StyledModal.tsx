import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/utils/utils'

interface StyledModalProps {
  triggerButton: React.ReactNode
  contentClassName?: string
  children: React.ReactNode
}

export const StyledModal = ({ triggerButton, contentClassName, children }: StyledModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className={cn('border-none', contentClassName)}>{children}</DialogContent>
    </Dialog>
  )
}
