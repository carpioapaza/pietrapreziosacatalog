import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {supabase} from '../backend/client.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
      }, 2000);
      return;
    }
    setIsEmpty(false);
    setIsLoading(true);
    try {
      const {error} = await supabase.auth.signInWithPassword({email, password});
      if (error) {
        setIsLogin(false);
        setIsLoading(false);
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
      } else {
        localStorage.setItem('isLoggedIn', true);
        setIsLogin(true);
        setIsLoading(false);
        navigate('/dashboard');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      if (user) {
        navigate('/');
      }
    };
    getUser();
  }, [navigate]);

  return (
    <div className='login pp-padding'>
      <div
        className={`login__content ${
          isEmpty ? 'login__shake' : !isLogin ? 'login__shake' : ''
        }`}
      >
        <h1 className='login__title'>
          {isEmpty
            ? `Datos incompletos 😔`
            : !isLogin
            ? 'Datos incorrectos 😔'
            : '¡Hola! 😊'}
        </h1>
        <form className='login__form ' onSubmit={handleSubmit}>
          <input
            className='login__input login__input-email'
            type='email'
            name='email'
            placeholder='Correo'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className='login__input login__input-password'
            type='password'
            name='password'
            placeholder='Contraseña'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login__btn' disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
          <Link to={`/register`}>Regístrate </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
