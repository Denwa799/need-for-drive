export interface IAppMap {
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
  debouncedCityValue: string;
  debouncedPointValue: string;
  setActivePointAddress: (value: string) => void;
  setActivePointId: (value: string) => void;
  setActivePointCity: (value: string) => void;
  setActiveCityId: (value: string) => void;
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
  cityId: string,
  pointId: string
) => void;
