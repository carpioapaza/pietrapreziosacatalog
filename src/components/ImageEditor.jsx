import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FaPlusCircle, FaTimesCircle} from 'react-icons/fa';
import {IoSaveOutline} from 'react-icons/io5';
import {useParams} from 'react-router-dom';
import Loader from './Loader';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageEditor = () => {
  const {id} = useParams();
  const [images, setImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [showNewImages, setShowNewImages] = useState(false);
  const [updatingImages, setUpdatingImages] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [messageErrorUpdate, setMessageErrorUpdate] = useState('');
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          // `http://localhost:8082/api/jewelry/${id}/images`
          `${import.meta.env.VITE_API_URL}/${id}/images`
        );
        setCurrentImages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, [id, images]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((oldArray) => [...oldArray, reader.result]);
      };
    });
    setShowNewImages(true);
  };

  const onDelete = async (imageId) => {
    setDeleting(true);
    setDeletingId(imageId);
    try {
      await axios.delete(
        // `http://localhost:8082/api/jewelry/${id}/images/${imageId}`
        `${import.meta.env.VITE_API_URL}/${id}/images/${imageId}`
      );

      setCurrentImages((prevImages) =>
        prevImages.filter((image) => image._id !== imageId)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setUpdatingImages(true);
    try {
      const {data} = await axios.post(
        // `http://localhost:8082/api/jewelry/${id}/images`,
        `${import.meta.env.VITE_API_URL}/${id}/images`,
        {images}
      );
      if (data.success === true) {
        setImages([]);
        setShowNewImages(false);
        setUpdatingImages(false);

        toast('Imagenes actualizadas correctamente.', {
          position: toast.POSITION.BOTTOM_CENTER,
          className: 'message-s',
        });
      }
    } catch (error) {
      setMessageErrorUpdate(error.response.data.message);
      const {message} = error.response.data;
      toast(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'message-e',
      });
      setUpdatingImages(false);
    } finally {
      setUpdatingImages(false);
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className='image-editor'>
      {/* <p className='image-editor__title'>Actualizar imagenes</p> */}
      <div className='image-editor__add'>
        <form
          className='image-editor__form-add'
          onSubmit={submitForm}
          encType='multipart/form-data'
        >
          {currentImages.length > 4 ? (
            <div className='image-editor--limit-images'>
              No puedes agregar más de 5 imágenes, elimina una.
            </div>
          ) : (
            <label
              className='image-editor__input-add-label'
              htmlFor='formupload'
            >
              <input
                className='image-editor__input-add'
                onChange={handleImage}
                type='file'
                id='formupload'
                name='image'
                multiple
              />
            </label>
          )}
        </form>
        {showNewImages ? (
          <div className='image-editor__cards-add'>
            {images.map((image, index) => (
              <div className='image-editor__card-add' key={index}>
                <button
                  type='button'
                  className='create-item__destroy'
                  onClick={() => handleDeleteImage(index)}
                >
                  <FaTimesCircle />
                </button>
                <img
                  className='image-editor__img--add'
                  src={image}
                  alt={`Image ${index}`}
                />
              </div>
            ))}
            {updatingImages ? (
              <Loader w='3' justify='center' />
            ) : (
              <button className='image-editor__btn-add' onClick={submitForm}>
                <IoSaveOutline />
              </button>
            )}
          </div>
        ) : null}
      </div>

      <div className='image-editor__destroy'>
        {currentImages.map((image, index) => (
          <div key={index} className='image-editor__card-destroy'>
            <img
              className='image-editor__img-destroy'
              src={image.url}
              alt={`Jewelry ${id}`}
            />
            <button
              className='image-editor__btn-destroy'
              onClick={() => onDelete(image._id)}
            >
              {deleting && deletingId === image._id ? (
                <Loader w='1.5' />
              ) : (
                <FaTimesCircle />
              )}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImageEditor;

