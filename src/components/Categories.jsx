import React from 'react';
import {Link} from 'react-router-dom';
import {GiRing, GiDropEarrings, GiPearlNecklace} from 'react-icons/gi';
import {FaCircleNotch} from 'react-icons/fa';

const Categories = () => {
  return (
    <div className='categories'>
      <ul className='categories__list'>
        <li className='categories__item'>
          {' '}
          <Link className='categories__link'>
            {' '}
            Anillos <GiRing />{' '}
            <img
              className='categories__img'
              src='../../src/assets/CategoriesImages/ring2.png'
              alt='Anillos'
            />
          </Link>{' '}
        </li>
        <li className='categories__item'>
          {' '}
          <Link className='categories__link'>
            {' '}
            Aretes <GiDropEarrings />
            <img
              className='categories__img'
              src='../../src/assets/CategoriesImages/earring2.png'
              alt='Anillos'
            />
          </Link>{' '}
        </li>
        <li className='categories__item'>
          {' '}
          <Link className='categories__link'>
            {' '}
            Pulseras <FaCircleNotch />
            <img
              className='categories__img'
              src='../../src/assets/CategoriesImages/bracelet2.png'
              alt='Anillos'
            />
          </Link>{' '}
        </li>
        <li className='categories__item'>
          {' '}
          <Link className='categories__link'>
            {' '}
            Collares <GiPearlNecklace />
            <img
              className='categories__img'
              src='../../src/assets/CategoriesImages/necklace1.png'
              alt='Anillos'
            />
          </Link>{' '}
        </li>
      </ul>
    </div>
  );
};

export default Categories;
