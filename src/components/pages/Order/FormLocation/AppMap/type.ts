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
  setActivePointAddress: (value: string) => void;
  setActivePointCity: (value: string) => void;
}
