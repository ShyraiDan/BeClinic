import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { StyledLink } from '@/components/ui/styledLink'
import { cn } from '@/lib/utils'
import { removeScrollBar } from '@/utils/removeScrollBar'
import { BurgerMenu } from '@/components/ui/burgerMenu'
import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface BurgerMenuContentProps {
  showModal: () => void
  isAuth: boolean
}

const links = [
  {
    href: '/',
    label: 'links.hero'
  },
  {
    href: '/doctors',
    label: 'links.doctors'
  },
  {
    href: '/blog',
    label: 'links.blog'
  },
  {
    href: '/contacts',
    label: 'links.contacts'
  },
  {
    href: '/faq',
    label: 'links.faqs'
  }
]

const BurgerMenuContent = ({ showModal, isAuth }: BurgerMenuContentProps) => {
  const path = usePathname()
  const t = useTranslations('header')

  return (
    <>
      <div className='flex justify-end'>
        <Button
          onClick={() => showModal()}
          variant='icon'
          className='h-[30px] w-[30px] p-0 bg-transparent hover:bg-transparent [&>svg]:transition-all [&>svg]:duration-300 [&>svg]:ease-in-out hover:[&>svg]:text-red-100'>
          <X size={20} className='text-black' />
        </Button>
      </div>
      <div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className='py-2.5 flex'>
              <StyledLink
                href={link.href}
                variant='burger'
                className={cn(path === link.href && 'text-blue-200')}
                onClick={() => showModal()}>
                {t(link.label)}
              </StyledLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export const HeaderBurger = () => {
  const [isBurgerShow, setBurgerShow] = useState(false)

  const showModal = () => {
    setBurgerShow((state) => !state)
    removeScrollBar(isBurgerShow)
  }

  return (
    <BurgerMenu
      button={
        <Button
          aria-label='Open menu'
          onClick={() => showModal()}
          aria-expanded={isBurgerShow}
          className='m-0 bg-transparent border-none relative rounded-2xl p-0 w-10 h-10 text-black ml-2 lg:!hidden hover:!bg-[#E6EAF0]'>
          <Menu size={30} className='text-white' />
        </Button>
      }
      showModal={showModal}
      content={<BurgerMenuContent showModal={showModal} isAuth={false} />}
      isOpen={isBurgerShow}
    />
  )
}
