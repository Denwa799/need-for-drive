import { Moment } from 'moment';

export interface IAdminDatePicker {
  placeholder?: string;
  className?: string;
  disabledDate?: (currentDate: Moment) => boolean;
  defaultValue?: Moment;
  value?: Moment;
  onChange?: (date: Moment | null) => void;
  isDanger?: boolean;
}
