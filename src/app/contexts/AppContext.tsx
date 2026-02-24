import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type UserRole = 'Admin' | 'Financial Advisor' | 'Data Analyst' | 'User';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  id?: string;
  avatar?: string;
  phone?: string;
  createdAt?: string;
}

interface SessionData {
  user: User;
  loginTime: number;
  lastActivityTime: number;
  rememberMe: boolean;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  selectedFunds: string[];
  toggleFundSelection: (fundId: string) => void;
  clearSelectedFunds: () => void;
  loginTime: number | null;
  lastActivityTime: number | null;
  isSessionExpired: boolean;
}

const AUTH_STORAGE_KEY = 'fundinsight_session';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock users for demo (in a real app, validate against a backend)
const MOCK_USERS: Array<{ email: string; password: string; name: string; role: UserRole; id: string; avatar: string }> = [
  {
    email: 'admin@fundinsight.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'Admin',
    id: 'admin-001',
    avatar: '👨‍💼',
  },
  {
    email: 'advisor@fundinsight.com',
    password: 'advisor123',
    name: 'Jane Advisor',
    role: 'Financial Advisor',
    id: 'advisor-001',
    avatar: '👩‍💼',
  },
  {
    email: 'user@fundinsight.com',
    password: 'user123',
    name: 'John Investor',
    role: 'User',
    id: 'user-001',
    avatar: '👤',
  },
];

function getStoredSession(): SessionData | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as SessionData;
    
    // Check if session has expired (even if remember-me is enabled, validate within 7 days)
    const now = Date.now();
    const sessionAge = now - session.loginTime;
    const maxSessionAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    if (sessionAge > maxSessionAge) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const storedSession = getStoredSession();
  const [user, setUser] = useState<User | null>(storedSession?.user ?? null);
  const [userRole, setUserRoleState] = useState<UserRole>(user?.role ?? 'User');
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const [loginTime, setLoginTime] = useState<number | null>(storedSession?.loginTime ?? null);
  const [lastActivityTime, setLastActivityTime] = useState<number | null>(storedSession?.lastActivityTime ?? null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Handle session persistence
  useEffect(() => {
    if (user && loginTime) {
      const session: SessionData = {
        user,
        loginTime,
        lastActivityTime: lastActivityTime || loginTime,
        rememberMe: storedSession?.rememberMe || false,
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      setUserRoleState(user.role);
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsSessionExpired(false);
    }
  }, [user, loginTime, lastActivityTime, storedSession?.rememberMe]);

  // Track user activity and handle session timeout
  const updateActivity = useCallback(() => {
    if (user && loginTime) {
      const now = Date.now();
      setLastActivityTime(now);
      
      const timeSinceLogin = now - loginTime;
      if (timeSinceLogin > SESSION_TIMEOUT) {
        setIsSessionExpired(true);
        setUser(null);
      }
    }
  }, [user, loginTime]);

  // Attach activity listeners
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [updateActivity]);

  // Check session timeout periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (user && loginTime && lastActivityTime) {
        const now = Date.now();
        if (now - lastActivityTime > SESSION_TIMEOUT) {
          setIsSessionExpired(true);
          setUser(null);
        }
      }
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [user, loginTime, lastActivityTime]);

  const login = async (email: string, password: string, rememberMe = false): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );
    if (found) {
      const newUser: User = {
        email: found.email,
        name: found.name,
        role: found.role,
        id: found.id,
        avatar: found.avatar,
      };
      setUser(newUser);
      setLoginTime(Date.now());
      setLastActivityTime(Date.now());
      setIsSessionExpired(false);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    setLoginTime(null);
    setLastActivityTime(null);
    setSelectedFunds([]);
    setUserRoleState('User');
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (user) {
      setUser((prev) => (prev ? { ...prev, role } : null));
    }
  };

  const toggleFundSelection = (fundId: string) => {
    setSelectedFunds((prev) =>
      prev.includes(fundId) ? prev.filter((id) => id !== fundId) : [...prev, fundId]
    );
  };

  const clearSelectedFunds = () => setSelectedFunds([]);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        userRole,
        setUserRole,
        selectedFunds,
        toggleFundSelection,
        clearSelectedFunds,
        loginTime,
        lastActivityTime,
        isSessionExpired,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
