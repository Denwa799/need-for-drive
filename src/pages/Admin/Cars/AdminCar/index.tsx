import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector, categoriesSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import styles from './styles.module.less';
import { InfoBlock } from './InfoBlock';
import { SettingsBlock } from './SettingsBlock';

export const AdminCar = () => {
  const { id } = useParams();

  const {
    car,
    carIdIsLoading,
    carIdError,
    carIsCreate,
    carCreateError,
    carIsDelete,
    carDeleteError,
  } = useTypedSelector(carsSelector);
  const { categoriesIsLoading } = useTypedSelector(categoriesSelector);

  const [imgName, setImgName] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [imgBase64, setImgBase64] = useState('');
  const [imgSize, setImgSize] = useState(0);
  const [imgMimetype, setImgMimetype] = useState('');
  const [imgValidationError, setImgValidationError] = useState(false);
  const [imgErrorText, setImgErrorText] = useState('Изображение не выбрано');

  const [carNameValue, setCarNameValue] = useState('');

  const [carTypeValue, setCarTypeValue] = useState('');
  const [carTypeSelectValue, setCarTypeSelectValue] = useState('');

  const [progressPercent, setProgressPercent] = useState(0);

  const [descriptionValue, setDescriptionValue] = useState('');

  const {
    fetchCategories,
    setCarIsCreate,
    setCarCreateError,
    setCarIsDelete,
    setCarDeleteError,
    fetchCar,
    clearCar,
  } = useActions();

  useEffect(() => {
    if (!categoriesIsLoading) fetchCategories();

    return () => {
      clearCar();
      setCarIsCreate(false);
      setCarCreateError('');
      setCarIsDelete(false);
      setCarDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(car).length === 0) {
      fetchCar(id);
    }
  }, [id, car]);

  useEffect(() => {
    if (Object.keys(car).length > 0 && id) {
      if (car.thumbnail) {
        setImgSrc(car.thumbnail.path);
        setImgBase64(car.thumbnail.path);
        setImgName(car.thumbnail.originalname);
        setImgSize(car.thumbnail.size);
        setImgMimetype(car.thumbnail.mimetype);
      }
      if (car.name) setCarNameValue(car.name);
      if (car.categoryId) {
        setCarTypeValue(car.categoryId.name);
        setCarTypeSelectValue(car.categoryId.name);
      }
    }
  }, [car, id]);

  useEffect(() => {
    if (!carTypeValue) setCarTypeSelectValue('');
  }, [carTypeValue]);

  return (
    <div>
      {carIdIsLoading ? (
        <ErrorLoading loading={carIdIsLoading} error={carIdError} />
      ) : (
        <div className={styles.AdminCarCreate}>
          {carIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Машина сохранена</AdminSuccessMsg>
          ) : null}
          {carCreateError && progressPercent === 100 ? (
            <AdminSuccessMsg type="error">{carCreateError}</AdminSuccessMsg>
          ) : null}
          {carIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Машина удалена</AdminSuccessMsg>
          ) : null}
          {carDeleteError && progressPercent === 100 ? (
            <AdminSuccessMsg type="error">{carDeleteError}</AdminSuccessMsg>
          ) : null}
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить автомобиль</AdminTitle>
            ) : (
              <AdminTitle>Карточка автомобиля</AdminTitle>
            )}
            <Row>
              <InfoBlock
                imgName={imgName}
                carNameValue={carNameValue}
                carTypeSelectValue={carTypeSelectValue}
                descriptionValue={descriptionValue}
                imgSrc={imgSrc}
                setImgName={setImgName}
                setImgSrc={setImgSrc}
                setImgBase64={setImgBase64}
                setImgSize={setImgSize}
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
                imgBase64={imgBase64}
                imgSize={imgSize}
                imgName={imgName}
                imgMimetype={imgMimetype}
                setImgValidationError={setImgValidationError}
                setProgressPercent={setProgressPercent}
              />
            </Row>
          </AdminContainer>
        </div>
      )}
    </div>
  );
};
