import axios from 'axios';

const pietraApi = axios.create({baseURL: 'https://api.themoviedb.org/3'});

export const getAllProducts = async () => {
  const res = await pietraApi.get('');
  return res.data.result;
};
