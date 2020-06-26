import axios from 'axios';

const token = sessionStorage.getItem('token')

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: { 
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    Authorization: `Bearer ${token}`
 }
});

export default api;
