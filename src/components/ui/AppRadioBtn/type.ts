import { RadioChangeEvent } from 'antd/lib/radio/interface';

export interface IAppRadioBtn {
  onChange: (event: RadioChangeEvent) => void;
  filterValue: string;
}
