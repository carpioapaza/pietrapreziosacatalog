import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ImageEditor from '../components/ImageEditor';
import Loader from '../components/Loader';

const UpdateJewelry = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [measures, setMeasures] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState('');
  const [isLimitedEdition, setIsLimitedEdition] = useState(false); // nuevo estado

  useEffect(() => {
    const getJewelry = async () => {
      try {
        const {data} = await axios.get(
          `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}`
        );

        const jewelry = data.data;
        const {
          title,
          description,
          category,
          measures,
          color,
          tags,
          isLimitedEdition,
        } = jewelry;
        setTitle(title);
        setDescription(description);
        setCategory(category);
        setMeasures(measures);
        setColor(color);
        setTags(tags.toString());
        setIsLimitedEdition(isLimitedEdition);
      } catch (error) {
        console.log(error);
      }
    };

    getJewelry();
  }, [id]);

  console.log(isLimitedEdition);

  // submit the form
  const submitForm = async (e) => {
    setLoading(true);
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}`,
        {
          title,
          description,
          category,
          measures,
          color,
          tags,
          isLimitedEdition,
        }
      );
      if (data.success === true) {
        setLoading(false);
        console.log('Jewelry updated successfully');
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <input
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
            <label htmlFor='formcategory'>Categoria</label>

            <input
              className='update-jewelry__input'
              onChange={(e) => setCategory(e.target.value)}
              type='text'
              id='formcategory'
              name='category'
              value={category}
              required
            />
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
            <label htmlFor='formisLimitedEdition'>Edición Limitada</label>
            <input
              className='create-item__input'
              onChange={(e) => setIsLimitedEdition(e.target.checked)}
              type='checkbox'
              checked={isLimitedEdition}
              id='formisLimitedEdition'
              name='isLimitedEdition'
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
    </div>
  );
};

export default UpdateJewelry;

// setTags(tags.length > 0 ? tags.toString() : '');

// import React, {useState, useEffect} from 'react';
// import {useParams} from 'react-router-dom';
// import axios from 'axios';

// const UpdateJewelry = () => {
//   const {id} = useParams();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [measures, setMeasures] = useState('');
//   const [color, setColor] = useState('');
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [tags, setTags] = useState('');

//   useEffect(() => {
//     const getJewelry = async () => {
//       try {
//         const {data} = await axios.get(
//           `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}`
//         );

//         const jewelry = data.data;
//         const {title, description, category, measures, color, images, tags} =
//           jewelry;
//         setTitle(title);
//         setDescription(description);
//         setCategory(category);
//         setMeasures(measures);
//         setColor(color);
//         setImages(images);
//         setTags(tags.toString());
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getJewelry();
//   }, [id]);

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
//       const {data} = await axios.put(
//         `https://backup-backend-pp-production.up.railway.app/api/jewelry/${id}`,
//         {
//           title,
//           description,
//           category,
//           measures,
//           color,
//           images,
//           tags,
//         }
//       );
//       if (data.success === true) {
//         setLoading(false);
//         console.log('Jewelry updated successfully');
//       }
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//     console.log(typeof images, images);
//   };

//   return (
//     <div style={{paddingTop: '5rem'}}>
//       <h2>EDIT JEWELRY</h2>
//       <form onSubmit={submitForm} encType='multipart/form-data'>
//         <div>
//           <input
//             onChange={(e) => setTitle(e.target.value)}
//             type='text'
//             id='fortitle'
//             name='title'
//             value={title}
//             required
//           />
//           <label htmlFor='fortitle'>title</label>
//         </div>
//         <div>
//           <input
//             onChange={(e) => setDescription(e.target.value)}
//             type='text'
//             id='formdescription'
//             name='description'
//             value={description}
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
//             value={category}
//             required
//           />
//           <label htmlFor='formcategory'>Category</label>
//         </div>
//         <div>
//           <input
//             onChange={(e) => setMeasures(e.target.value)}
//             type='text'
//             id='formmeasures'
//             name='measures'
//             value={measures}
//             required
//           />
//           <label htmlFor='formmeasures'>measures</label>
//         </div>
//         <div>
//           <input
//             onChange={(e) => setColor(e.target.value)}
//             type='text'
//             id='formcolor'
//             name='color'
//             value={color}
//             required
//           />
//           <label htmlFor='formcolor'>color</label>
//         </div>

//         <div>
//           <input
//             onChange={(e) => setTags(e.target.value)}
//             type='text'
//             id='fortag'
//             name='tags'
//             value={tags}
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
//         <button type='submit'>
//           {loading ? 'Updating...' : 'Update Jewelry'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateJewelry;
