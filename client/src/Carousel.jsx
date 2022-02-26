import { useState, useEffect, useRef } from 'react';

// import Swiper core and required modules
import { Navigation, Pagination, A11y, Scrollbar, Virtual, Autoplay } from 'swiper';

// expected required module
// virtual useSwiper

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/virtual';

const ImageSlider = ({ imageData }) => {
  const [DataArray, setDataArray] = useState([])

  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const paginationRef = useRef(null)

  useEffect(() => {
    for (let i = 0; i < imageData.length; i++) {
      import(`./assets/${imageData[i]}`)
        .then(module => {
          setDataArray(arr => {
            return [
              ...arr,
              {
                id: i,
                path: module.default
              }
            ]
          })
        })
    }
  }, [imageData])
  
  // console.log(DataArray)

  return (
    <div>
      <h1>slider</h1>
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          Pagination,
          A11y,
          Virtual,
          Autoplay
        ]}
        spaceBetween={50}
        slidesPerView={1}
        virtual
        loop
        autoplay={true}
        // pagination={{ clickable: true }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      > 
      {
        DataArray.map(data => (
          <SwiperSlide key={data.id}>
            <img
              alt=''
              src={data.path}
              style={{
                width: '300px',
                height:'300px',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </SwiperSlide>
        ))
      }
      <div ref={prevRef}>prev</div>
      <div ref={nextRef}>next</div>
      </Swiper>
      <hr />
      <h2>slider 2</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
    </div>
  )
}

export default ImageSlider
