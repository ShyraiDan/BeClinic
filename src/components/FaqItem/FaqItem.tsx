import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Separator } from '@/components/ui/separator'
import { H2, P } from '@/components/ui/typography'

interface FaqItem {
  question: string
  answer?: string
  list?: string[]
  listTitle?: string
}

interface FaqItemProps {
  item: FaqItem
}

export const FaqItem = ({ item }: FaqItemProps) => {
  const t = useTranslations('page')

  return (
    <>
      <Separator />
      <div className='py-2.5'>
        <H2 className='text-[24px] mb-2.5'>{t(item.question)}</H2>

        {item.answer && (
          <P className='mt-3'>
            <span className='text-black-200 font-primary text-[24px] mr-[5px] font-bold'>В:</span>
            {t(item.answer)}
          </P>
        )}

        {item.listTitle && <P className='my-5'>{t(item.listTitle)}</P>}
        {item.list && (
          <ul className='list-inside list-decimal'>
            {item.list.map((item, i) => {
              return (
                <li className='flex italic' key={i}>
                  <Check className='mr-2.5 mt-2 text-blue-600' />
                  <span className='text-secondary text-lg font-primary'>{t(item)}</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
