import React, { useReducer } from 'react';
import { User } from 'types/user';
import { UserContext, initialState } from './state';
import Reducer from './reducer';
import ActionTypes from './actions';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Provider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(Reducer, initialState);

  const setUser = (user: User) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  }

  const unsetUser = () => {
    dispatch({ type: ActionTypes.UNSET_USER });
  }

  const setToken = (token: string) => {
    dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
  }

  const unsetToken = () => {
    dispatch({ type: ActionTypes.UNSET_TOKEN });
  }

  return (
    <UserContext.Provider value={{
      ...state,
      setUser,
      unsetUser,
      setToken,
      unsetToken
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default Provider;
