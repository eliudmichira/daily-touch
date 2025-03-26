const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'your_secret_key';
const USERS_FILE = path.join(__dirname, 'users.json');  // This will create a 'users.json' file in the root folder

/** Utility function to read users.json */
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([])); // Create an empty array if the file doesn't exist
  }
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
};

/** Utility function to write to users.json */
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};

/** User Registration */
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const users = readUsers();

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, password: hashedPassword });
  writeUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
});

/** User Login */
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const users = readUsers();
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
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

/** Start the Server */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
