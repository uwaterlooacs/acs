import type { AuthPanelOption } from 'types/auth';

import React, { useReducer } from 'react';
import { AuthPanelContext, initialState } from './state';
import Reducer from './reducer';
import ActionTypes from './actions';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setIsOpen = (isOpen: boolean) => {
    dispatch({ type: ActionTypes.SET_IS_OPEN, payload: isOpen });
  };

  const setOption = (option: AuthPanelOption) => {
    dispatch({ type: ActionTypes.SET_OPTION, payload: option });
  };

  return (
    <AuthPanelContext.Provider
      value={{
        ...state,
        setIsOpen,
        setOption,
      }}
    >
      {children}
    </AuthPanelContext.Provider>
  );
};

export default Provider;
