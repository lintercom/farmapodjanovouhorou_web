import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Session timeout: 30 minut neaktivity (v milisekundách)
const SESSION_TIMEOUT = 30 * 60 * 1000;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityUpdateRef = useRef<number>(0);

  // Funkce pro kontrolu, zda session vypršela
  const checkSessionExpiry = () => {
    const lastActivity = localStorage.getItem('adminLastActivity');
    if (!lastActivity) return false;
    
    const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
    return timeSinceLastActivity > SESSION_TIMEOUT;
  };

  // Funkce pro aktualizaci času poslední aktivity
  const updateLastActivity = () => {
    localStorage.setItem('adminLastActivity', Date.now().toString());
    lastActivityUpdateRef.current = Date.now();
  };

  // Funkce pro resetování timeout časovače
  const resetLogoutTimer = () => {
    // Zrušíme předchozí časovač
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }

    // Aktualizujeme čas poslední aktivity pouze pokud uplynula alespoň 1 minuta
    const timeSinceLastUpdate = Date.now() - lastActivityUpdateRef.current;
    if (timeSinceLastUpdate >= 60000) { // 60 sekund
      updateLastActivity();
    }

    // Nastavíme nový časovač
    logoutTimerRef.current = setTimeout(() => {
      // Při automatickém odhlášení nastavíme flag
      localStorage.setItem('adminSessionExpired', 'true');
      logout();
    }, SESSION_TIMEOUT);
  };

  // Event handler pro sledování aktivity uživatele
  const handleUserActivity = () => {
    if (isAuthenticated) {
      resetLogoutTimer();
    }
  };

  useEffect(() => {
    // Kontrola, zda je uživatel přihlášený a zda session nevypršela
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      if (checkSessionExpiry()) {
        // Session vypršela, odhlásíme uživatele a nastavíme flag
        localStorage.setItem('adminSessionExpired', 'true');
        logout();
      } else {
        // Session je stále platná
        setIsAuthenticated(true);
        resetLogoutTimer();
      }
    }
  }, []);

  // Sledování aktivity uživatele
  useEffect(() => {
    if (isAuthenticated) {
      // Události pro sledování aktivity
      const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
      
      events.forEach(event => {
        window.addEventListener(event, handleUserActivity);
      });

      // Cleanup
      return () => {
        events.forEach(event => {
          window.removeEventListener(event, handleUserActivity);
        });
        if (logoutTimerRef.current) {
          clearTimeout(logoutTimerRef.current);
        }
      };
    }
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    // Simple prototype authentication
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      updateLastActivity();
      resetLogoutTimer();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLastActivity');
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}