import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../backend/client.js';
import Table from '../components/Table.jsx';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      }
    };
    getUser();
  }, [navigate]);

  return (
    <div className='dashboard ml-padding'>
      <Table />
    </div>
  );
};

export default DashboardPage;
