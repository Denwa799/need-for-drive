import axios, { AxiosResponse } from 'axios';
import { ILoginResponse } from 'models/IAuth';

export const GetService = (
  api: string | undefined,
  tokenBearer: string | undefined = '',
  params = {}
) => {
  return axios.get(`${api}`, {
    headers: {
      'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
      Authorization: `Bearer ${tokenBearer}`,
    },
    params,
  });
};

export const PostService = <T>(
  api: string | undefined,
  data: T,
  tokenBearer: string | undefined = ''
) => {
  return axios.post<AxiosResponse>(`${api}`, data, {
    headers: {
      'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
      Authorization: `Bearer ${tokenBearer}`,
    },
  });
};

export const PutService = <T>(
  api: string | undefined,
  data: T,
  tokenBearer: string | undefined = ''
) => {
  return axios.put<AxiosResponse>(`${api}`, data, {
    headers: {
      'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
      Authorization: `Bearer ${tokenBearer}`,
    },
  });
};

export const DeleteService = <T>(api: string | undefined, tokenBearer: string | undefined = '') => {
  return axios.delete<AxiosResponse>(`${api}`, {
    headers: {
      'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
      Authorization: `Bearer ${tokenBearer}`,
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
