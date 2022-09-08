export interface ICategory {
  updatedAt: string;
  createdAt: string;
  id: number;
  name: string;
  description: string;
}

export interface ICategoryCreate {
  name: string;
  description: string;
}
