import React, { useEffect, useReducer } from 'react';
import { User } from 'types/user';
import { UserContext, initialState } from './state';
import Reducer from './reducer';
import ActionTypes from './actions';
import { getMe } from 'utils/api/user';

const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setUser = (user: User) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  };

  const unsetUser = () => {
    dispatch({ type: ActionTypes.UNSET_USER });
  };

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
    dispatch({ type: ActionTypes.SET_TOKEN, payload: token });
  };

  const unsetToken = () => {
    dispatch({ type: ActionTypes.UNSET_TOKEN });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (state.token) {
        try {
          const user = await getMe(state.token);
          if (user._id !== state?.user?._id) {
            setUser(user);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    };
    fetchUser();
  }, [state]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        unsetUser,
        setToken,
        unsetToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
