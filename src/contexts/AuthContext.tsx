import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  username: string;
  role: 'admin' | 'client';
}

// This will be the structure for storing users, including password.
interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Key for localStorage
const USERS_STORAGE_KEY = 'app_users';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);

  // Load users from localStorage on initial render, or from users.json if not present
  useEffect(() => {
    const initializeUsers = async () => {
      try {
        const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
          return;
        }

        // If no users in storage, fetch from the new users.json file
        const response = await fetch('/users.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch users.json: ${response.statusText}`);
        }
        const defaultUsers = await response.json();
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
        setUsers(defaultUsers);
      } catch (error) {
        console.error("Failed to load or initialize users:", error);
        // Fallback to an empty array if both localStorage and fetching fail.
        setUsers([]);
      }
    };

    initializeUsers();
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      // Don't store password in the user state
      const { password, ...userToSet } = foundUser;
      setUser(userToSet);
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string): boolean => {
    // Check if user already exists
    if (users.some(u => u.username === username)) {
      return false; // Username already taken
    }

    // Add new user (as a client by default)
    const newUser: StoredUser = { username, password, role: 'client' };
    const updatedUsers = [...users, newUser];
    
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};