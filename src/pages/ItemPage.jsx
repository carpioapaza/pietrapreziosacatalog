import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {GrFormPrevious, GrFormNext} from 'react-icons/gr';
import {Link, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import SimilarsItems from '../components/SimilarsItems';

const ItemPage = () => {
  const params = useParams();
  const id = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getJewelrys = async () => {
      const {data} = await axios.get(
        `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}`
      );

      setItem(data.data);
      setIsLoading(false);
    };
    getJewelrys();
  }, []);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNextClick = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevClick = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (item.length == 0) {
    return <div>Carga</div>;
  }

  const {_id, title, description, category, measures, formatFile, images} =
    item;

  if (isLoading) {
    return (
      <div
        className={`item-page ml-padding ${
          isLoading ? 'item-page--loading' : ''
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className='item-page'>
      <div className='item'>
        <div className='item__gallery'>
          <div className='item__gallery-main'>
            <img
              src={images[selectedImageIndex]?.url}
              alt={images[selectedImageIndex]}
              className='item__gallery-image'
            />
            <button
              className='item__gallery-button item__gallery-button--prev'
              onClick={handlePrevClick}
            >
              <GrFormPrevious />
            </button>
            <button
              className='item__gallery-button item__gallery-button--next'
              onClick={handleNextClick}
            >
              <GrFormNext />
            </button>
          </div>
          <div
            className={`${
              images.length >= 5
                ? 'item__gallery-thumbnails item__gallery-thumbnails--more-5'
                : 'item__gallery-thumbnails'
            }`}
          >
            {images.map((image, index) => (
              <img
                src={image?.url}
                // src={`data:image/jpeg;base64,${image}`}
                className={`item__gallery-thumbnail ${
                  selectedImageIndex === index &&
                  'item__gallery-thumbnail--selected'
                }`}
                onClick={() => handleImageClick(index)}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className='item__info'>
          <h1 className='item__info-title'>{title}</h1>
          {/* <Link to={`/items/update/${_id}`} className='item__info-title'>
            Editar
          </Link> */}
          <h2 className='item__info-category'>{category}</h2>

          <p className='item__info-description'>{description}</p>
          <div className='item__info-details'>
            <table className='item__info-table'>
              <caption className='item__info-caption'>
                Información adicional
              </caption>
              <tbody>
                <tr className='item__info-tr'>
                  <td className='item__info-label'>Medidas:</td>
                  <td className='item__info-value'>{measures}</td>
                </tr>
                <tr className='item__info-tr'>
                  <td className='item__info-label'>Formato de archivo:</td>
                  <td className='item__info-value'>{formatFile}</td>
                </tr>
                <tr className='item__info-tr'>
                  <td className='item__info-label'>Fecha:</td>
                  <td className='item__info-value'>25 de febrero</td>
                </tr>
                <tr className='item__info-tr'>
                  <td className='item__info-label'>Fecha:</td>
                  <td className='item__info-value'>{item.tags.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SimilarsItems />
    </div>
  );
};

export default ItemPage;
