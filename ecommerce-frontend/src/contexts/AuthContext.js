import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, setAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        const claims = parseToken(token);
        // console.log('Parsed token claims:', claims); // Debug log
        setIsAuthenticated(true);
        setRoles(claims.roles || []);
      }
    } catch (error) {
    //   console.error('Check Auth Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (username, password) => {
    const response = await login(username, password);
    await AsyncStorage.setItem('token', response.token);
    setAuthToken(response.token);
    const claims = parseToken(response.token);
    // console.log('Login parsed token claims:', claims); // Debug log
    setIsAuthenticated(true);
    setRoles(claims.roles || []);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setAuthToken(null);
    setIsAuthenticated(false);
    setRoles([]);
  };

  const parseToken = (token) => {
    if (!token) return {};
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const parsed = JSON.parse(jsonPayload);
    //   console.log('Parsed token payload:', parsed); // Debug log
      return parsed; // Ensure this returns the full parsed object
    } catch (e) {
    //   console.error('Parse Token Error:', e);
      return {};
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, login: loginUser, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};