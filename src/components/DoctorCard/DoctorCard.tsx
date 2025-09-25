import { Smartphone, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { P, H6 } from '@/components/ui/typography'
import { BUCKET_URL } from '@/shared/constants'
import { Doctor } from '@/shared/types'

interface DoctorCardProps {
  doctor: Doctor
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const t = useTranslations('page')

  return (
    <div className='transition-all duration-300 ease-in-out hover:inset-shadow-doctor-card'>
      {doctor.avatarUrl ? (
        <Image
          src={`${BUCKET_URL}/custom/avatars/${doctor.avatarUrl}`}
          alt='doctor'
          unoptimized
          width={270}
          height={270}
          className='w-full max-h-[350px] object-cover'
        />
      ) : (
        <Image
          src='/no-image.jpg'
          alt='doctor'
          width={270}
          height={270}
          className='w-full max-h-[350px] object-cover'
        />
      )}

      <div className='pt-5 px-4 mb-3.5'>
        <P className='text-[#B5B9BB] text-[10px] uppercase tracking-[1px]'>
          {t(`profile.doctor.specialties.${doctor.position}`)}
        </P>

        <H6 className='font-normal text-[16px]'>
          <Link href={`/doctors/${doctor._id}`} className='transition-all duration-300 ease-in-out hover:text-blue-100'>
            {doctor.doctorName}
          </Link>
        </H6>
      </div>
      <div className='ml-4 pb-[30px]'>
        <ul>
          <li className='flex items-center'>
            <Link
              href={`tel:${doctor.phone}`}
              className='flex items-center text-[#b5b9bb] font-primary font-light text-sm transition-all duration-300 ease-in-out hover:text-[#0674d1] hover:[&_svg]:text-[#0674d1]'>
              <Smartphone className='mr-2.5' size={14} />
              {doctor.phone}
            </Link>
          </li>
          <li className='flex items-center'>
            <Link
              href={`mailto:${doctor.email}`}
              className='flex items-center text-[#b5b9bb] font-primary font-light text-sm transition-all duration-300 ease-in-out hover:text-[#0674d1] hover:[&_svg]:text-[#0674d1]'>
              <Mail className='mr-2.5' size={14} />
              {doctor.email}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default DoctorCard
