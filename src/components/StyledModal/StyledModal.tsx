import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/utils/utils'

import type { DialogProps } from '@radix-ui/react-dialog'

interface StyledModalProps extends DialogProps {
  triggerButton: React.ReactNode
  contentClassName?: string
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/unbound-method
export const StyledModal = ({ triggerButton, contentClassName, children, onOpenChange, open }: StyledModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className={cn('border-none', contentClassName)}>{children}</DialogContent>
    </Dialog>
  )
}
