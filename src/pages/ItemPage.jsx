import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {GrFormPrevious, GrFormNext} from 'react-icons/gr';
import {BsWhatsapp} from 'react-icons/bs';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Loader from '../components/Loader';
import SimilarsItems from '../components/SimilarsItems';
import {BiTrash, BiEdit} from 'react-icons/bi';
import {supabase} from '../backend/client';
const ItemPage = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [id]);

  useEffect(() => {
    document.title = `Detalles | ${isLoading ? '···' : item.title}`;
  }, [isLoading, item.title]);

  useEffect(() => {
    const getJewelrys = async () => {
      // const {data} = await axios.get(`http://localhost:8082/api/jewelry/${id}`);
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);

      setItem(data.data);
      setIsLoading(false);
    };
    getJewelrys();
  }, [id]);

  // Admin

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar?')) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      navigate('/');

      // await axios.delete(`http://localhost:8082/api/jewelry/${id}`);
    }
  };

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

  const {title, description, category, measures, formatFile, images} = item;

  if (isLoading) {
    return (
      <div
        className={`item-page pp-padding ${
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
            {images.length <= 1 ? null : (
              <>
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
              </>
            )}
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
        {user ? (
          <div className='item__admin'>
            <div className='item__admin-delete'>
              <button onClick={() => handleDelete(id)}>
                <BiTrash />
              </button>
            </div>
            <div className='item__admin-update'>
              <Link to={`/items/update/${item._id}`}>
                <BiEdit />
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      <SimilarsItems />
      <a
        className='item-page__wsp'
        target='_blank'
        href={`https://api.whatsapp.com/send?phone=+51932411238&text=Hola,%20me%20gustaría%20saber%20más%0ASitio%20web:%20https://www.instagram.com%0ATítulo:%20${title}`}
      >
        <BsWhatsapp />
      </a>
    </div>
  );
};

export default ItemPage;


