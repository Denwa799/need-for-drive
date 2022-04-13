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
  ratePrice: number;
  setRatePrice: (value: number) => void;
  isFullTank: boolean;
  setIsFullTank: (value: boolean) => void;
  isChildSeat: boolean;
  setIsChildSeat: (value: boolean) => void;
  isRightHandDrive: boolean;
  setIsRightHandDrive: (value: boolean) => void;
}
