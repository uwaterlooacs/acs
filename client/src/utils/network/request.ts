import axios from 'axios';
import { Method } from 'types/network';

const DEV_URL = 'http://localhost:5000';

export const getUrl = (urlExt: string) => {
  const { NODE_ENV, REACT_APP_PROD_URL } = process.env;
  const baseUrl =
    NODE_ENV === 'production' && REACT_APP_PROD_URL
      ? REACT_APP_PROD_URL
      : DEV_URL;
  return baseUrl + urlExt;
};

export const makeRequest = async <R, D = Record<string, unknown>>(
  method: Method,
  urlExt: string,
  errorMessage: string,
  data?: D,
  token?: string,
): Promise<R> => {
  const url = getUrl(urlExt);
  const options = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    switch (method) {
      case Method.GET:
        return (await (await axios.get(url, options)).data) as R;
      case Method.POST:
        return (await (await axios.post(url, data, options)).data) as R;
      case Method.PATCH:
        return (await (await axios.patch(url, data, options)).data) as R;
      case Method.DELETE:
        return (await (await axios.delete(url, options)).data) as R;
      default:
        return {} as R;
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};
