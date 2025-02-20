import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Ensure this matches your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set token globally for authenticated requests
export const setAuthToken = (newToken) => {
  if (newToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    // console.log('Token set:', newToken); // Debug log
  } else {
    delete api.defaults.headers.common['Authorization'];
    // console.log('Token removed');
  }
};

export const login = async (username, password) => {
  try {
    // console.log('Logging in with:', { username, password }); // Debug log
    const response = await api.post('/auth/login', { username, password });
    // console.log('Login response:', response.data); // Debug log
    setAuthToken(response.data.token); // Set token after successful login
    return response.data;
  } catch (error) {
    // console.error('Login error:', error.response?.status, error.response?.data || error.message);
    throw error; // Re-throw to handle in UI
  }
};

export const register = async (username, password, roles) => {
  try {
    const response = await api.post('/auth/register', { username, password, roles });
    return response.data;
  } catch (error) {
    // console.error('Register error:', error.response?.status, error.response?.data || error.message);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    // console.log('Fetching products with headers:', api.defaults.headers.common); // Debug log
    const response = await api.get('/products');
    // console.log('Products fetched:', response.data); // Debug log
    return response.data;
  } catch (error) {
    // console.error('Get Products Error:', error.response?.status, error.response?.data || error.message);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get Product Error:', error.response?.status, error.response?.data || error.message);
    throw error;
  }
};

export const addProduct = async (product) => {
    try {
      console.log('Sending addProduct request:', product, 'Headers:', api.defaults.headers.common);
      const response = await api.put('/products', product, {
        timeout: 10000, // 10-second timeout to prevent hanging
      });
      console.log('Add Product response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Add Product Error:', error.response?.status, error.response?.data || error.message);
      throw error; // Ensure error is propagated to the caller
    }
  };

export default api;