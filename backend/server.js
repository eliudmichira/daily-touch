import express from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', // Your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));

const SECRET_KEY = 'your_secret_key';
const USERS_FILE = path.join(__dirname, 'users.json');
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

/** Utility function to read users.json */
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    // Handle both formats: direct array or {users: []}
    return Array.isArray(parsed) ? parsed : (parsed.users || []);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

/** Utility function to write to users.json */
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};

/** Utility function to read products.json */
const readProducts = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    return [];
  }
};

/** User Registration */
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Registration attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readUsers();
    console.log('Current users:', users);

    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });
    writeUsers(users);
    console.log('User registered successfully');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

/** User Login */
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login attempt with body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing required fields:', { email: !!email, password: !!password });
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = readUsers();
    console.log('Users in database:', users.map(u => u.email));
    
    const user = users.find(user => user.email === email);
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', validPassword);
    
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

/** Middleware to Authenticate Token */
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

/** Protected Profile Route */
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ user: { email: req.user.email } });
});

/** Products API Endpoint */
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

/** Single Product API Endpoint */
app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
});

/** Products by Category API Endpoint */
app.get('/api/categories/:category', (req, res) => {
  const products = readProducts();
  const categoryProducts = products.filter(
    p => p.category.toLowerCase() === req.params.category.toLowerCase()
  );
  
  res.json(categoryProducts);
});

/** Start the Server */
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
