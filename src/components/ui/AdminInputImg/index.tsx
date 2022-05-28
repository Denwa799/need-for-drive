import React, { FC, useCallback, useRef } from 'react';
import cn from 'classnames';
import { convertBase64 } from 'utils/base64';
import styles from './styles.module.less';
import { IAdminInputImg } from './type';

export const AdminInputImg: FC<IAdminInputImg> = ({
  imgName,
  setImgName,
  setImgSrc,
  className,
  setImgBase64,
  danger,
  setImgValidationError,
  setImgSize,
  setImgMimetype,
}) => {
  const imgRef = useRef<any>();

  const imgChangeHandler = useCallback(async () => {
    if (imgRef.current) {
      const img = imgRef.current.files[0];

      setImgName(img.name);
      if (setImgSrc) setImgSrc(URL.createObjectURL(img));
      if (setImgBase64) setImgBase64((await convertBase64(img)) as string);
      if (setImgSize) setImgSize(img.size);
      if (setImgMimetype) setImgMimetype(img.type);
      if (setImgValidationError) setImgValidationError(false);
    }
  }, []);

  return (
    <div className={cn(styles.AdminInputImg, className)}>
      <label htmlFor="imgInput" className={styles.imgInputLabel}>
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          className={styles.imgInput}
          name="imgInput"
          id="imgInput"
          ref={imgRef}
          onChange={imgChangeHandler}
        />
        <span className={cn(styles.imgInputText, { [styles.danger]: danger })}>
          {imgName || 'Выберите файл...'}
        </span>
        <span className={cn(styles.imgInputBtn, { [styles.danger]: danger })}>Обзор</span>
      </label>
    </div>
  );
};
