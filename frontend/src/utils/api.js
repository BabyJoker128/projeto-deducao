import axios from 'axios';

const api = axios.create({
  // Substitua pela URL do Render, ex: 'https://projeto-deducao.onrender.com/api'
  baseURL: 'https://projeto-deducao.onrender.com/api',
});

// Interceptor para adicionar o token em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;