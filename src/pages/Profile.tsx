import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Package, Heart, Settings, LogOut, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../api/config';

interface UserResponse {
  user: { 
    email: string;
    name?: string;
  };
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get<UserResponse>(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          throw new Error('User data not found');
        }
      } catch (err: any) {
        console.error('Error fetching user data:', err.message);
        setError('Failed to fetch user data. Please log in again.');
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the stored JWT token
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 text-amber-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg max-w-md">
          <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Error</h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button 
            onClick={() => navigate('/login')} 
            className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-5xl"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-lg border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                    <User className="h-7 w-7 text-stone-600 dark:text-stone-400" />
                  </div>
                  <div>
                    <h2 className="font-medium text-lg">{user?.name || 'User'}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                        activeTab === 'profile'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-400'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                        activeTab === 'orders'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-400'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Package className="h-5 w-5" />
                      <span>Orders</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                        activeTab === 'wishlist'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-400'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/20 dark:text-amber-400'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </button>
                  </li>
                </ul>
              </nav>
              
              <div className="p-2 border-t border-stone-200 dark:border-stone-800 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-left transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-card rounded-lg border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-2xl font-medium mb-6 font-playfair">My Profile</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Account Information</h3>
                      <div className="bg-background rounded-lg p-4 border border-stone-200 dark:border-stone-800">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Email</p>
                            <p className="font-medium">{user?.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Name</p>
                            <p className="font-medium">{user?.name || 'Not provided'}</p>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline"
                          className="mt-4"
                          onClick={() => setActiveTab('settings')}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
                      <div className="bg-background rounded-lg p-4 border border-stone-200 dark:border-stone-800">
                        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                        <Button 
                          className="mt-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                          onClick={() => navigate('/')}
                        >
                          Browse Products
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div className="p-6">
                  <h2 className="text-2xl font-medium mb-6 font-playfair">My Orders</h2>
                  <div className="bg-background rounded-lg p-8 border border-stone-200 dark:border-stone-800 text-center">
                    <Package className="h-12 w-12 mx-auto text-stone-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Orders Found</h3>
                    <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                      onClick={() => navigate('/')}
                    >
                      Browse Products
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div className="p-6">
                  <h2 className="text-2xl font-medium mb-6 font-playfair">My Wishlist</h2>
                  <div className="bg-background rounded-lg p-8 border border-stone-200 dark:border-stone-800 text-center">
                    <Heart className="h-12 w-12 mx-auto text-stone-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your Wishlist is Empty</h3>
                    <p className="text-muted-foreground mb-6">Save items you like for later.</p>
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                      onClick={() => navigate('/')}
                    >
                      Browse Products
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="p-6">
                  <h2 className="text-2xl font-medium mb-6 font-playfair">Account Settings</h2>
                  <p className="text-muted-foreground mb-6">Update your account information and preferences.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address</label>
                          <input 
                            type="email" 
                            value={user?.email || ''} 
                            disabled
                            className="w-full px-3 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md"
                          />
                          <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <input 
                            type="text" 
                            defaultValue={user?.name || ''} 
                            placeholder="Enter your full name"
                            className="w-full px-3 py-2 bg-background border border-stone-200 dark:border-stone-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Password</label>
                          <Button variant="outline" className="w-full justify-start">
                            Change Password
                          </Button>
                        </div>
                        
                        <Button
                          className="mt-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                        >
                          Save Changes
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}