'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setThemeCookies } from '../_lib/actions';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light-mode',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme: string | undefined;
}

function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    initialTheme === 'light' ? 'light' : 'dark',
  );

  async function toggleTheme() {
    document.documentElement.dataset.theme = theme;

    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));

    await setThemeCookies(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
}

export { ThemeProvider, useTheme };
