import React, { useReducer } from 'react';
import { ThemeContext, initialState } from './state';
import { NamedTheme } from 'types/theme';
import Reducer from './reducer';
import ActionTypes from './actions';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setTheme = (theme: NamedTheme) => {
    localStorage.setItem('theme', theme.name);
    dispatch({ type: ActionTypes.SET_THEME, payload: theme });
  };

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Provider;
