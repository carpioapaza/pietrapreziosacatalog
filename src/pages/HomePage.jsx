import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import Categories from '../components/Categories';
import Hero from '../components/Hero';
import Loader from '../components/Loader';
const HomePage = () => {
  useEffect(() => {
    document.title = 'Pietra Preziosa';
  }, []);

  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getJewelrys();
  }, []);

  const getJewelrys = async (page = '1') => {
    setIsFetching(true);
    // let url = `http://localhost:8082/api/jewelry/not-highlighted?page=${page}`;
    let url = `${import.meta.env.VITE_API_URL}/not-highlighted?page=${page}`;

    try {
      const response = await axios.get(url);
      setItems(response.data.jewelries);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error(error);
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
    <div className='home'>
      <Hero />
      <div className='home__bottom pp-padding'>
        <div className='home__categories'>
          <Categories />
        </div>
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
    </div>
  );
};

export default HomePage;
