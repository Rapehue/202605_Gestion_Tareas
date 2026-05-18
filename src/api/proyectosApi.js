import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getProyectos = () =>
  axios.get(`${API_URL}/proyectos`);

export const createProyecto = (data) =>
  axios.post(`${API_URL}/proyectos`, data);

export const updateProyecto = (id, data) =>
  axios.put(`${API_URL}/proyectos/${id}`, data);
