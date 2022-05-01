import axios, { AxiosResponse } from 'axios';

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

export const PostService = <T>(api: string | undefined, data: T) => {
  return axios.post<AxiosResponse>(`${api}`, data, {
    headers: {
      'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
    },
  });
};
