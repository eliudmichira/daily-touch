import axios from 'axios';
import { API_BASE_URL } from './config';

export const register = async (userData) => {
  console.log('Attempting to register with:', userData);
  console.log('API URL:', `${API_BASE_URL}/register`);
  
  try {
    const timestamp = new Date().getTime();
    const response = await axios.post(`${API_BASE_URL}/register?v=${timestamp}`, userData);
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}; 