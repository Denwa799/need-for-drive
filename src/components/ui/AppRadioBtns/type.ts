import { RadioChangeEvent } from 'antd/lib/radio/interface';

export interface IAppRadioBtns {
  onChange: (event: RadioChangeEvent) => void;
  filterValue: string;
}
