import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {MdClose} from 'react-icons/md';
import {BsArrowRight} from 'react-icons/bs';
import {BiSearch} from 'react-icons/bi';
import {FaRegSadCry} from 'react-icons/fa';

import {v4 as uuidv4} from 'uuid';

import Loader from './Loader';

const Searcher = () => {
  const [searcherModal, setSearcherModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [messageError, setMessageError] = useState('second');

  const toggleModal = () => {
    setSearcherModal(!searcherModal);
    setSearchInput('');
    setResults([]);
  };

  const fetchResults = async () => {
    try {
      const {data} = await axios.get(
        `${import.meta.env.VITE_API_URL}/search?query=${searchInput}`
      );
      setResults(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setSearchError(true);
      setMessageError(error.response.data.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchError(false);
    fetchResults();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsLoading(true);
      setSearchError(false);
      fetchResults();
    }
  };

  useEffect(() => {
    document.body.classList.toggle('no-scroll', searcherModal);
  }, [searcherModal]);

  return (
    <div className='searcher'>
      {!searcherModal && (
        <button
          className='searcher__launcher'
          onClick={() => {
            toggleModal();
          }}
        >
          <BiSearch />
        </button>
      )}
      {searcherModal && (
        <div
          className={`searcher__modal ${
            results.length === 0 ? '' : 'searcher__modal--searching'
          } `}
        >
          <div className='searcher__header'>
            <span className='searcher__title'>Buscar</span>
            <button
              className='searcher__close'
              onClick={() => {
                toggleModal();
              }}
            >
              <MdClose />
            </button>
          </div>
          <form className='searcher__form' onSubmit={handleSearch}>
            <input
              className='searcher__input'
              type='search'
              autoFocus={true}
              required
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <button className='searcher__button'>
              <BiSearch />
            </button>
          </form>

          <div
            className={`searcher__results ${
              results.length >= 1 ? 'searcher__results--on' : ''
            }`}
          >
            {isLoading ? (
              <Loader w={1.8} alignS='start' />
            ) : searchError ? (
              <div className='searcher__error'>
                {messageError}
                <FaRegSadCry />
              </div>
            ) : (
              Array.isArray(results) &&
              results.slice(0, 15).map((result) => (
                <>
                  {isLoading ? (
                    <Loader key={uuidv4()} w={1.8} alignS='start' />
                  ) : (
                    <Link
                      className='searcher__result'
                      key={uuidv4()}
                      to={`item/${result._id}`}
                      onClick={() => {
                        setResults([]);
                        setSearcherModal(false);
                      }}
                    >
                      <div className='searcher__result-image-container'>
                        {result.images ? (
                          <img
                            className='searcher__result-image'
                            src={result.images[0]?.url}
                          />
                        ) : (
                          // <ImageNotAvailable movie size={1.5} />
                          <div>Imagen no disponible</div>
                        )}
                      </div>

                      <div className='searcher__result-info'>
                        <span className='searcher__result-title'>
                          {result.title}
                        </span>
                        <span className='searcher__result-release-date'>
                          {result.tags.join(', ')}
                        </span>
                      </div>
                      <span className='searcher__result-arrow'>
                        <BsArrowRight />
                      </span>
                    </Link>
                  )}
                </>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searcher;
