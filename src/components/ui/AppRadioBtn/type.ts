import { RadioChangeEvent } from 'antd/lib/radio/interface';

export interface IAppRadioBtn {
  buttons: {
    id: string;
    name: string;
  }[];
  onChange: (event: RadioChangeEvent) => void;
  filterValue: string;
  allIsActive: boolean;
  btnAllText?: string;
}
