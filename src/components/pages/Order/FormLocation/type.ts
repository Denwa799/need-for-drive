export interface IFormLocation {
  optionsCity: {
    value: string;
  }[];
  optionsName: {
    value: string;
  }[];
  cityValue: string;
  setCityValue: (value: string) => void;
  pointValue: string;
  setPointValue: (value: string) => void;
  points: {
    address?: string;
    cityId?: {
      id: string;
      name: string;
    };
    id?: string;
    name?: string;
  }[];
  setActivePointAddress: (value: string) => void;
  setActivePointCity: (value: string) => void;
}
