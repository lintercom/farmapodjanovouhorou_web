import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from 'react';
import { supabaseBrowser } from '../utils/supabaseBrowserClient';
import { verifyCmsAdminPassword } from '../utils/api';
import { CMS_ADMIN_USERNAME } from '../utils/cmsCredentials';

export type LogoutReason = 'idle-timeout';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  /** Bez důvodu = ruční odhlášení (smaže příznak vypršení). `idle-timeout` zachová příznak pro zobrazení hlášky. */
  logout: (options?: { reason: LogoutReason }) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const SESSION_TIMEOUT = 30 * 60 * 1000;

const STORAGE_AUTH = 'adminAuth';
const STORAGE_PROVIDER = 'adminAuthProvider';
const PROVIDER_SUPABASE = 'supabase';
const PROVIDER_CMS = 'cms';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivityUpdateRef = useRef<number>(0);
  const logoutRef = useRef<(options?: { reason: LogoutReason }) => Promise<void>>(async () => {});

  const updateLastActivity = useCallback(() => {
    localStorage.setItem('adminLastActivity', Date.now().toString());
    lastActivityUpdateRef.current = Date.now();
  }, []);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const clearCmsSessionStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_AUTH);
    localStorage.removeItem(STORAGE_PROVIDER);
    localStorage.removeItem('adminLastActivity');
  }, []);

  const logout = useCallback(async (options?: { reason: LogoutReason }) => {
    const provider = localStorage.getItem(STORAGE_PROVIDER);
    if (provider === PROVIDER_SUPABASE) {
      await supabaseBrowser.auth.signOut();
    }
    if (options?.reason !== 'idle-timeout') {
      localStorage.removeItem('adminSessionExpired');
    }
    setIsAuthenticated(false);
    clearLogoutTimer();
    clearCmsSessionStorage();
  }, [clearLogoutTimer, clearCmsSessionStorage]);

  logoutRef.current = logout;

  const checkSessionExpiry = useCallback(() => {
    const lastActivity = localStorage.getItem('adminLastActivity');
    if (!lastActivity) return false;
    const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10);
    return timeSinceLastActivity > SESSION_TIMEOUT;
  }, []);

  const resetLogoutTimer = useCallback(() => {
    clearLogoutTimer();
    const timeSinceLastUpdate = Date.now() - lastActivityUpdateRef.current;
    if (timeSinceLastUpdate >= 60000) {
      updateLastActivity();
    }
    logoutTimerRef.current = setTimeout(() => {
      localStorage.setItem('adminSessionExpired', 'true');
      void logoutRef.current({ reason: 'idle-timeout' });
    }, SESSION_TIMEOUT);
  }, [clearLogoutTimer, updateLastActivity]);

  const handleUserActivity = useCallback(() => {
    if (isAuthenticated) {
      resetLogoutTimer();
    }
  }, [isAuthenticated, resetLogoutTimer]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const {
        data: { session },
      } = await supabaseBrowser.auth.getSession();
      if (cancelled) return;

      if (session) {
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_AUTH, 'true');
        localStorage.setItem(STORAGE_PROVIDER, PROVIDER_SUPABASE);
        resetLogoutTimer();
        return;
      }

      const auth = localStorage.getItem(STORAGE_AUTH);
      const provider = localStorage.getItem(STORAGE_PROVIDER);
      if (auth === 'true' && provider === PROVIDER_SUPABASE) {
        clearCmsSessionStorage();
        setIsAuthenticated(false);
        return;
      }

      if (auth === 'true' && provider !== PROVIDER_SUPABASE) {
        if (checkSessionExpiry()) {
          localStorage.setItem('adminSessionExpired', 'true');
          clearCmsSessionStorage();
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          resetLogoutTimer();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [checkSessionExpiry, clearCmsSessionStorage, resetLogoutTimer]);

  useEffect(() => {
    const {
      data: { subscription },
    } =     supabaseBrowser.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' && localStorage.getItem(STORAGE_PROVIDER) === PROVIDER_SUPABASE) {
        setIsAuthenticated(false);
        clearLogoutTimer();
        clearCmsSessionStorage();
      }
    });
    return () => subscription.unsubscribe();
  }, [clearCmsSessionStorage, clearLogoutTimer]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'] as const;
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearLogoutTimer();
    };
  }, [isAuthenticated, handleUserActivity, clearLogoutTimer]);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const u = username.trim();
      if (u.includes('@')) {
        const { error } = await supabaseBrowser.auth.signInWithPassword({ email: u, password });
        if (error) {
          return false;
        }
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_AUTH, 'true');
        localStorage.setItem(STORAGE_PROVIDER, PROVIDER_SUPABASE);
        updateLastActivity();
        resetLogoutTimer();
        return true;
      }
      if (u.toLowerCase() !== CMS_ADMIN_USERNAME.toLowerCase()) {
        return false;
      }
      try {
        await supabaseBrowser.auth.signOut();
      } catch {
        /* ignorovat — např. žádná aktivní session */
      }
      const ok = await verifyCmsAdminPassword(password);
      if (!ok) {
        return false;
      }
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_AUTH, 'true');
      localStorage.setItem(STORAGE_PROVIDER, PROVIDER_CMS);
      updateLastActivity();
      resetLogoutTimer();
      return true;
    },
    [resetLogoutTimer, updateLastActivity],
  );

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
