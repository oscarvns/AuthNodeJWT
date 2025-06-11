// src/utils/tokenUtils.js
export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const removeToken = () => localStorage.removeItem('token');

export const isAuthenticated = () => !!getToken();


// gestiona tokens JWT en el almacenamiento local

