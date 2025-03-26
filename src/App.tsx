import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { SearchResults } from '@/pages/SearchResults';
import { Categories } from '@/pages/Categories';
import { CategoryPage } from '@/pages/CategoryPage';

// Auth Imports
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';

// Replace BrowserRouter with createBrowserRouter
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/Layout';

// Define your routes with authentication
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        // Root path redirects based on auth status
        { 
          path: "", 
          element: <Navigate to="/home" /> 
        },
        
        // Home route
        { 
          path: "home", 
          element: <Home /> 
        },
        
        // Product routes
        { 
          path: "products", 
          element: <Products /> 
        },
        { 
          path: "search", 
          element: <SearchResults /> 
        },
        { 
          path: "categories", 
          element: <Categories /> 
        },
        { 
          path: "categories/:category", 
          element: <CategoryPage /> 
        },
        
        // Auth routes
        { 
          path: "login", 
          element: <Login /> 
        },
        { 
          path: "register", 
          element: <Register /> 
        },
        
        // Profile route
        { 
          path: "profile", 
          element: <Profile /> 
        },
        
        // Fallback route
        { 
          path: "*", 
          element: <Navigate to="/" replace /> 
        }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check authentication status and setup listener
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    // Initial check
    checkAuth();

    // Setup storage event listener to handle auth changes across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          <h2>Something went wrong.</h2>
          <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default App;