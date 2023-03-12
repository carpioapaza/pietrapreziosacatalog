import React from 'react';
import {FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp} from 'react-icons/fa';
import {VscSearch} from 'react-icons/vsc';

const Header = () => {
  return (
    <div className='header'>
      <header className='header__content ml-padding'>
        <a className='header__link' href='#'>
          Pietra Preziosa
          <span>catálogo</span>
        </a>
        <nav className='header__nav'>
          <button className='header__searcher'>
            <VscSearch />
          </button>
          <ul className='header__social-list'>
            <li className='header__social-item'>
              <a
                className='header__social-link'
                target='_blank'
                href='https://www.facebook.com/joyeriapietrapreziosa'
              >
                <FaFacebookF />
              </a>
            </li>
            <li className='header__social-item'>
              <a
                className='header__social-link'
                target='_blank'
                href='https://www.instagram.com/joyeriapietrapreziosa/'
              >
                <FaInstagram />
              </a>
            </li>
            <li className='header__social-item'>
              <a
                className='header__social-link'
                target='_blank'
                href='https://www.tiktok.com/@joyeriapietrapreziosa'
              >
                <FaTiktok />
              </a>
            </li>
            <li className='header__social-item'>
              <a
                className='header__social-link'
                target='_blank'
                href='https://api.whatsapp.com/message/6HDZANPOEEWJI1?autoload=1&app_absent=0'
              >
                <FaWhatsapp />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
