'use client'

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { StyledLinkButton } from '@/components/ui/styledLinkButton'
import { H2, H6 } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slidesData = [
  {
    bg: "bg-[url('/main-slider-img-1.jpg')]"
  },
  {
    bg: "bg-[url('/main-slider-img-2.jpg')]"
  },
  {
    bg: "bg-[url('/main-slider-img-3.jpg')]"
  }
]

interface SlideProps {
  background: string
}

const Slide = ({ background }: SlideProps) => {
  return (
    <SwiperSlide>
      <div className={cn(background, 'bg-cover bg-no-repeat bg-center w-full h-[675px] xl:h-[800px]')}>
        <div className='flex items-start flex-col justify-center h-full px-4 max-w-[1200px] mx-auto'>
          <H2 className='text-white sm:text-[50px] md:text-[60px] lg:text-[68px]'>Забезпечуємо здоров&apos;я</H2>
          <H6 className='text-white font-normal sm:text-[32px] md:text-[40px] lg:text-[44px]'>для всієї сім&apos;ї</H6>
          <div className='flex gap-4 mt-3 sm:mt-6 lg:mt-9'>
            <StyledLinkButton href='/doctors' className='bg-white text-blue-100'>
              Лікарі
            </StyledLinkButton>
            <StyledLinkButton variant='outline-white' className='border-white text-white' href='/contacts'>
              Контакти
            </StyledLinkButton>
          </div>
        </div>
      </div>
    </SwiperSlide>
  )
}

export const HeroSlider = () => {
  return (
    <div className='relative'>
      <Swiper
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (_, className) => {
            return `<span class="${className} hero-slider-bullet"/>`
          }
        }}
        effect='fade'
        centeredSlides
        autoplay={{
          delay: 15000,
          disableOnInteraction: true
        }}
        loop
        modules={[Navigation, Pagination, Autoplay, EffectFade]}>
        {slidesData.map((item) => (
          <SwiperSlide key={item.bg}>
            <Slide background={item.bg} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='mt-[-100px] z-[10] relative mb-[85px]'>
        <div className='custom-pagination flex gap-2 justify-center h-[20px]' />
      </div>
    </div>
  )
}
