import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Test login with valid credentials
async function testLogin() {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Login successful:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return null;
  }
}

// Test fetching products
async function testGetProducts() {
  try {
    const response = await axios.get(`${API_URL}/products`);
    console.log('Products fetched:', response.data.length);
  } catch (error) {
    console.error('Failed to fetch products:', error.response?.data || error.message);
  }
}

// Test fetching user profile with token
async function testGetProfile(token) {
  if (!token) {
    console.log('Skipping profile test - no token available');
    return;
  }
  
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Profile fetched:', response.data);
  } catch (error) {
    console.error('Failed to fetch profile:', error.response?.data || error.message);
  }
}

// Run tests
async function runTests() {
  console.log('Starting API tests...');
  
  const token = await testLogin();
  await testGetProducts();
  await testGetProfile(token);
  
  console.log('Tests completed');
}

runTests(); 