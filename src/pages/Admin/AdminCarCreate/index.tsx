import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector, categoriesSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import styles from './styles.module.less';
import { InfoBlock } from './InfoBlock';
import { SettingsBlock } from './SettingsBlock';

export const AdminCarCreate = () => {
  const { carIsCreate, carCreateError } = useTypedSelector(carsSelector);
  const { categoriesIsLoading } = useTypedSelector(categoriesSelector);

  const [imgName, setImgName] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [imgFile, setImgFile] = useState<File>();
  const [imgBase64, setImgBase64] = useState('');
  const [imgValidationError, setImgValidationError] = useState(false);
  const [imgErrorText, setImgErrorText] = useState('Изображение не выбрано');

  const [carNameValue, setCarNameValue] = useState('');

  const [carTypeValue, setCarTypeValue] = useState('');
  const [carTypeSelectValue, setCarTypeSelectValue] = useState('');

  const [progressPercent, setProgressPercent] = useState(0);

  const [descriptionValue, setDescriptionValue] = useState('');

  const { fetchCategories, setCarIsCreate, setCarCreateError } = useActions();

  useEffect(() => {
    setCarIsCreate(false);
    setCarCreateError('');
    if (!categoriesIsLoading) fetchCategories();
  }, []);

  useEffect(() => {
    if (!carTypeValue) setCarTypeSelectValue('');
  }, [carTypeValue]);

  return (
    <div className={styles.AdminCarCreate}>
      {carIsCreate ? (
        <AdminSuccessMsg type="success">Успех! Машина сохранена</AdminSuccessMsg>
      ) : null}
      {carCreateError && progressPercent === 100 ? (
        <AdminSuccessMsg type="error">{carCreateError}</AdminSuccessMsg>
      ) : null}
      <AdminContainer>
        <AdminTitle>Добавить автомобиль</AdminTitle>
        <Row>
          <InfoBlock
            imgName={imgName}
            carNameValue={carNameValue}
            carTypeSelectValue={carTypeSelectValue}
            descriptionValue={descriptionValue}
            imgSrc={imgSrc}
            setImgName={setImgName}
            setImgSrc={setImgSrc}
            setImgFile={setImgFile}
            setImgBase64={setImgBase64}
            imgValidationError={imgValidationError}
            imgErrorText={imgErrorText}
            setImgValidationError={setImgValidationError}
            progressPercent={progressPercent}
          />
          <SettingsBlock
            carNameValue={carNameValue}
            carTypeValue={carTypeValue}
            setDescriptionValue={setDescriptionValue}
            descriptionValue={descriptionValue}
            setCarNameValue={setCarNameValue}
            setCarTypeValue={setCarTypeValue}
            setCarTypeSelectValue={setCarTypeSelectValue}
            carTypeSelectValue={carTypeSelectValue}
            imgFile={imgFile}
            imgBase64={imgBase64}
            imgName={imgName}
            setImgValidationError={setImgValidationError}
            setProgressPercent={setProgressPercent}
          />
        </Row>
      </AdminContainer>
    </div>
  );
};
