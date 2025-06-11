// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configurar el token para todas las peticiones
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Cargar usuario si hay token
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile');
        setUser(res.data.user);
      } catch (err) {
        // Token inválido o expirado
        setToken(null);
        setError('Sesión expirada, por favor inicie sesión nuevamente');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Registrar usuario
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
      throw err;
    }
  };

  // Login de usuario
  const login = async (credentials) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas');
      throw err;
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Limpiar errores
  const clearError = () => setError(null);

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};