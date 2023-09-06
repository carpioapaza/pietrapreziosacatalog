import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {supabase} from '../backend/client.js';
import axios from 'axios';
import ImageEditor from '../components/ImageEditor';
import Loader from '../components/Loader';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateJewelry = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const [measures, setMeasures] = useState('');
  const [color, setColor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    getUser();
  }, [id]);

  useEffect(() => {
    const getJewelry = async () => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
        const jewelry = data.data;
        const {
          title,
          description,
          category,
          measures,
          color,
          tags,
          isHighlighted,
        } = jewelry;
        setTitle(title);
        setDescription(description);
        setCategory(category);
        setMeasures(measures);
        setColor(color);
        setTags(tags.toString());
        setIsHighlighted(isHighlighted);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getJewelry();
  }, [id]);

  useEffect(() => {
    document.title = `Editar | ${isLoading ? '···' : title}`;
  }, [isLoading, title]);

  // submit the form
  const submitForm = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const {data} = await axios.put(
        // `http://localhost:8082/api/jewelry/${id}`,
        `${import.meta.env.VITE_API_URL}/${id}`,

        {
          title,
          description,
          category,
          measures,
          color,
          tags,
          isHighlighted,
        }
      );
      if (data.success === true) {
        toast('Item actualizado correctamente.', {
          position: toast.POSITION.BOTTOM_CENTER,
          className: 'message-s',
        });
      }
    } catch (error) {
      console.log(error);
      const {message} = error.response.data;
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'message-e',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return (
      <div className='update-jewelry'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='update-jewelry'>
      <div className='update-jewelry__content'>
        <p className='update-jewelry__title'>Actualizar Item</p>
        <form
          className='update-jewelry__form'
          onSubmit={submitForm}
          encType='multipart/form-data'
        >
          <div className='update-jewelry__wrapper-input'>
            <label htmlFor='fortitle'>Titulo</label>
            <input
              className='update-jewelry__input'
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              id='fortitle'
              name='title'
              value={title}
              required
            />
          </div>
          <div className='update-jewelry__wrapper-input'>
            <label htmlFor='formdescription'>Descripción</label>

            <textarea
              className='update-jewelry__input'
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              id='formdescription'
              name='description'
              value={description}
              required
            />
          </div>

          <div className='update-jewelry__wrapper-input'>
            <label htmlFor='formcategory'>Categoría</label>
            <select
              className='update-jewelry__input update-jewelry__input--select'
              onChange={(e) => setCategory(e.target.value)}
              type='text'
              id='formcategory'
              name='category'
              value={category}
              required
            >
              <option value='Collares'>Collares</option>
              <option value='Pulseras'>Pulseras</option>
              <option value='Aretes'>Aretes</option>
              <option value='Anillos'>Anillos</option>
            </select>
          </div>
          <div className='update-jewelry__wrapper-input'>
            <label htmlFor='formmeasures'>Medidas</label>

            <input
              className='update-jewelry__input'
              onChange={(e) => setMeasures(e.target.value)}
              type='text'
              id='formmeasures'
              name='measures'
              value={measures}
              required
            />
          </div>
          <div className='update-jewelry__wrapper-input'>
            <label htmlFor='formcolor'>Color</label>

            <input
              className='update-jewelry__input'
              onChange={(e) => setColor(e.target.value)}
              type='text'
              id='formcolor'
              name='color'
              value={color}
              required
            />
          </div>

          <div className='update-jewelry__wrapper-input'>
            <label htmlFor='fortags'>Etiquetas</label>

            <input
              className='update-jewelry__input'
              onChange={(e) => setTags(e.target.value)}
              type='text'
              id='fortag'
              name='tags'
              value={tags}
              required
            />
          </div>
          <div className='create-item__wrapper-input'>
            <label htmlFor='forisHighlighted'>Destacar</label>
            <input
              className='create-item__input'
              onChange={(e) => setIsHighlighted(e.target.checked)}
              type='checkbox'
              checked={isHighlighted}
              id='forisHighlighted'
              name='isHighlighted'
            />
          </div>

          <button
            className='update-jewelry__btn'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader w='1.5' justify='center' /> : 'Actualizar'}
          </button>
        </form>
        <ImageEditor />
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateJewelry;