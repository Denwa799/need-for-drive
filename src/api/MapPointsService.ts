import axios, { AxiosResponse } from 'axios';
import { IMapPoint } from '../models/IMapPoint';

export default class MapPointsService {
  static async getPoints(): Promise<any> {
    return axios.get<AxiosResponse<IMapPoint[]>>(`${process.env.REACT_APP_MAP_POINTS_API}`, {
      headers: {
        'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
      },
    });
  }
}
