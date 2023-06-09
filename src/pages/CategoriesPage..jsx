import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Card from '../components/Card';
import Loader from '../components/Loader';

const CategoriesPage = () => {
  const params = useParams();
  const {category} = params;

  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getJewelrys();
  }, []);

  const getJewelrys = async () => {
    setIsFetching(true);
    let url = `https://backup-backend-pp-production.up.railway.app/api/jewelry/category/${category}`;

    try {
      const res = await axios.get(url);
      setItems(res.data.jewelries);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setPageIsLoading(false);
      setIsFetching(false);
    }
  };
  if (pageIsLoading) {
    return (
      <div className='home home--loading'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='categories-page pp-padding'>
      <h1 className='categories-page__title'>{category}</h1>
      <div
        className={
          isFetching
            ? 'home__latest-items home__latest-items--loading'
            : 'home__latest-items'
        }
      >
        {isFetching ? <Loader justify='center' /> : <Card items={items} />}
        {totalPages <= 1 ? null : (
          <div className='table__pagination'>
            <div className='table__pagination-wrapper'>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => getJewelrys(pageNumber)}
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
      </div>
    </div>
  );
};

export default CategoriesPage;
