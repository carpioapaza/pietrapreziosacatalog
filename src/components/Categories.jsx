import React from 'react';
import {Link} from 'react-router-dom';
import {GiRing, GiDropEarrings, GiPearlNecklace} from 'react-icons/gi';
import {FaCircleNotch} from 'react-icons/fa';

const Categories = () => {
  return (
    <div className='categories'>
      <Link className='categories__link' to='/categories/Anillos'>
        Anillos <GiRing />
        <img className='categories__img' src='ring2.webp' alt='Anillos' />
      </Link>
      <Link className='categories__link' to='/categories/Aretes'>
        Aretes <GiDropEarrings />
        <img className='categories__img' src='earring2.webp' alt='Aretes' />
      </Link>
      <Link className='categories__link' to='/categories/Pulseras'>
        Pulseras <FaCircleNotch />
        <img className='categories__img' src='bracelet2.webp' alt='Pulseras' />
      </Link>
      <Link className='categories__link' to='/categories/Collares'>
        Collares <GiPearlNecklace />
        <img className='categories__img' src='necklace1.webp' alt='Collares' />
      </Link>
    </div>
  );
};

export default Categories;
