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
  cityValue: string;
  pointValue: string;
  setActivePointAddress: (value: string) => void;
  setActivePointCity: (value: string) => void;
  setCityValue: (value: string) => void;
  setPointValue: (value: string) => void;
}

export type PlacemarkClickHandlerType = (address: string, city: string, cord: number[]) => void;
