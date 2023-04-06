import React, {useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import {} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';
import {FaTimesCircle} from 'react-icons/fa';

const CreateJewelry = () => {
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
    https: try {
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
            <input
              className='create-item__input'
              onChange={(e) => setDescription(e.target.value)}
              type='text'
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

//  console.log(
//    'titulo: ',
//    title,
//    'description: ',
//    description,
//    'category: ',
//    category,
//    'measures: ',
//    measures,
//    'color: ',
//    color,
//    'images: ',
//    images,
//    typeof images,
//    'tags:',
//    tags
//  );

// // handle tags
// const handleTags = () => {
//   setTags([...tags, '']);
// };

// const handleTagChange = (index, e) => {
//   const newTags = [...tags];
//   newTags[index] = e.target.value;
//   setTags(newTags);
// };

// Si funciona

//   import React, {useState} from 'react';
// import axios from 'axios';

// const CreateJewelry = () => {
//   const [images, setImages] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [measures, setMeasures] = useState('');
//   const [color, setColor] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [tags, setTags] = useState('');
//   // handle images
//   const handleImage = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImages((oldArray) => [...oldArray, reader.result]);
//       };
//     });
//   };

//   // submit the form
//   const submitForm = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     try {
//       const {data} = await axios.post(
//         'https://backup-backend-pp-production.up.railway.app/api/jewelry/create',
//         {title, description, category, measures, color, tags, images}
//       );
//       if (data.success === true) {
//         setLoading(false);
//         setTitle('');
//         setImages([]);
//         setDescription('');
//         setCategory('');
//         setMeasures('');
//         setColor('');
//         setTags('');
//         console.log('Jewelry created successfully');
//       }
//     } catch (error) {}

//     console.log(
//       'titulo: ',
//       title,
//       'description: ',
//       description,
//       'category: ',
//       category,
//       'measures: ',
//       measures,
//       'color: ',
//       color,
//       'images: ',
//       images,
//       'tags:',
//       tags
//     );
//   };

//   return (
//     <div style={{paddingTop: '5rem'}}>
//       <h2>ADD JEWELRY</h2>
//       <form onSubmit={submitForm} encType='multipart/form-data'>
//         <div className='create-item__wrapper-input' >
//           <input
//             onChange={(e) => setTitle(e.target.value)}
//             type='text'
//             id='forTitle'
//             name='title'
//             required
//           />
//           <label htmlFor='forTitle'>title</label>
//         </div>
//         <div>
//           <input
//             onChange={(e) => setDescription(e.target.value)}
//             type='text'
//             id='formdescription'
//             name='description'
//             required
//           />
//           <label htmlFor='formdescription'>Description</label>
//         </div>
//         <div>
//           <input
//             onChange={(e) => setCategory(e.target.value)}
//             type='text'
//             id='formcategory'
//             name='category'
//             required
//           />
//           <label htmlFor='formcategory'>Category</label>
//         </div>

//         <div>
//           <input
//             onChange={(e) => setMeasures(e.target.value)}
//             type='text'
//             id='formeasures'
//             name='measures'
//             required
//           />
//           <label htmlFor='formmeasures'>Measures</label>
//         </div>
//         <div>
//           <input
//             onChange={(e) => setColor(e.target.value)}
//             type='text'
//             id='forcolor'
//             name='color'
//             required
//           />
//           <label htmlFor='forcolor'>Color</label>
//         </div>

//         <div>
//           <input
//             onChange={(e) => setTags(e.target.value)}
//             type='text'
//             id='fortag'
//             name='tags'
//             required
//           />
//           <label htmlFor='fortags'>Tags</label>
//         </div>

//         <div>
//           <input
//             onChange={handleImage}
//             type='file'
//             id='formupload'
//             name='image'
//             multiple
//           />
//           <label htmlFor='formupload'>Images</label>
//         </div>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img
//               src={image}
//               style={{maxWidth: '5rem'}}
//               alt={`Image ${index}`}
//             />
//           </div>
//         ))}

//         <button type='submit'>
//           {loading ? 'Uploading...' : 'Create Jewelry'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateJewelry;
