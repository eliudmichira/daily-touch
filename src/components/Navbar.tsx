import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import { Cart } from '@/components/Cart';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Use try-catch to handle the case when outside router context
  let navigate;
  try {
    navigate = useNavigate();
  } catch (error) {
    // If useNavigate fails, provide a dummy function
    navigate = (path) => {
      console.warn('Navigation attempted outside router context:', path);
    };
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        isScrolled ? 'bg-stone-200 dark:bg-stone-800' : 'bg-white dark:bg-stone-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Link to="/home" className="flex items-center space-x-2 text-foreground hover:text-amber-500 transition">
                <Home className="h-5 w-5" />
                <span className="font-semibold">Home</span>
              </Link>
            )}
          </div>

          {/* Center Section */}
          <div>
            <Link
              to={isAuthenticated ? "/home" : "/login"}
              className="text-xl sm:text-2xl font-playfair font-medium tracking-wide text-foreground
                hover:text-amber-600 transition duration-300"
            >
              DAILY TOUCH
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
                <Cart />
              </>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}