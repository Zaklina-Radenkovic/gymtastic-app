'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorageState } from '../_hooks/useLocalStorageState';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: true,
  toggleDarkMode: () => {},
});

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme:dark)').matches,
    'isDarkMode',
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark: boolean) => !isDark);
  }

  if (!mounted) {
    return null;
  }
  // const [theme, setTheme] = useState('light');
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsClient(true);
  //     const savedTheme = localStorage.getItem('theme') || 'light';
  //     setTheme(savedTheme);
  //     document.documentElement.classList.add(savedTheme);
  //   }
  // }, []);

  //function toggleDarkMode() {
  //setIsDarkMode((isDark) => !isDark);
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  //   if (isClient) {
  //     document.documentElement.classList.remove(theme);
  //     document.documentElement.classList.add(newTheme);
  //     localStorage.setItem('theme', newTheme);
  //   }
  //}

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { DarkModeProvider, useDarkMode };
