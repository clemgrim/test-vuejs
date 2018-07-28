import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { 'Accept': 'application/json' }
});

export const getAllArticles = () => {
  return http.get('/articles')
    .then(response => response.data.result);
};

export const findArticle = (id) => {
  return http.get(`/articles/${id}`)
    .then(response => response.data.result);
};

export const getNotificationsCount = () => {
  return http.get('/notifications/count')
    .then(response => response.data.result);
};

export const getIdentity = () => {
  return http.get('/me')
    .then(response => response.data.result);
};

export const refreshToken = (token) => {
  return http.post('/auth/refresh-token', { token })
    .then(response => response.data);
};

export const login = (username, password) => {
  return http.post('/auth/login', { username, password })
    .then(response => response.data);
}

export default http;