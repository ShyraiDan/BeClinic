'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ReactNode, useCallback, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from '@/i18n/navigation'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface ProfileTabProps {
  tabs: {
    id: string
    label: string
    content: ReactNode
    // url: string
    url: { pathname: string; query: Record<string, string | number> }
  }[]
}

const handleDefaultTab = (tab: string | null, tabs: Tab[]): string => {
  return tabs.find((t) => t.id === tab)?.id || tabs[0].id
}

export const ProfileTab = ({ tabs }: ProfileTabProps) => {
  const t = useTranslations('page')
  // TODO: remove
  const params = useParams<{ patientId: string }>()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const router = useRouter()

  const [activeTab, setActiveTab] = useState(handleDefaultTab(tab, tabs))

  const handleChange = useCallback(
    (val: string) => {
      const activeTab = tabs.find((t) => t.id === val)
      if (!activeTab) {
        return
      }

      setActiveTab(val)
      router.replace(activeTab.url)
    },
    [router, tabs]
  )

  return (
    <>
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleChange}>
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
