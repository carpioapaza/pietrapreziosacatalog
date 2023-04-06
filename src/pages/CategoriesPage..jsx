import React from 'react';
import {useNavigate} from 'react-router-dom';

const CategoriesPage = () => {
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getJewelrys();
  }, []);
  const navigate = useNavigate();
  console.log(navigate);
  const getJewelrys = async () => {
    setIsFetching(true);
    // let url = `http://localhost:8082/api/jewelry/category/${category}`;
    try {
      // const res = await axios.get(url);
      // setItems(res.data.jewelries);
      // setCurrentPage(res.data.page);
      // setTotalPages(res.data.pages);
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
  return <div></div>;
};

export default CategoriesPage;
