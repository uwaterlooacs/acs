/* eslint-disable @typescript-eslint/no-unused-vars */
import { /*type*/ AuthPanelOption } from 'components/AuthPanel/types';
import { createContext } from 'react';
import { AUTH_PANEL_OPTIONS } from 'utils/constants';

export const initialState = {
  option: AUTH_PANEL_OPTIONS.LOGIN,
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
  setOption: (option: AuthPanelOption) => {},
};

export const AuthPanelContext = createContext(initialState);
