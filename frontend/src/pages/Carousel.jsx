import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 1000, disableOnInteraction: false }} // ✅ Smooth autoplay behavior
      className="w-full h-[600px]"
    >
      <SwiperSlide>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOwydd3xaD22kzSoGaij2rR6Mfd1mkNyWNpw&s"
          alt="Slide 1"
          className="w-full h-full object-cover"
        /> 
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg"
          alt="Slide 2"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSyDSdMThI_bY64XI156wAyg3jTQkmR61xDyFKwv7jmoiIz6W4Wree902lr29IqTgD7g&usqp=CAU"
          alt="Slide 3"
          className="w-full h-full object-cover"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
