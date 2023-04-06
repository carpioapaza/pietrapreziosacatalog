import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Card from './Card';
import Loader from './Loader';

const SimilarsItems = () => {
  const params = useParams();
  const id = params.id;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSimilars = async () => {
      const result = await axios.get(
        `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/similar`
      );
      setItems(result.data.similarJewelries);
      setIsLoading(false);
    };
    getSimilars();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {items.length < 1 ? undefined : (
        <div className='similars-items ml-padding'>
          <p className='similars-items__title'>Relacionados</p>
          <Card items={items} />
        </div>
      )}
    </>
  );
};

export default SimilarsItems;
