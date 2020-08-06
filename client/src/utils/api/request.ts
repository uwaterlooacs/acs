import axios from 'axios';
import { Method } from 'types/network';

export const makeRequest = async <R, D = Record<string, unknown>>(
  method: Method,
  route: string,
  errorMessage: string,
  data?: D,
  token?: string,
): Promise<R> => {
  const options = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    switch (method) {
      case Method.GET:
        return (await (await axios.get(route, options)).data) as R;
      case Method.POST:
        return (await (await axios.post(route, data, options)).data) as R;
      case Method.PATCH:
        return (await (await axios.patch(route, data, options)).data) as R;
      case Method.DELETE:
        return (await (await axios.delete(route, options)).data) as R;
      default:
        return {} as R;
    }
  } catch (error) {
    throw new Error(errorMessage);
  }
};
