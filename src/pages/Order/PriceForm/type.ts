export interface IPriceForm {
  maxStage: number;
  address: string;
  locationButtonHandler: () => void;
  modelButtonHandler: () => void;
  additionallyButtonHandler: () => void;
  modelName: string;
  priceMin: number;
  priceMax: number;
  setModalActive: (value: boolean) => void;
}
