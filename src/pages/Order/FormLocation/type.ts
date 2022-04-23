export interface IFormLocation {
  optionsCity: {
    value: string;
  }[];
  optionsName: {
    value: string;
  }[];
  cityValue: string;
  setCityValue: (value: string) => void;
  debouncedCityValue: string;
  pointValue: string;
  setPointValue: (value: string) => void;
  debouncedPointValue: string;
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
  clearFormModel: () => void;
  clearFormAdditionally: () => void;
  setMaxStage: (value: number) => void;
}
