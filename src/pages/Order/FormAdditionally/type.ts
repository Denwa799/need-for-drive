import { Moment } from 'moment';

export interface IFormAdditionally {
  carColors: string[];
  color: string;
  setColor: (value: string) => void;
  startDate: Moment | undefined;
  setStartDate: (value: Moment) => void;
  endDate: Moment | undefined;
  setEndDate: (value: Moment | undefined) => void;
  rate: string;
  setRate: (value: string) => void;
  setRatePrice: (value: number) => void;
  setRateUnit: (value: string) => void;
  setRateId: (value: number) => void;
  isFullTank: boolean;
  setIsFullTank: (value: boolean) => void;
  isNeedChildChair: boolean;
  setIsNeedChildChair: (value: boolean) => void;
  isRightWheel: boolean;
  setIsRightWheel: (value: boolean) => void;
}
