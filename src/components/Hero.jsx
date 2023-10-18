import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// import {Navigation, Pagination, } from 'swiper/modules';


const Hero = () => {

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

console.log(items);

if (isLoading) {
  return (
    <div className='hero hero--loading'>
      <Loader justify='center' />
    </div>
  );
}

return (
  <div className='hero'>
    {items.length > 0 && <h1 className='hero__title pp-padding'>Destacados</h1>}{' '}
    <Swiper
      slidesPerView={3}
      spaceBetween={8}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        300: {
          slidesPerView: 1.5,
        },
        640: {
          slidesPerView: 2.5,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      modules={[Pagination]}
      className='mySwiper hero__carousel'
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

