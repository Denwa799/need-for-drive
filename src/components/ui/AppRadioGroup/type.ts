import { RadioChangeEvent } from 'antd/lib/radio/interface';

export interface IAppRadioGroup {
  onChange: (event: RadioChangeEvent) => void;
  filterValue: string;
}
