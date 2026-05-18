import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const searchUsuarios = (q) =>
  axios.get(`${API_URL}/usuarios/search?q=${q}`);