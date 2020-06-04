import { createContext } from 'react';
import { NamedTheme } from 'types/theme';
import LightTheme from 'theme/themes/light';
import DarkTheme from 'theme/themes/dark';

export const initialState = {
  theme: (localStorage.getItem('theme') === 'dark' ? DarkTheme : LightTheme),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (theme: NamedTheme) => { },
};

export const ThemeContext = createContext(initialState);