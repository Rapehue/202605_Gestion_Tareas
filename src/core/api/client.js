import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api'
});

client.interceptors.response.use(

  response => response,

  error => {

    console.error(error);

    return Promise.reject(error);
  }
);

export default client;