import axios, { AxiosResponse } from 'axios';
import { ICar } from 'models/ICar';

export default class CarsService {
  static async getCars(): Promise<any> {
    return axios.get<AxiosResponse<ICar[]>>(`${process.env.REACT_APP_CARS_API}`, {
      headers: {
        'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
      },
    });
  }
}
