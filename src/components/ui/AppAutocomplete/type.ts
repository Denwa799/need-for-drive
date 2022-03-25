export interface IAppAutocomplete {
  options: {
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}