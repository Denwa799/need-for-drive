export interface IPoints {
  points: {
    address?: string;
    cityId?: {
      id: string;
      name: string;
    };
    id?: string;
    name?: string;
    coordinate?: number[];
  }[];
  setActivePoint: (value: string) => void;
}
