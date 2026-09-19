import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ThemeMode = 'dark' | 'light';

type ThemeContextValue = {
  mode: ThemeMode;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = '@traffic-bridge/theme-mode';
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((savedMode) => {
        if (
          active &&
          (savedMode === 'dark' || savedMode === 'light')
        ) {
          setMode(savedMode);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setHydrated(true);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(THEME_STORAGE_KEY, mode).catch(() => undefined);
  }, [hydrated, mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme: () => setMode((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
}