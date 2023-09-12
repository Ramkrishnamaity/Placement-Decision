import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { testimonials } from '../../Data';
import Card from './Card';

const Testimonials = () => {
  return (
    <div className='py-10 w-full h-max flex md:flex-row flex-col md:justify-center items-center gap-5 md:gap-0 bg-[#f4f4f4]'>
      <div className='md:w-[45%] w-[95%] mx-auto ml-5'>
      <h2 className='pb-2 px-5 border-b-2 border-[aqua] text-2xl w-max'>Testimonials</h2>
      <p className='mt-5'>
        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
      </p>
      </div>
      <Swiper
      className='md:w-[52%] w-[95%] mx-auto bg-white rounded-md'
      modules={[Navigation,Autoplay, Pagination, Scrollbar, A11y]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000}}
      slidesPerView={1}
      loop={true}
      >
      {
        testimonials.map((testi, i)=>(
          <SwiperSlide  key={i} ><Card data={testi}/></SwiperSlide>
        ))
      } 
      
      </Swiper>
    </div>
  )
}

export default Testimonials