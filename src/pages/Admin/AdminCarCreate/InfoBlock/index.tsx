import React, { FC, useState } from 'react';
import { AdminBackground } from 'components/ui/AdminBackground';
import noImage from 'assets/img/noImage.webp';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminText } from 'components/ui/AdminText';
import { AdminInputImg } from 'components/ui/AdminInputImg';
import { AdminProgressbar } from 'components/ui/AdminProgressbar';
import { Col } from 'antd';
import { DangerText } from 'components/ui/DangerText';
import styles from './styles.module.less';
import { IInfoBlock } from './type';

export const InfoBlock: FC<IInfoBlock> = ({
  imgSrc,
  imgName,
  carNameValue,
  carTypeSelectValue,
  setImgName,
  setImgSrc,
  descriptionValue,
  setImgFile,
  setImgBase64,
  imgValidationError,
  imgErrorText,
  setImgValidationError,
  progressPercent,
}) => {
  return (
    <Col xxl={6} xl={8} lg={10} md={12} sm={24} xs={24} className={styles.InfoBlock}>
      <AdminBackground className={styles.infoCard}>
        <img src={imgSrc || noImage} className={styles.img} alt={imgName} />
        {carNameValue ? (
          <AdminTitle level={4} className={styles.title}>
            {carNameValue}
          </AdminTitle>
        ) : null}
        {carTypeSelectValue ? (
          <AdminText type="subtitle" className={styles.subtitle}>
            {carTypeSelectValue}
          </AdminText>
        ) : null}
        <AdminInputImg
          className={styles.imgInputContainer}
          imgName={imgName}
          setImgName={setImgName}
          setImgSrc={setImgSrc}
          setImgFile={setImgFile}
          setImgBase64={setImgBase64}
          danger={imgValidationError}
          setImgValidationError={setImgValidationError}
        />
        {imgValidationError ? <DangerText>{imgErrorText}</DangerText> : null}
        <AdminProgressbar percent={progressPercent} className={styles.progressBlock} />
        <div className={styles.descriptionBlock}>
          <AdminText type="descriptionTitle" containerClassName={styles.descriptionTitle}>
            Описание
          </AdminText>
          {descriptionValue ? <AdminText type="description">{descriptionValue}</AdminText> : null}
        </div>
      </AdminBackground>
    </Col>
  );
};
