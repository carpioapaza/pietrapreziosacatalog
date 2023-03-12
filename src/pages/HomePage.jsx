import React from 'react';
import Categories from '../components/Categories';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div className='home ml-padding'>
      <Hero />
      <Categories />
    </div>
  );
};

export default HomePage;
