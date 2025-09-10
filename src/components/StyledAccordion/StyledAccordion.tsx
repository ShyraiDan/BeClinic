import { ReactNode } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface StyledAccordionProps {
  items: { id: string; trigger: ReactNode; content: ReactNode }[]
}

export const StyledAccordion = ({ items }: StyledAccordionProps) => {
  return (
    <Accordion type='single' collapsible className='w-full' defaultValue={items[0]?.id}>
      {items.map((item) => {
        return (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
