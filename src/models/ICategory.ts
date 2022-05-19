export interface ICategory {
  updatedAt: number;
  createdAt: number;
  id: string;
  name: string;
  description: string;
}

export interface ICategoryCreate {
  name: string;
  description: string;
}
