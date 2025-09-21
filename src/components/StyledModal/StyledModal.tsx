import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/utils/utils'

import type { DialogProps } from '@radix-ui/react-dialog'

interface StyledModalProps extends DialogProps {
  triggerButton: React.ReactNode
  contentClassName?: string
  children: React.ReactNode
  noDescription?: boolean
}
export const StyledModal = ({
  noDescription,
  triggerButton,
  contentClassName,
  children,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  onOpenChange,
  open
}: StyledModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent aria-describedby={noDescription ? undefined : ''} className={cn('border-none', contentClassName)}>
        {children}
      </DialogContent>
    </Dialog>
  )
}
