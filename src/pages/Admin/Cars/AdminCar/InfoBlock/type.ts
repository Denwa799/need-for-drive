export interface IInfoBlock {
  imgSrc: string;
  imgName: string;
  carNameValue: string;
  carTypeSelectValue: string;
  descriptionValue: string;
  setImgName: (value: string) => void;
  setImgSrc: (value: string) => void;
  setImgBase64: (value: string) => void;
  setImgSize: (value: number) => void;
  imgValidationError: boolean;
  imgErrorText: string;
  setImgValidationError: (value: boolean) => void;
  progressPercent: number;
}
