import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const authStatus = localStorage.getItem('isAuthenticated');
        
        if (savedUser && authStatus === 'true') {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (mobileNumber, otp) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication (replace with real API)
      if (mobileNumber === '9876543210' && otp === '123456') {
        const userData = {
          id: Date.now(),
          mobile: mobileNumber,
          name: 'రాజు',
          nameEnglish: 'Raju',
          email: null,
          profilePicture: null,
          joinDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          preferences: {
            language: 'english',
            notifications: true,
            voiceEnabled: true
          },
          stats: {
            totalSessions: 0,
            totalTimeSpent: 0,
            favoriteModule: null
          }
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProgress');
  };

  // Update user data
  const updateUser = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Update user preferences
  const updatePreferences = (preferences) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...preferences }
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Check if user has completed onboarding
  const hasCompletedOnboarding = () => {
    return user?.preferences?.onboardingCompleted || false;
  };

  // Mark onboarding as completed
  const completeOnboarding = () => {
    updateUser({
      preferences: {
        ...user.preferences,
        onboardingCompleted: true
      }
    });
  };

  // Get user display name
  const getDisplayName = () => {
    if (!user) return '';
    return user.name || user.nameEnglish || user.mobile;
  };

  // Get user initials
  const getInitials = () => {
    if (!user) return '';
    const name = getDisplayName();
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    updatePreferences,
    hasCompletedOnboarding,
    completeOnboarding,
    getDisplayName,
    getInitials
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
