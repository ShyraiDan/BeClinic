import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface StyledTabProps {
  tabs: {
    id: string
    label: string
    content: ReactNode
  }[]
  defaultValue?: string
}

export const StyledTab = ({ defaultValue, tabs }: StyledTabProps) => {
  const t = useTranslations('page')

  return (
    <>
      <Tabs defaultValue={defaultValue}>
        <TabsList className='border-b border-solid border-[#ccc]'>
          {tabs.map((tab) => (
            <TabsTrigger key={`${tab.id}-trigger`} value={tab.id}>
              {t(tab.label)}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={`${tab.id}-content`} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
