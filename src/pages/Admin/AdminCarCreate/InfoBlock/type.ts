export interface IInfoBlock {
  imgSrc: string;
  imgName: string;
  carNameValue: string;
  carTypeSelectValue: string;
  descriptionValue: string;
  setImgName: (value: string) => void;
  setImgSrc: (value: string) => void;
  setImgFile: (file: File) => void;
  setImgBase64: (value: string) => void;
  imgValidationError: boolean;
  imgErrorText: string;
  setImgValidationError: (value: boolean) => void;
  progressPercent: number;
}
