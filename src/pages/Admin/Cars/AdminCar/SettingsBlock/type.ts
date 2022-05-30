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
  imgBase64: string;
  imgSize: number;
  imgName: string;
  imgMimetype: string;
  setProgressPercent: (value: number) => void;
}
