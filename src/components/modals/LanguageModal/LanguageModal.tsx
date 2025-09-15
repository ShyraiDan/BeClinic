'use client'

import { ChevronDown, Check } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useEffect, useRef, useState, useTransition } from 'react'

import { usePathname, useRouter } from '@/i18n/navigation'
import { cn } from '@/utils/utils'

interface LanguageOptionProps {
  currentLocale: string
  langOption: {
    label: string
    locale: string
  }
  allowedAction: () => void
}

const langOptions = [
  {
    label: 'en',
    locale: 'en'
  },
  {
    label: 'uk',
    locale: 'uk'
  }
]

const LanguageOption = ({ currentLocale, langOption, allowedAction }: LanguageOptionProps) => {
  const isCurrentLocale = currentLocale === langOption.locale

  return (
    <li
      className={cn(
        'cursor-pointer capitalize flex items-center gap-2 transition-all ease-in-out duration-300 hover:text-blue-100',
        isCurrentLocale && 'cursor-default opacity-50 hover:text-black'
      )}
      onClick={allowedAction}>
      {langOption.label}
      {isCurrentLocale && <Check />}
    </li>
  )
}

const LanguageModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const [isOpen, setOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const changeLang = (lang: string) => {
    if (lang === locale) return

    startTransition(() => {
      const { locale: _ignored, ...rest } = (params as Record<string, string>) || {}
      const query = Object.fromEntries(searchParams.entries())
      router.replace(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        { pathname, params: rest, query },
        { locale: lang, scroll: false }
      )
    })
    setOpen(false)
  }

  return (
    <>
      <div className='relative w-12'>
        <div
          ref={buttonRef}
          className='flex items-center justify-between capitalize gap-2 font-bold cursor-pointer text-white'
          onClick={() => setOpen(!isOpen)}>
          {locale}
          <ChevronDown className={cn('ml-1', isOpen && 'rotate-180')} />
        </div>
        {isOpen && !isPending && (
          <ul
            ref={menuRef}
            className='rounded-lg bg-white shadow-[0_.5rem_1rem_rgba(0,0,0,.15)] bg-white-100 absolute top-[30px] left-[-5px] p-2 w-15 '>
            {langOptions.map((item) => {
              return (
                <LanguageOption
                  key={item.locale}
                  currentLocale={locale}
                  langOption={item}
                  allowedAction={() => changeLang(item.locale)}
                />
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default LanguageModal
