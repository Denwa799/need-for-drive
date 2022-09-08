export interface IAppMap {
  points: {
    address?: string;
    cityId?: {
      id: number;
      name: string;
    };
    id?: number;
    name?: string;
    coordinate?: number[];
  }[];
  debouncedCityValue: string;
  debouncedPointValue: string;
  setActivePointAddress: (value: string) => void;
  setActivePointId: (value: number) => void;
  setActivePointCity: (value: string) => void;
  setActiveCityId: (value: number) => void;
  setCityValue: (value: string) => void;
  setPointValue: (value: string) => void;
  clearFormModel: () => void;
  clearFormAdditionally: () => void;
  setMaxStage: (value: number) => void;
}

export type PlacemarkClickHandlerType = (
  address: string,
  city: string,
  cord: number[],
  cityId: number,
  pointId: number
) => void;
