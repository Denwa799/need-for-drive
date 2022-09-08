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
      id: number;
      name: string;
    };
    id?: number;
    name?: string;
  }[];
  setActivePointAddress: (value: string) => void;
  setActivePointId: (value: number) => void;
  setActivePointCity: (value: string) => void;
  setActiveCityId: (value: number) => void;
  clearFormModel: () => void;
  clearFormAdditionally: () => void;
  setMaxStage: (value: number) => void;
}
