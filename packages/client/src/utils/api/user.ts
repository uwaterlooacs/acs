import { makeRequest } from 'utils/api/request';
import { AuthResponse } from 'types/network';
import { User, Credentials, UserData, SignUpUserData } from 'types/user';
import { Method } from 'types/network';
import { APIRoutes } from 'utils/api/endpoints';
import * as M from 'utils/api/errorMessages';

export const login = async (data: Credentials) => {
  return await makeRequest<AuthResponse, Credentials>(
    Method.POST,
    APIRoutes.USER,
    M.LOG_IN,
    data,
  );
};

export const signup = async (data: SignUpUserData) => {
  return await makeRequest<AuthResponse, SignUpUserData>(
    Method.POST,
    APIRoutes.USER + '/signup',
    M.SIGN_UP,
    data,
  );
};

export const thirdPartyAuth = async (data: UserData) => {
  return await makeRequest<AuthResponse, UserData>(
    Method.POST,
    APIRoutes.USER + '/thirdPartyAuth',
    M.THIRD_PARTY_AUTH,
    data,
  );
};

export const logout = async (token?: string) => {
  return await makeRequest(
    Method.POST,
    APIRoutes.USER + '/logout',
    M.LOGOUT,
    undefined,
    token,
  );
};

export const getUser = async (id: string, token?: string) => {
  return await makeRequest<User>(
    Method.GET,
    `${APIRoutes.USER}?id=${id}`,
    M.FETCH_USER,
    undefined,
    token,
  );
};

export const getUserByWatIAM = async (id: string, token?: string) => {
  return await makeRequest<User>(
    Method.GET,
    `${APIRoutes.USER}/watiam?id=${id}`,
    M.FETCH_USER,
    undefined,
    token,
  );
};

export const getMe = async (token?: string) => {
  return await makeRequest<User>(
    Method.GET,
    APIRoutes.USER + '/me',
    M.FETCH_USER,
    undefined,
    token,
  );
};

export const getAllUsers = async () => {
  return await makeRequest<User[]>(
    Method.GET,
    APIRoutes.USER + '/all',
    M.FETCH_USERS,
  );
};
