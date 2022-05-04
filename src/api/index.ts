import axios, { AxiosResponse } from 'axios';
import { ILoginResponse } from 'models/IAuth';

export const GetService = (api: string | undefined) => {
  return axios.get<AxiosResponse>(`${api}`, {
    headers: {
      'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
    },
  });
};

export const PostService = <T>(api: string | undefined, data: T) => {
  return axios.post<AxiosResponse>(`${api}`, data, {
    headers: {
      'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
    },
  });
};

export const AuthService = <T>(
  api: string | undefined,
  token: string,
  username: string,
  password: string
) => {
  return axios.post<ILoginResponse>(
    `${api}`,
    {
      username,
      password,
    },
    {
      headers: {
        'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
        Authorization: `Basic ${token}`,
      },
    }
  );
};

export const RefreshAuthService = <T>(
  api: string | undefined,
  token: string,
  refreshToken: string | null
) => {
  return axios.post<ILoginResponse>(
    `${api}`,
    {
      refresh_token: refreshToken,
    },
    {
      headers: {
        'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
        Authorization: `Basic ${token}`,
      },
    }
  );
};
