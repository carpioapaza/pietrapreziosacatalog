import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';
import {FaTimesCircle} from 'react-icons/fa';

const CreateJewelry = () => {
  useEffect(() => {
    document.title = `Nuevo item`;
  }, []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Anillos');
  const [measures, setMeasures] = useState('');
  const [color, setColor] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

  const [emptyImages, setEmptyImages] = useState(false);
  const [isLimitedEdition, setIsLimitedEdition] = useState(false);

  // handle images
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
        files.length === 0 ? setEmptyImages(true) : setEmptyImages(false);
      };
    });
  };
  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // submit the form
  const resetForm = () => {
    setTitle('');
    setImages([]);
    setDescription('');
    setCategory('Anillos');
    setMeasures('');
    setColor('');
    setTags('');
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setEmptyImages(true);
      setTimeout(() => {
        setEmptyImages(false);
      }, 2000);
      return;
    }
    setIsUploading(true);
    //backup-backend-pp-production.up.railway.app
    try {
      const {data} = await axios.post(
        'https://backup-backend-pp-production.up.railway.app/api/jewelry/create',

        {
          title,
          description,
          category,
          measures,
          color,
          tags,
          images,
          isLimitedEdition,
        }
      );
      if (data.success === true) {
        resetForm();
      }
      toast('Item creado correctamente.', {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'message-s',
      });
    } catch (error) {
      const {message} = error.response.data;
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'message-e',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='create-item'>
      <div className='create-item__content'>
        <h2 className='create-item__title'>Crear Item</h2>
        <form
          className='create-item__form'
          onSubmit={submitForm}
          encType='multipart/form-data'
        >
          <div className='create-item__wrapper-input'>
            <label htmlFor='forTitle'>Titulo</label>
            <input
              className='create-item__input'
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              value={title}
              id='forTitle'
              placeholder='Collar de diosa'
              name='title'
              required
            />
          </div>

          <div className='create-item__wrapper-input'>
            <label htmlFor='formdescription'>Descripción</label>
            <textarea
              className='create-item__input'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id='formdescription'
              placeholder='Bañado en diamante'
              name='description'
              required
            />
          </div>

          <div className='create-item__wrapper-input'>
            <label htmlFor='formcategory'>Categoria</label>
            <select
              className='create-item__input create-item__input--select'
              onChange={(e) => setCategory(e.target.value)}
              type='text'
              id='formcategory'
              placeholder='Anillos'
              name='category'
              required
            >
              <option value='Anillos'>Anillos</option>
              <option value='Aretes'>Aretes</option>
              <option value='Pulseras'>Pulseras</option>
              <option value='Collares'>Collares</option>
            </select>
          </div>

          <div className='create-item__wrapper-input'>
            <label htmlFor='formmeasures'>Medidas</label>

            <input
              className='create-item__input'
              onChange={(e) => setMeasures(e.target.value)}
              type='text'
              value={measures}
              id='formmeasures'
              placeholder='25x23'
              name='measures'
              required
            />
          </div>
          <div className='create-item__wrapper-input'>
            <label htmlFor='forcolor'>Color</label>

            <input
              className='create-item__input'
              onChange={(e) => setColor(e.target.value)}
              type='text'
              value={color}
              id='forcolor'
              placeholder='Amarillo'
              name='color'
              required
            />
          </div>

          <div className='create-item__wrapper-input'>
            <label htmlFor='fortags'>Etiquetas</label>
            <input
              className='create-item__input'
              onChange={(e) => setTags(e.target.value)}
              type='text'
              value={tags}
              id='fortags'
              placeholder='anillos, dorado'
              name='tags'
              required
            />
          </div>
          <div className='create-item__wrapper-input'>
            <label htmlFor='formisLimitedEdition'>Destacado</label>
            <input
              className='create-item__input'
              onChange={(e) => setIsLimitedEdition(e.target.checked)}
              type='checkbox'
              checked={isLimitedEdition}
              id='formisLimitedEdition'
              name='isLimitedEdition'
            />
          </div>

          <div className='create-item__wrapper-input'>
            <label
              className={`${
                emptyImages
                  ? 'create-item__label-add-image create-item__label-add-image--error'
                  : 'create-item__label-add-image'
              }`}
              htmlFor='formupload'
            >
              <input
                className='create-item__input'
                onChange={handleImage}
                type='file'
                id='formupload'
                name='image'
                multiple
              />
            </label>
          </div>

          <div className='create-item__cards'>
            {images.map((image, index) => (
              <div className='create-item__card' key={index}>
                <button
                  type='button'
                  className='create-item__destroy'
                  onClick={() => handleDeleteImage(index)}
                >
                  <FaTimesCircle />
                </button>
                <label htmlFor='forimages'></label>
                <img
                  className='create-item__img'
                  src={image}
                  alt={`Image ${index}`}
                  required
                />
              </div>
            ))}
          </div>

          <button
            className='create-item__btn'
            type='submit'
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                Subiendo <Loader w='1.2' />
              </>
            ) : (
              'Crear nuevo item'
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateJewelry;
