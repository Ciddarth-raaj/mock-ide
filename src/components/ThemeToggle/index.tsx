import React, { useContext } from 'react';

import styles from './styles.module.css';
import { ThemeContextType } from '../../types/context';
import { ThemeContext } from '../../context/ThemeContext';

function ThemeToggle() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext) as ThemeContextType;

  const handleToggleTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  return (
    <div className={styles.toggleContainer}>
      <p
        className={`${isDarkMode ? styles.selected : ''}`}
        onClick={() => handleToggleTheme(true)}
        style={{ borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' }}
      >
        Dark Mode
      </p>
      <p
        className={`${!isDarkMode ? styles.selected : ''}`}
        onClick={() => handleToggleTheme(false)}
        style={{ borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }}
      >
        Light Mode
      </p>
    </div>
  );
}

export default ThemeToggle;
