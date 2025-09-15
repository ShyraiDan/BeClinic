import { cn } from '@/utils/utils'

interface BurgerMenuProps {
  button: React.ReactNode
  content: React.ReactNode
  isOpen: boolean
  showModal: () => void
}

export const BurgerMenu = ({ button, content, isOpen, showModal }: BurgerMenuProps) => {
  return (
    <div>
      {button}
      {isOpen && (
        <div onClick={showModal} className='fixed top-0 left-0 z-10 w-full h-screen opacity-50 bg-neutral-800' />
      )}
      <div
        className={cn(
          'bg-white fixed top-0 left-[-200%] h-[100dvh] w-[290px] px-2.5 z-[20] flex flex-col transition-all ease-in-out duration-300',
          isOpen && 'p-5 left-0'
        )}>
        {content}
      </div>
    </div>
  )
}
