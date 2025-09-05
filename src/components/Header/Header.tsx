'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { HeaderBurger } from '@/components/HeaderBurger/HeaderBurger'
import { StyledLink } from '@/components/ui/styledLink'
import { cn } from '@/lib/utils'

import { StyledLinkButton } from '../ui/styledLinkButton'

const HEADER_ANIMATION_HEIGHT = 220
const HEADER_ANIMATION_HEIGHT_HERO = 550

const links: { href: string; label: string; prefetch?: boolean }[] = [
  {
    href: '/doctors',
    label: 'Лікарі'
  },
  {
    href: '/blog',
    label: 'Блог'
  },
  {
    href: '/contacts',
    label: 'Контакти'
  },
  {
    href: '/faq',
    label: 'ЧАПи'
  }
]

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  const path = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > (path === '/' ? HEADER_ANIMATION_HEIGHT_HERO : HEADER_ANIMATION_HEIGHT))
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAuth = true

  return (
    <header>
      <div
        className={cn(
          'fixed top-0 left-0 w-full z-[100] bg-hero bg-center bg-no-repeat bg-cover transition-all ease-in-out duration-300 lg:bg-none lg:backdrop-blur',
          scrolled && "lg:!bg-[url('/images/header_bg.jpg')] bg-center bg-no-repeat bg-cover"
        )}>
        <div className='flex justify-between py-9 px-4 w-full lg:max-w-[1200px] lg:mx-auto'>
          <div className='flex items-center justify-center'>
            <Link href='/'>
              <Image src='/logo.png' alt='beClinic' width={182} height={32} />
            </Link>
          </div>

          <div className='hidden lg:block'>
            <ul className='flex items-center gap-5'>
              {links.map(({ label, href }) => (
                <li className='p-2.5 flex' key={label}>
                  <StyledLink
                    href={href}
                    className={cn(
                      'text-white text-lg hover:text-[#89E3FF] transition-all duration-300 ease-in-out',
                      path === href && 'text-[#89E3FF]'
                    )}>
                    {label}
                  </StyledLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center gap-4 ml-4'>
            <StyledLinkButton variant='outline' href='#'>
              Увійти
            </StyledLinkButton>

            <div className='lg:hidden'>
              <HeaderBurger />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
