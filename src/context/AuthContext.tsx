import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../models/types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function - simulates authentication
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication - in a real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      
      // Store user in localStorage (not secure, just for demo)
      localStorage.setItem('user', JSON.stringify(foundUser));
      
      return true;
    }
    
    return false;
  };

  // Register function - simulates user registration
  const register = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    // Check if email already exists
    const emailExists = mockUsers.some(u => u.email === userData.email);
    
    if (emailExists) {
      return false;
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create new user (in a real app, this would call an API)
    const newUser: User = {
      ...userData,
      id: `${mockUsers.length + 1}`,
      createdAt: new Date()
    };
    
    // In a real app, the user would be added to the database
    // For our demo, we'll just log them in directly
    setUser(newUser);
    setIsAuthenticated(true);
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};