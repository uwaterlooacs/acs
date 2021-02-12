import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeContext } from 'context/theme/state';
import LightTheme from 'theme/themes/light';
import DarkTheme from 'theme/themes/dark';

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme.name === LightTheme.name ? DarkTheme : LightTheme);
  };

  return (
    <IconButton onClick={toggleTheme}>
      <Brightness4Icon />
    </IconButton>
  );
};

export default ThemeToggleButton;
