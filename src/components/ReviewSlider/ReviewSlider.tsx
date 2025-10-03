'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { P } from '@/components/ui/typography'
import { Review, SupportedLocales } from '@/shared/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ReviewSliderProps {
  reviews: Review[]
}

export const ReviewSlider = ({ reviews }: ReviewSliderProps) => {
  const locale = useLocale()

  return (
    <>
      <Swiper
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (_, className) => {
            return `<span class="${className} review-slider-bullet"></span>`
          }
        }}
        centeredSlides
        loop
        spaceBetween={20}
        modules={[Navigation, Pagination]}>
        {reviews.map((item) => {
          return (
            <SwiperSlide key={item._id}>
              <div className='bg-white inset-shadow-profile p-4 mb-12 h-[260px] flex flex-col justify-between'>
                <P className='mb-5 text-black-200 italic text-[20px] line-clamp-3'>
                  {item.review[locale as SupportedLocales]}
                </P>
                <div className='flex'>
                  <Image
                    src={item.userPhoto}
                    alt='user'
                    width={87}
                    height={87}
                    className='w-[87px] h-[87px] rounded-full mr-4'
                  />
                  <div className='flex flex-col justify-center'>
                    <P className='font-bold text-black-200'>{item.userName}</P>
                    <P className='text-black-200 text-sm font-light'>{item.userPosition}</P>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className='mt-[-20px] z-[10] relative'>
        <div className='custom-pagination flex gap-2 justify-center h-[20px]' />
      </div>
    </>
  )
}
