import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CardSimilar from './CardSimilar';
import Loader from './Loader';

const SimilarsItems = () => {
  const params = useParams();
  const id = params.id;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSimilars = async () => {
      const result = await axios.get(
        // `http://localhost:8082/api/jewelry/${id}/similar`
        `http://localhost:8082/api/jewelry/${id}/similar`
      );
      setItems(result.data.similarJewelries);
      setIsLoading(false);
    };
    getSimilars();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {items.length < 1 ? null : (
        <div className='similars-items pp-padding'>
          <p className='similars-items__title'>Relacionados</p>
          <CardSimilar items={items} />
        </div>
      )}
    </>
  );
};

export default SimilarsItems;
