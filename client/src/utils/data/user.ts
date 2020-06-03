import { makeRequest } from 'utils/network/request';
import { AuthResponse } from 'types/network';
import { User, Credentials, UserData } from 'types/user';
import { Method } from 'types/network';
import { APIRoutes } from 'utils/network/endpoints';
import * as M from 'utils/network/errorMessages';

export const login = async (data: Credentials) => {
  return await makeRequest<AuthResponse, Credentials>(
    Method.POST,
    APIRoutes.USER,
    M.LOG_IN,
    data
  );
}

export const signup = async (data: UserData) => {
  return await makeRequest<AuthResponse, UserData>(
    Method.POST,
    APIRoutes.USER + '/signup',
    M.SIGN_UP,
    data
  );
}

export const thirdPartyAuth = async (data: UserData) => {
  return await makeRequest<AuthResponse, UserData>(
    Method.POST,
    APIRoutes.USER + '/thirdPartyAuth',
    M.THIRD_PARTY_AUTH,
    data
  );
}

export const logout = async (token: string) => {
  return await makeRequest(
    Method.POST,
    APIRoutes.USER + '/logout',
    M.LOGOUT,
    undefined,
    token
  );
}

export const getUser = async (token: string) => {
  return await makeRequest<User>(
    Method.GET,
    APIRoutes.USER + '/me',
    M.FETCH_USER,
    undefined,
    token
  );
}

export const getAllUsers = async () => {
  return await makeRequest<User[]>(
    Method.GET,
    APIRoutes.USER + '/all',
    M.FETCH_USERS
  );
}
