





# Daily Touch - E-commerce Platform

## Overview

Daily Touch is a modern e-commerce platform built with React, TypeScript, and Node.js. It features user authentication, product browsing, and a responsive design for an optimal shopping experience on any device.

## Features

- **User Authentication**: Secure login and registration system with JWT
- **Product Catalog**: Browse products by category with high-quality images
- **Product Search**: Find products quickly with search functionality
- **User Profiles**: Manage account information and view order history
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Image Optimization**: Properly formatted product images with fallback support
- **Shopping Cart**: Add and remove products from your cart

## Tech Stack

### Frontend
- React 18
- TypeScript
- React Router v6
- Axios for API requests
- Framer Motion for animations
- Tailwind CSS for styling
- Shadcn UI components

### Backend
- Node.js
- Express.js
- JWT for authentication
- File-based storage (JSON)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/daily-touch.git
cd daily-touch
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Start the backend server
```bash
cd backend
node server.js
```

4. Start the frontend development server
```bash
# In a new terminal, from the project root
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Testing

The project includes a test script to verify API functionality:

```bash
cd backend
node test.js
```

### Test User Credentials
- Email: test@example.com
- Password: password123

## Project Structure

```
daily-touch/
├── backend/
│   ├── server.js           # Express server
│   ├── users.json          # User data storage
│   ├── products.json       # Product data with optimized images
│   └── test.js             # API test script
├── src/
│   ├── api/                # API client and configuration
│   │   ├── auth.js         # Authentication API functions
│   │   ├── products.js     # Product API functions
│   │   └── config.js       # API configuration
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── ProductImage.tsx # Image component with fallback
│   │   ├── Cart.tsx        # Shopping cart component
│   │   └── ThemeToggle.tsx # Dark/light mode toggle
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Home page
│   │   ├── Login.tsx       # Login page
│   │   ├── Register.tsx    # Registration page
│   │   ├── Profile.tsx     # User profile page
│   │   └── Products.tsx    # Products listing page
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate a user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `GET /api/categories/:category` - Get products by category

### User
- `GET /api/profile` - Get user profile (requires authentication)

## Troubleshooting

### Common Issues

1. **Connection Refused Error**
   - Ensure the backend server is running on port 3001
   - Check for any firewall issues blocking the connection

2. **Authentication Errors**
   - For login issues, verify credentials match those in users.json
   - For registration, ensure email is not already in use

3. **React Router Warnings**
   - These are warnings about upcoming changes in React Router v7
   - Add future flags to your router configuration to resolve

4. **Module System Conflicts**
   - Ensure consistent use of ES Modules in backend code
   - Verify package.json has "type": "module" for ES Module syntax

5. **Image Loading Issues**
   - The ProductImage component provides fallback handling for any images that fail to load
   - Check network tab for any image loading errors

### Debugging

- Check browser console for frontend errors
- Review server logs for backend issues
- Use the test.js script to verify API functionality

## Future Enhancements

- Checkout process with payment integration
- Order history and tracking
- Product reviews and ratings
- Admin dashboard for product management
- User wishlist functionality
- Advanced search filters
- Real database integration (MongoDB/PostgreSQL)
- Email notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Unsplash](https://unsplash.com) for product images
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Shadcn UI](https://ui.shadcn.com) for UI components
- [React Router](https://reactrouter.com) for routing
- [Framer Motion](https://www.framer.com/motion/) for animations
