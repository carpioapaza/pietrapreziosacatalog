import React, {useEffect, useState} from 'react';
import {FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp} from 'react-icons/fa';
import {GiRing, GiDropEarrings, GiPearlNecklace} from 'react-icons/gi';
import {FaCircleNotch} from 'react-icons/fa';
import {BiBookmarks, BiSearch, BiCategory} from 'react-icons/bi';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {supabase} from '../backend/client.js';
import Searcher from './Searcher.jsx';

const Header = () => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [menuStatus, setMenuStatus] = useState(true);
  const [userLogin, setUserLogin] = useState(false);

  const toggleMenu = () => {
    menuStatus ? setMenuStatus(false) : setMenuStatus(true);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      if (user) {
        setUserLogin(true);
      } else {
        setUserLogin(false);
      }
    };
    getUser();
  }, [pathname]);

  //Log Out
  const logOut = async () => {
    await supabase.auth.signOut();
    localStorage.setItem('isLoggedIn', false);
    navigate('/');
    setUserLogin(false);
  };

  return (
    <div className='header'>
      <header className='header__content pp-padding'>
        <a className='header__link' href='#'>
          Pietra Preziosa
          <div>
            <span>catálogo</span>
            {userLogin ? (
              <span className='header__link-admin'> | admin</span>
            ) : (
              ''
            )}
          </div>
        </a>
        <nav className='header__nav'>
          <Searcher />
          {/* <Link to={`saved`} className='header__saved'>
            <BiBookmarks />
          </Link> */}
          <div className='header__categories'>
            <button
              className={`${
                menuStatus
                  ? 'header__categories-btn'
                  : 'header__categories-btn header__categories-btn--on'
              }`}
              onClick={toggleMenu}
            >
              <BiCategory />
            </button>
            <div
              className={`${
                menuStatus
                  ? 'header__categories-wrapper'
                  : 'header__categories-wrapper header__categories-wrapper--on'
              }`}
              onClick={toggleMenu}
            >
              {userLogin ? (
                <Link
                  className='header__categories-dashboard'
                  to={`/dashboard`}
                >
                  Dashboard
                </Link>
              ) : (
                <div className='header__categories-list'>
                  <a className='header__categories-link' href=''>
                    <GiRing />
                    Anillos
                  </a>
                  <a className='header__categories-link' href=''>
                    <GiDropEarrings />
                    Aretes
                  </a>
                  <a className='header__categories-link' href=''>
                    <FaCircleNotch />
                    Pulseras
                  </a>
                  <a className='header__categories-link' href=''>
                    <GiPearlNecklace />
                    Collares
                  </a>
                </div>
              )}
              {!userLogin ? (
                <Link to={`/login`} className='header__categories-login'>
                  Iniciar sesión
                </Link>
              ) : (
                <button onClick={logOut}>Cerrar sesión</button>
              )}

              <div className='header__categories-social'>
                <a
                  className='header__categories-social-link'
                  target='_blank'
                  href='https://www.facebook.com/joyeriapietrapreziosa'
                >
                  <FaFacebookF />
                </a>
                <a
                  className='header__categories-social-link'
                  target='_blank'
                  href='https://www.instagram.com/joyeriapietrapreziosa/'
                >
                  <FaInstagram />
                </a>
                <a
                  className='header__categories-social-link'
                  target='_blank'
                  href='https://www.tiktok.com/@joyeriapietrapreziosa'
                >
                  <FaTiktok />
                </a>
                <a
                  className='header__categories-social-link'
                  target='_blank'
                  href='https://api.whatsapp.com/message/6HDZANPOEEWJI1?autoload=1&app_absent=0'
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
