
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define user roles
export type UserRole = 'customer' | 'admin';

// Define user type
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

// Mock admin user
const ADMIN_USER: User = {
  id: 'admin-1',
  email: 'admin@aurorabling.com',
  name: 'Admin User',
  role: 'admin'
};

// Mock customers
const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'customer'
  },
  ADMIN_USER
];

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAdmin: false,
  isAuthenticated: false
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is stored in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, remember: boolean = false) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(user => user.email === email);
    
    if (foundUser && password === 'password') { // Simple mock password check
      setUser(foundUser);
      if (remember) {
        localStorage.setItem('user', JSON.stringify(foundUser));
      }
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid email or password");
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  // Register function
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (MOCK_USERS.some(user => user.email === email)) {
      toast.error("User already exists");
      throw new Error('User already exists');
    }
    
    // Create new user (in a real app this would be stored in a database)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'customer'
    };
    
    // Add to mock users array (this would be persisted in a real app)
    MOCK_USERS.push(newUser);
    
    // Auto login after registration
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast.success("Registration successful");
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
