import axios, { AxiosResponse } from 'axios';

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
