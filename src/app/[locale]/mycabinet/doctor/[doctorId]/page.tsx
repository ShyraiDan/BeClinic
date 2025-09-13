'use client'

import { SkeletonAvatar } from '@/components/skeletons/SkeletonAvatar'
import { SkeletonText } from '@/components/skeletons/SkeletonText'
import { Button } from '@/components/ui/button'
import { H2, H6, P } from '@/components/ui/typography'
import { mockedDoctors } from '@/mocks/mockedDoctors'

const DoctorProfile = () => {
  const isLoading = true
  const mockedDoctor = mockedDoctors[0]

  return (
    <div className='shadow-custom-right bg-white py-[30px] px-4'>
      <div className='mt-12 flex flex-col items-center justify-center relative lg:mt-6'>
        {/* {doctorProfile && <EditDoctorModal doctor={doctorProfile} />} */}

        <SkeletonAvatar />
        {/* {isLoading ? (
          <SkeletonAvatar />
        ) : doctorProfile?.image ? (
          <Image
            src={`${BUCKET_URL}/custom/avatars/${doctorProfile.image}`}
            width={80}
            height={80}
            alt='User avatar'
            unoptimized
            className='w-[80px] h-[80px] rounded-full'
          />
        ) : (
          <div className='flex items-center justify-center w-[80px] h-[80px] bg-blue-100 rounded-full'>
             <User size={24} fill='#fff' />
          </div>
        )} */}

        {isLoading ? (
          <SkeletonText className='px-4 mt-2 h-7 w-[180px]' />
        ) : (
          <P className='px-4 line-clamp-2 text-lg font-bold mt-2'>{mockedDoctor?.doctorName}</P>
        )}
        <div className='w-full'>
          <H2 className='text-lg mb-4 mt-6'>Особисті дані</H2>
          <ul className='flex flex-col gap-3 md:grid md:grid-cols-3 lg:grid-cols-1'>
            <li>
              <P className='mb-1 text-xs'>Cпеціалізація</P>
              {isLoading ? (
                <SkeletonText className='h-5 w-[180px] mt-2 mb-1' />
              ) : (
                <H6 className='text-lg'>{mockedDoctor?.position || '-'}</H6>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>E-mail</P>

              {isLoading ? (
                <SkeletonText className='h-5 w-[180px] mt-2 mb-1' />
              ) : (
                <H6 className='text-lg'>{mockedDoctor?.email || '-'}</H6>
              )}
            </li>
            <li>
              <P className='mb-1 text-xs'>Номер телефону</P>

              {isLoading ? (
                <SkeletonText className='h-5 w-[180px] mt-2 mb-1' />
              ) : (
                <H6 className='text-lg'>{mockedDoctor?.phone || '-'}</H6>
              )}
            </li>
          </ul>
        </div>
        <div className='w-full'>
          <Button className='mt-8 bg-red'>Вийти з акаунту</Button>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
