import { Trash2 } from 'lucide-react'

import { H6, P } from '@/components/ui/typography'
import { Medicine } from '@/shared/types'

interface MedicineCardProps {
  medicine: Medicine
  onDelete?: (medicineName: string) => void
}

export const MedicineCard = ({ medicine, onDelete }: MedicineCardProps) => {
  return (
    <div className='relative grid bg-white shadow-custom-right p-4 gap-4 grid-cols-[100px_75px_1fr] sm:grid-cols-[100px_100px_1fr]'>
      <H6>{medicine.medicineName}</H6>
      <P>{medicine.dosing}</P>
      <P>{medicine.description}</P>
      {onDelete && (
        <div
          onClick={() => onDelete(medicine.medicineName)}
          className='absolute top-0 right-5 w-5 h-5 bg-red flex items-center justify-center shadow-md cursor-pointer'>
          <Trash2 size={14} className='fill-white' />
        </div>
      )}
    </div>
  )
}
