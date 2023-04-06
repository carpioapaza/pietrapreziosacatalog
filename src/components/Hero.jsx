import React, {useState, useEffect, useRef} from 'react';
import {GrPrevious, GrNext} from 'react-icons/gr';
import {BsBookmark} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselItemWidth = 280;
  const numItemsToShow = Math.round(items.length / 1.8);

  useEffect(() => {
    const getJewelry = async () => {
      try {
        const {data} = await axios.get(
          'https://backup-backend-pp-production.up.railway.app/api/limited-edition'
        );
        setItems(data.jewelries);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getJewelry();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex >= numItemsToShow - 1 ? 0 : prevIndex + 1
        );
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isPaused, numItemsToShow]);
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? numItemsToShow - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === numItemsToShow - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  console.log(items);

  const renderCarouselItems = () => {
    return items.map((item) => (
      <Link
        className='hero__carousel-link'
        to={`item/${item._id}`}
        key={item._id}
      >
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
          {/* <button className='hero__carousel-save'>
            <BsBookmark />
          </button> */}
        </div>
      </Link>
    ));
  };

  const carouselRef = useRef(null);
  const translateX = -(carouselItemWidth * activeIndex);

  const handleTouchStart = (event) => {
    setIsPaused(true);
    const touch = event.touches[0] || event.changedTouches[0];
    carouselRef.current.touchStartX = touch.pageX;
    carouselRef.current.touchEndX = touch.pageX;
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    const touch = event.touches[0] || event.changedTouches[0];
    carouselRef.current.touchEndX = touch.pageX;
  };

  const handleTouchEnd = () => {
    const deltaX =
      carouselRef.current.touchEndX - carouselRef.current.touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setIsPaused(false);
  };

  if (isLoading) {
    return (
      <div className='hero hero--loading'>
        <Loader />;
      </div>
    );
  }

  return (
    <div className='hero'>
      <h1 className='hero__title ml-padding'>Destacados</h1>
      <div
        className='hero__carousel'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className='hero__carousel-wrapper'
          style={{transform: `translateX(${translateX}px)`}}
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {renderCarouselItems()}
        </div>
        <button
          className='hero__carousel-button hero__carousel-button--prev'
          onClick={handlePrev}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <GrPrevious />
        </button>
        <button
          className='hero__carousel-button hero__carousel-button--next'
          onClick={handleNext}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};
export default Hero;

// import React, {useState, useEffect, useRef} from 'react';
// import {GrPrevious, GrNext} from 'react-icons/gr';
// import {BsBookmark} from 'react-icons/bs';
// import {Link} from 'react-router-dom';
// import axios from 'axios';

// const Hero = () => {
//   const [items, setItems] = useState([]);

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const itemsLength = Math.round(items.length / 2);
//   const carouselItemWidth = 310;
//   const numItemsToShow = itemsLength;

//   useEffect(() => {
//     const getJewelry = async () => {
//       try {
//         const {data} = await axios.get(
//           `https://backup-backend-pp-production.up.railway.app/api/limited-edition`
//         );

//         setItems(data.jewelry);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getJewelry();
//   }, []);

//   if (items.length === 0) {
//     return <div>Cargando</div>;
//   }

//   const handlePrev = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? numItemsToShow - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === numItemsToShow - 1 ? 0 : prevIndex + 1
//     );
//   };
//   const translateX = -(carouselItemWidth * activeIndex);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     if (!isPaused) {
//       const interval = setInterval(() => {
//         setActiveIndex((prevIndex) =>
//           prevIndex === numItemsToShow - 1 ? 0 : prevIndex + 1
//         );
//       }, 1500);
//       return () => clearInterval(interval);
//     }
//   }, [isPaused, numItemsToShow]);

//   const handleMouseEnter = () => {
//     setIsPaused(true);
//   };

//   const handleMouseLeave = () => {
//     setIsPaused(false);
//   };

//   return (
//     <div className='hero'>
//       <h1 className='hero__title ml-padding'>Últimos renders</h1>
//       <div className='hero__carousel'>
//         <div
//           className='hero__carousel-wrapper'
//           style={{transform: `translateX(${translateX}px)`}}
//           ref={carouselRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {items.map((item) => (
//             <Link
//               className='hero__carousel-link'
//               // to={`/editon/${item._id}`}
//               to={`item/${item._id}`}
//               key={item._id}
//             >
//               {item && item.images && item.images[0] && (
//                 <img
//                   className='hero__carousel-img'
//                   src={item.images[0].url}
//                   alt={item.name}
//                 />
//               )}
//               <div className='hero__carousel-content'>
//                 <div className='hero__carousel-text'>
//                   <div className='hero__carousel-caption'>{item.name}</div>
//                 </div>
//                 <button className='hero__carousel-save'>
//                   <BsBookmark />
//                 </button>
//               </div>
//             </Link>
//           ))}
//         </div>
//         <button
//           className='hero__carousel-button hero__carousel-button--prev'
//           onClick={handlePrev}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <GrPrevious />
//         </button>
//         <button
//           className='hero__carousel-button hero__carousel-button--next'
//           onClick={handleNext}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <GrNext />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Hero;
