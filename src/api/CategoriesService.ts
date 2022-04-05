import axios, { AxiosResponse } from 'axios';
import { ICategory } from 'models/ICategory';

export default class CategoriesService {
  static async getCategories(): Promise<any> {
    return axios.get<AxiosResponse<ICategory[]>>(`${process.env.REACT_APP_CATEGORY_API}`, {
      headers: {
        'X-Api-Factory-Application-Id': `${process.env.REACT_APP_API_ID}`,
      },
    });
  }
}
