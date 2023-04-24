import React, {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../backend/client.js';
import Table from '../components/Table.jsx';
import Loader from '../components/Loader.jsx';
const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    document.title = `Dashboard`;
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        navigate('/login');
      }
    };
    getUser();
  }, [navigate]);

  if (!user) {
    return (
      <div
        className={`${
          !user
            ? 'dashboard pp-padding dashboard--loading'
            : 'dashboard pp-padding'
        }`}
      >
        <Loader />;
      </div>
    );
  }

  return (
    <div className='dashboard pp-padding'>
      <Table />
    </div>
  );
};

export default DashboardPage;
