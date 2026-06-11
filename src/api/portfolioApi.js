import api from './client';

export const getPortfolio = async () => {

  const data =
    await api.get('/portfolio');

  return data;

};