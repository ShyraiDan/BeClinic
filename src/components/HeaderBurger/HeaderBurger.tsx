import { X, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { BurgerMenu } from '@/components/ui/burgerMenu'
import { Button } from '@/components/ui/button'
import { StyledLink } from '@/components/ui/styledLink'
import { UserRoles } from '@/shared/types'
import { removeScrollBar } from '@/utils/removeScrollBar'
import { cn } from '@/utils/utils'

import type { Session } from 'next-auth'

interface BurgerMenuContentProps {
  showModal: () => void
  session: Session | null
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

const BurgerMenuContent = ({ showModal, session }: BurgerMenuContentProps) => {
  const path = usePathname()
  const t = useTranslations('header')
  const isPatient = session?.user?.role === UserRoles.PATIENT

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
          {isPatient && (
            <>
              <li className='py-2.5 flex'>
                <StyledLink
                  href={`/mycabinet/patient/${session.user.id}?tab=appointments`}
                  variant='burger'
                  className={cn(path === `/mycabinet/patient/${session.user.id}?tab=appointments` && 'text-blue-200')}
                  onClick={() => showModal()}>
                  {t('links.appointment')}
                </StyledLink>
              </li>
              <li className='py-2.5 flex'>
                <StyledLink
                  href={`/mycabinet/patient/${session.user.id}?tab=analyzes`}
                  variant='burger'
                  className={cn(path === `/mycabinet/patient/${session.user.id}?tab=analyzes` && 'text-blue-200')}
                  onClick={() => showModal()}>
                  {t('links.analyzes')}
                </StyledLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

interface HeaderBurgerProps {
  session: Session | null
}

export const HeaderBurger = ({ session }: HeaderBurgerProps) => {
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
      content={<BurgerMenuContent showModal={showModal} session={session} />}
      isOpen={isBurgerShow}
    />
  )
}
