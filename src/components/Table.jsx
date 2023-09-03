import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  BiTrash,
  BiShow,
  BiEdit,
  BiAddToQueue,
  BiFilterAlt,
} from 'react-icons/bi';

import {BsStarFill} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import Loader from './Loader';

const Table = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [items, setItems] = useState([]);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [numberItems, setNumberItems] = useState(0);

  const [category, setCategory] = useState('');
  const [mainItems, setMainItems] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    getFilteredItems();
  }, [category, mainItems]);

  const getFilteredItems = async (page = '1') => {
    setIsLoading(true);
    let url = `http://localhost:8082/api/jewelry?page=${page}`;
    if (category) {
      url = `http://localhost:8082/api/jewelry/category/${category}/?page=${page}`;
    } else if (mainItems) {
      url = 'http://localhost:8082/api/jewelry/highlighted';
    }
    try {
      const res = await axios.get(url);
      setItems(res.data.jewelries);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.pages);
      setNumberItems(res.data.jewelries.length);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingItemId(id);
    try {
      await axios.delete(
        // `http://localhost:8082/api/jewelry/${id}`
        `http://localhost:8082/api/jewelry/${id}`
      );
      setItems(items.filter((item) => item._id !== id));
      // setNumberItems(res.data.jewelries.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingItemId(null);
    }
  };

  return (
    <div className='table'>
      <ul className='table__list'>
        <li className='table__top'>
          <h1 className='table__title'>Últimos items agregados</h1>
          <p className='table__number-items'>
            {numberItems < 1 ? '' : `Total: ${numberItems}`}
          </p>
          <div className='table__actions'>
            {showFilters ? (
              <div className='table__filters'>
                <div className='table__filters-main-items'>
                  <label htmlFor='mainItems'>Destacados</label>
                  <input
                    onChange={(e) => setMainItems(e.target.checked)}
                    checked={mainItems}
                    id='mainItems'
                    name='mainItems'
                    type='checkbox'
                  />
                </div>

                <div className='table__filters-category'>
                  <select
                    className='create-item__input create-item__input--select'
                    onChange={(e) => setCategory(e.target.value)}
                    type='text'
                    id='formcategory'
                    placeholder='Anillos'
                    name='category'
                    required
                  >
                    <option value=''>Todas las joyas</option>
                    <option value='Anillos'>Anillos</option>
                    <option value='Aretes'>Aretes</option>
                    <option value='Pulseras'>Pulseras</option>
                    <option value='Collares'>Collares</option>
                  </select>
                </div>
              </div>
            ) : (
              ''
            )}

            <button
              className='table__actions-btn table__filter'
              onClick={() => {
                setShowFilters(!showFilters);
              }}
            >
              <BiFilterAlt />
            </button>

            {/* <button className='table__actions-btn table__search'>
              <BiSearch />
            </button> */}

            <Link to={`/items/new`} className='table__actions-btn table__add'>
              <BiAddToQueue />
            </Link>
          </div>
        </li>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {items.map((item) => (
              <li className='table__item' key={item._id}>
                <div
                  className={`table__left`}
                  style={item.isHighlighted ? null : {paddingLeft: '1.5rem'}}
                >
                  {item.isHighlighted ? (
                    <div>
                      <BsStarFill />
                    </div>
                  ) : null}

                  <div>
                    <div className='table__name'>{item.title}</div>
                    <div className='table__date'>{item.tags.join(', ')}</div>
                  </div>
                </div>
                <div className='table__right'>
                  <Link to={`/item/${item._id}`}>
                    <BiShow />
                  </Link>
                  <Link to={`/items/update/${item._id}`}>
                    <BiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={loadingItemId}
                  >
                    {loadingItemId === item._id ? (
                      <Loader w='1.8' />
                    ) : (
                      <BiTrash />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </>
        )}
        {totalPages <= 1 ? null : (
          <div className='table__pagination'>
            <div className='table__pagination-wrapper'>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => getFilteredItems(pageNumber)}
                    className={
                      pageNumber === currentPage
                        ? ' table__pagination-btn table__pagination-btn--active'
                        : ' table__pagination-btn'
                    }
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Table;

