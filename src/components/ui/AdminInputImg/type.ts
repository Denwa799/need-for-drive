export interface IAdminInputImg {
  imgName: string;
  setImgName: (value: string) => void;
  setImgSrc?: (value: string) => void;
  setImgBase64?: (value: string) => void;
  setImgSize?: (value: number) => void;
  setImgMimetype?: (value: string) => void;
  className?: string;
  danger?: boolean;
  setImgValidationError?: (value: boolean) => void;
}
