import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

import {Navigation, Pagination, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Hero = () => {
console.log(import.meta.env.VITE_API_URL);

const [isLoading, setIsLoading] = useState(true);
const [items, setItems] = useState([]);

useEffect(() => {
  const getJewelry = async () => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/highlighted`
      );

      setItems(data.jewelries);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  getJewelry();
}, []);

  if (isLoading) {
    return (
      <div className='hero hero--loading'>
        <Loader />;
      </div>
    );
  }
  const slidesPerView = Math.min(items.length, 6); // Mostrará un máximo de 6 elementos por vista

  return (
    <div className='hero'>
      <h1 className='hero__title pp-padding'>Destacados</h1>
      <Swiper
        effect='flip'
        speed={500}
        className='hero__carousel'
        spaceBetween={15}
        slidesPerView={slidesPerView}
        loop={true}
        loopFillGroupWithBlank={true} // Agrega esta línea
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{delay: 500, disableOnInteraction: false}}
        wrapperTag='div'
        wrapperClass='swiper-wrapper hero__carousel-wrapper'
      >
        {items.map((item) => (
          <SwiperSlide className='hero__carousel-card' key={item._id}>
            <Link to={`item/${item._id}`} className='hero__carousel-link'>
              {item && item.images && item.images[0] && (
                <img
                  className='hero__carousel-img'
                  src={item.images[0].url}
                  alt={item.title}
                />
              )}
              <div className='hero__carousel-content'>
                <div className='hero__carousel-text'>
                  <div className='hero__carousel-caption'>{item.title}</div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
