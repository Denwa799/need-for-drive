export interface IPriceForm {
  maxStage: number;
  city: string;
  address: string;
  locationButtonHandler?: () => void;
  modelButtonHandler?: () => void;
  additionallyButtonHandler?: () => void;
  modelName: string;
  priceMin: number;
  priceMax: number;
  priceFormTotalButtonHandler?: () => void;
  orderIsLoading?: boolean;
  orderError?: string;
  price: number;
  color: string;
  duration: string;
  rate: string;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}
