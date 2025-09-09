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

const StyledTab = ({ defaultValue, tabs }: StyledTabProps) => {
  return (
    <div className='flex w-full max-w-sm flex-col gap-6'>
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={`${tab.id}-trigger`} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={`${tab.id}-content`} value={tab.id}>
            {tab.label}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default StyledTab
