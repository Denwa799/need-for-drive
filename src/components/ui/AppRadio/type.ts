import { RadioChangeEvent } from 'antd/lib/radio/interface';

export interface IAppRadio {
  onChange: (event: RadioChangeEvent) => void;
  filterValue: string;
}
