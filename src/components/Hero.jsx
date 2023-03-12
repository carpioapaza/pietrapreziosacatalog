import React, {useState} from 'react';
import {GrPrevious, GrNext} from 'react-icons/gr';

const Hero = () => {
  const items = [
    {
      id: 1,
      name: 'Anillo de la Realeza',
      date: '12 de mayo de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=1',
    },
    {
      id: 2,
      name: 'Collar de la Diosa',
      date: '26 de agosto de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=2',
    },
    {
      id: 3,
      name: 'Pendientes de la Luna',
      date: '7 de febrero de 2023',
      image: 'https://picsum.photos/200/300?grayscale?random=3',
    },
    {
      id: 4,
      name: 'Broche del Océano',
      date: '1 de julio de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=4',
    },
    {
      id: 5,
      name: 'Anillo de la Serpiente',
      date: '14 de octubre de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=5',
    },
    {
      id: 6,
      name: 'Collar de la Libertad',
      date: '18 de septiembre de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=6',
    },
    {
      id: 7,
      name: 'Pendientes de la Naturaleza',
      date: '3 de diciembre de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=7',
    },
    {
      id: 8,
      name: 'Broche del Dragón',
      date: '22 de abril de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=8',
    },
    {
      id: 9,
      name: 'Anillo del Fuego',
      date: '16 de agosto de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=9',
    },
    {
      id: 10,
      name: 'Collar de la Magia',
      date: '9 de noviembre de 2023',
      image: 'https://picsum.photos/200/300?grayscale?random=10',
    },
    {
      id: 11,
      name: 'Anillo de la Realeza',
      date: '12 de mayo de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=1',
    },
    {
      id: 12,
      name: 'Collar de la Diosa',
      date: '26 de agosto de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=2',
    },
    {
      id: 13,
      name: 'Pendientes de la Luna',
      date: '7 de febrero de 2023',
      image: 'https://picsum.photos/200/300?grayscale?random=3',
    },
    {
      id: 14,
      name: 'Broche del Océano',
      date: '1 de julio de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=4',
    },
    {
      id: 15,
      name: 'Anillo de la Serpiente',
      date: '14 de octubre de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=5',
    },
    {
      id: 16,
      name: 'Collar de la Libertad',
      date: '18 de septiembre de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=6',
    },
    {
      id: 17,
      name: 'Pendientes de la Naturaleza',
      date: '3 de diciembre de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=7',
    },
    {
      id: 18,
      name: 'Broche del Dragón',
      date: '22 de abril de 2021',
      image: 'https://picsum.photos/200/300?grayscale?random=8',
    },
    {
      id: 19,
      name: 'Anillo del Fuego',
      date: '16 de agosto de 2022',
      image: 'https://picsum.photos/200/300?grayscale?random=9',
    },
    {
      id: 20,
      name: 'Collar de la Magia',
      date: '9 de noviembre de 2023',
      image: 'https://picsum.photos/200/300?grayscale?random=10',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  console.log(currentIndex);

  return (
    <div className='hero'>
      <h1 className='hero__title'>Últimos renders</h1>
      <div className='hero__carousel'>
        <div
          className='hero__carousel-wrapper'
          style={{
            transform: `translateX(-${
              currentIndex * (100 / 12)
              // currentIndex * ((items.length * 10) / 10)
            }%)`,
          }}
        >
          {items.map((item) => (
            <div className='hero__carousel-item' key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className='hero__carousel-text'>
                <p className='hero__carousel-caption'>{item.name}</p>
                <time className='hero__carousel-date' dateTime={item.date}>
                  {item.date}
                </time>
              </div>
            </div>
          ))}
        </div>
        <button
          className='hero__carousel-button hero__carousel-button--prev'
          onClick={handlePrev}
        >
          <GrPrevious />
        </button>
        <button
          className='hero__carousel-button hero__carousel-button--next'
          onClick={handleNext}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};
export default Hero;
