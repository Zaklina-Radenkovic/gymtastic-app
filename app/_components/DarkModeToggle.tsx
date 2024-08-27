'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import ButtonIcon from './ButtonIcon';

import { useTheme } from '../_context/DarkModeContext';

const DarkModeToggle = () => {
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { theme, toggleTheme } = useTheme();

  return (
    <ButtonIcon onClick={toggleTheme}>
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6 text-indigo-600" />
      ) : (
        <MoonIcon className="h-6 w-6 text-indigo-600" />
      )}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
