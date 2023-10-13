import React from 'react';
import {Link} from 'react-router-dom';
import {GiRing, GiDropEarrings, GiPearlNecklace} from 'react-icons/gi';
import {FaCircleNotch} from 'react-icons/fa';

const Categories = () => {
  return (
    <div className='categories'>
      <Link className='categories__link' to='/categories/Anillos'>
        ANILLOS <GiRing />
        <img className='categories__img' src='ring2.jpeg' alt='Anillos' />
      </Link>
      <Link className='categories__link' to='/categories/Aretes'>
        ARETES <GiDropEarrings />
        <img className='categories__img' src='earring2.jpeg' alt='Aretes' />
      </Link>
      <Link className='categories__link' to='/categories/Pulseras'>
        PULSERAS <FaCircleNotch />
        <img className='categories__img' src='bracelet2.jpeg' alt='Pulseras' />
      </Link>
      <Link className='categories__link' to='/categories/Collares'>
        COLLARES <GiPearlNecklace />
        <img className='categories__img' src='necklace1.jpeg' alt='Collares' />
      </Link>
    </div>
  );
};

export default Categories;
