export interface IAdminInputImg {
  imgName: string;
  setImgName: (value: string) => void;
  setImgSrc?: (value: string) => void;
  setImgBase64?: (value: string) => void;
  setImgFile?: (file: File) => void;
  className?: string;
  danger?: boolean;
  setImgValidationError?: (value: boolean) => void;
}
