export interface ISettingsBlock {
  setImgValidationError: (value: boolean) => void;
  carNameValue: string;
  carTypeValue: string;
  setDescriptionValue: (value: string) => void;
  descriptionValue: string;
  setCarNameValue: (value: string) => void;
  setCarTypeValue: (value: string) => void;
  setCarTypeSelectValue: (value: string) => void;
  carTypeSelectValue: string;
  imgFile: File | undefined;
  imgBase64: string;
  imgName: string;
  setProgressPercent: (value: number) => void;
}
