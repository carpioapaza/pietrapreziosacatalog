import React, {useEffect} from 'react';

import {BsBookmarkHeartFill} from 'react-icons/bs';
import {Link, useLocation} from 'react-router-dom';

const Card = ({items}) => {
  const {pathname} = useLocation();
  useEffect(() => {
    items;
  }, [pathname]);

  return (
    <ul className='card'>
      {items.map((item) => (
        <li key={item._id} className='card__item'>
          <Link to={`/item/${item._id}`} className='card__link'>
            <img
              className='card__img'
              src={item.images[0]?.url}
              alt={item.title}
              loading='lazy'
            />

            <div className='card__texts'>
              <div className='card__title'>{item.title}</div>
            </div>
            {/* <button className='card__save'>
              <BsBookmarkHeartFill />
            </button> */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Card;
