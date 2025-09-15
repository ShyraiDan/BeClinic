import { cn } from '@/utils/utils'

export const TextArea = ({ children, className, rows = 5, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      rows={rows}
      className={cn(
        'font-regular opacity-90 px-3 py-1.5 rounded border border-grey-400 w-full bg-white resize-none',
        className
      )}
      {...props}>
      {children}
    </textarea>
  )
}
