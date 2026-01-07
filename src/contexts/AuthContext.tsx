import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';

// Mock User Interface
const MOCK_USER: User = {
  id: 'mock-user-id',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, mobileNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if ((email === 'ankit' || email === 'ankit@example.com') && password === '12345678') {
      setUser(MOCK_USER);
      localStorage.setItem('mock_user', JSON.stringify(MOCK_USER));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signUp = async (email: string, password: string, fullName: string, mobileNumber: string) => {
    // Mock signup - just log them in for now or throw error
    // For demo simplicity, let's allow it but warn
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Mock signup:', { email, password, fullName, mobileNumber });

    // Creating a new user for them
    const newUser = { ...MOCK_USER, id: Math.random().toString(), email };
    setUser(newUser);
    localStorage.setItem('mock_user', JSON.stringify(newUser));
  };

  const signOut = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
