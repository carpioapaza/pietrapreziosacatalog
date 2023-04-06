import React, {useEffect, useState} from 'react';

const NewItemPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);

  const [jewelryList, setJewelryList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch(
        'https://backup-backend-pp-production.up.railway.app/jewelry',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    console.log(name, description, category, images);
  };

  return (
    <div className='ml-padding' style={{paddingTop: '5rem'}}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Images:
          <input
            type='file'
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default NewItemPage;
