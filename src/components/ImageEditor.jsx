import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FaPlusCircle, FaTimesCircle} from 'react-icons/fa';
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
          `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images`
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
        `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images/${imageId}`
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
        `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images`,
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
      <p className='image-editor__title'>Actualizar imagenes</p>
      <div className='image-editor__add'>
        <form
          className='image-editor__form-add'
          onSubmit={submitForm}
          encType='multipart/form-data'
        >
          <label className='image-editor__input-add-label' htmlFor='formupload'>
            <input
              className='image-editor__input-add'
              onChange={handleImage}
              type='file'
              id='formupload'
              name='image'
              multiple
            />
          </label>
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
              <Loader w='3' />
            ) : (
              <button className='image-editor__btn-add' onClick={submitForm}>
                <FaPlusCircle />
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

// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import Dropzone from 'react-dropzone';
// import {FaPlusCircle, FaTimesCircle} from 'react-icons/fa';
// import {useParams} from 'react-router-dom';

// const ImageEditor = () => {
//   const {id} = useParams();

//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     // Hacer una petición para obtener las imágenes de la joya y actualizar el estado
//     const fetchImages = async () => {
//       try {
//         const res = await axios.get(
//           `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images`
//         );
//         setImages(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchImages();
//   }, [id]);

//   const onDrop = async (acceptedFiles) => {
//     try {
//       const formData = new FormData();
//       acceptedFiles.forEach((file) => formData.append('images', file));

//       const res = await axios.post(
//         `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const newImages = res.data.map((image) => ({
//         _id: image._id,
//         url: image.url,
//       }));

//       setImages((prevImages) => [...prevImages, ...newImages]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const onDelete = async (imageId) => {
//     // Eliminar la imagen del servidor y actualizar el estado
//     try {
//       await axios.delete(
//         `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images/${imageId}`
//       );
//       setImages((prevImages) =>
//         prevImages.filter((image) => image._id !== imageId)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h3>Edit Images</h3>
//       <div
//         style={{
//           width: '15rem',
//           height: '10rem',
//           border: '2px dotted black',
//         }}
//       >
//         <Dropzone onDrop={onDrop}>
//           {({getRootProps, getInputProps}) => (
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <p>Drag and drop images here, or click to select files</p>
//             </div>
//           )}
//         </Dropzone>
//       </div>
//       <div className='image-grid' style={{display: 'flex', gap: '2rem'}}>
//         {images.map((image, index) => (
//           <div key={index} className='image-card'>
//             <img
//               src={image.url}
//               alt={`Jewelry ${id}`}
//               style={{maxWidth: '6rem'}}
//             />
//             <div className='image-card-overlay'>
//               <button onClick={() => onDelete(image._id)}>
//                 <FaTimesCircle />
//               </button>
//             </div>
//           </div>
//         ))}
//         <div className='image-card add-image'>
//           <div className='image-card-overlay'>
//             <button>
//               <FaPlusCircle />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageEditor;

// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import Dropzone from 'react-dropzone';
// import {FaPlusCircle, FaTimesCircle} from 'react-icons/fa';
// import {useParams} from 'react-router-dom';

// const ImageEditor = () => {
//   const {id} = useParams();

//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     // Hacer una petición para obtener las imágenes de la joya y actualizar el estado
//     const fetchImages = async () => {
//       try {
//         const res = await axios.get(
//           `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images`
//         );
//         setImages(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchImages();
//   }, [id]);

//   const onDrop = async (acceptedFiles) => {
//     // Subir las imágenes al servidor y actualizar el estado
//     const formData = new FormData();
//     for (const file of acceptedFiles) {
//       formData.append('images', file);
//     }
//     try {
//       const res = await axios.post(
//         `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images`,
//         formData,
//         {
//           headers: {'Content-Type': 'multipart/form-data'},
//         }
//       );
//       setImages((prevImages) => [...prevImages, ...res.data]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const onDelete = async (imageId) => {
//     // Eliminar la imagen del servidor y actualizar el estado
//     try {
//       await axios.delete(
//         `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}/images/${imageId}`
//       );
//       setImages((prevImages) =>
//         prevImages.filter((image) => image._id !== imageId)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//     console.log(imageId);
//   };

//   return (
//     <div>
//       <h3>Edit Images</h3>
//       <div
//         style={{
//           width: '15rem',
//           height: '10rem',
//           border: '2px dotted black',
//         }}
//       >
//         <Dropzone onDrop={onDrop}>
//           {({getRootProps, getInputProps}) => (
//             <div {...getRootProps()}>
//               <input {...getInputProps()} />
//               <p>Drag and drop images here, or click to select files</p>
//             </div>
//           )}
//         </Dropzone>
//       </div>
//       <div className='image-grid' style={{display: 'flex', gap: '2rem'}}>
//         {images.map((image) => (
//           <div key={image._id} className='image-card'>
//             <img
//               src={image.url}
//               alt={`Jewelry ${id}`}
//               style={{maxWidth: '6rem'}}
//             />
//             <div className='image-card-overlay'>
//               <button onClick={() => onDelete(image._id)}>
//                 <FaTimesCircle />
//               </button>
//             </div>
//           </div>
//         ))}
//         <div className='image-card add-image'>
//           <div className='image-card-overlay'>
//             <button>
//               <FaPlusCircle />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageEditor;
