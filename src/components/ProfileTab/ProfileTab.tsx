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
  }[]
  baseUrl: string
}

const handleDefaultTab = (tab: string | null, tabs: Tab[]): string => {
  return tabs.find((t) => t.id === tab)?.id || tabs[0].id
}

export const ProfileTab = ({ tabs, baseUrl }: ProfileTabProps) => {
  const t = useTranslations('page')
  // TODO: remove
  const params = useParams<{ patientId: string }>()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const router = useRouter()

  const [activeTab, setActiveTab] = useState(handleDefaultTab(tab, tabs))

  const handleChange = useCallback(
    (val: string) => {
      setActiveTab(val)
      router.replace(`/${baseUrl}?tab=${val}`)
    },
    [baseUrl, router]
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
