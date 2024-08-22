'use client';

import ButtonIcon from './ButtonIcon';
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { useDarkMode } from '../_context/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-indigo-600" />
      ) : (
        <MoonIcon className="h-6 w-6 text-indigo-600" />
      )}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
