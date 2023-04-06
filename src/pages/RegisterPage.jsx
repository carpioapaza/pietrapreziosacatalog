import React, {useState} from 'react';

import {supabase} from '../backend/client.js';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase.auth.signUp({
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login ml-padding'>
      <div className='login__content'>
        <h1 className='login__title'>Register</h1>
        <form className='login__form' onSubmit={handleSubmit}>
          <input
            className='login__input login__input-email'
            type='email'
            name='email'
            placeholder='tu correo :D'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className='login__input login__input-password'
            type='password'
            name='password'
            placeholder='123456 xD'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login__btn'>Registrarte</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
