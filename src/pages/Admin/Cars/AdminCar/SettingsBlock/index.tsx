import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AdminBackground } from 'components/ui/AdminBackground';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Col, Modal, Row } from 'antd';
import cn from 'classnames';
import { AdminText } from 'components/ui/AdminText';
import { AdminInput } from 'components/ui/AdminInput';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import { AdminBtn } from 'components/ui/AdminBtn';
import { DangerText } from 'components/ui/DangerText';
import { AdminMiniItemGrid } from 'components/ui/AdminMiniItemGrid';
import { AdminInputNumber } from 'components/ui/AdminInputNumber';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector, categoriesSelector } from 'store/selectors/selectors';
import { onlyLettersReg } from 'utils/regularExpressions';
import { useCookies } from 'react-cookie';
import { useActions } from 'hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { ISettingsBlock } from './type';

const { confirm } = Modal;

export const SettingsBlock: FC<ISettingsBlock> = ({
  setImgValidationError,
  carNameValue,
  carTypeValue,
  setDescriptionValue,
  descriptionValue,
  setCarNameValue,
  setCarTypeValue,
  setCarTypeSelectValue,
  carTypeSelectValue,
  imgBase64,
  imgSize,
  imgName,
  imgMimetype,
  setProgressPercent,
}) => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const navigate = useNavigate();
  const { id } = useParams();

  const { car, carIsCreate, carCreateIsLoading, carIsDelete, carDeleteIsLoading } =
    useTypedSelector(carsSelector);
  const { categories, categoriesIsLoading } = useTypedSelector(categoriesSelector);

  const [carNameValidationError, setCarNameValidationError] = useState(false);
  const [carNameErrorText, setCarNameErrorText] = useState('Пустое поле');

  const [carTypeValidationError, setCarTypeValidationError] = useState(false);
  const [carTypeErrorText, setCarTypeErrorText] = useState('Тип автомобиля не выбран');

  const [colors, setColors] = useState<string[]>([]);
  const [colorValue, setColorValue] = useState('');
  const [colorValidationError, setColorValidationError] = useState(false);
  const [colorErrorText, setColorErrorText] = useState('');

  const [descriptionValidationError, setDescriptionValidationError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState('Пустое поле');

  const [numberValue, setNumberValue] = useState('');
  const [numberValidationError, setNumberValidationError] = useState(false);
  const [numberErrorText, setNumberErrorText] = useState('Пустое поле');

  const [tankValue, setTankValue] = useState(100);
  const [tankValidationError, setTankValidationError] = useState(false);
  const [tankErrorText, setTankErrorText] = useState('Пустое поле');

  const [minPriceValue, setMinPriceValue] = useState(1000);
  const [minPriceValidationError, setMinPriceValidationError] = useState(false);
  const [minPriceErrorText, setMinPriceErrorText] = useState('Пустое поле');

  const [maxPriceValue, setMaxPriceValue] = useState(10000);
  const [maxPriceValidationError, setMaxPriceValidationError] = useState(false);
  const [maxPriceErrorText, setMaxPriceErrorText] = useState('Пустое поле');

  const { createCar, updateCar, deleteCar, setCarIsCreate, setCarIsDelete } = useActions();

  useEffect(() => {
    if (Object.keys(car).length > 0 && id) {
      if (car.description) setDescriptionValue(car.description);
      if (car.colors) setColors(car.colors);
      if (car.number) setNumberValue(car.number);
      if (car.tank) setTankValue(car.tank);
      if (car.priceMin) setMinPriceValue(car.priceMin);
      if (car.priceMax) setMaxPriceValue(car.priceMax);
    }
  }, [car]);

  useEffect(() => {
    let percent = 0;
    const maxPercent = 100;
    const fieldsNumber = 9;

    if (imgBase64) percent += Math.ceil(maxPercent / fieldsNumber);
    if (carNameValue) percent += Math.round(maxPercent / fieldsNumber);
    if (carTypeSelectValue) percent += Math.round(maxPercent / fieldsNumber);
    if (colors.length > 0) percent += Math.round(maxPercent / fieldsNumber);
    if (descriptionValue) percent += Math.round(maxPercent / fieldsNumber);
    if (numberValue) percent += Math.round(maxPercent / fieldsNumber);
    if (tankValue) percent += Math.round(maxPercent / fieldsNumber);
    if (minPriceValue) percent += Math.round(maxPercent / fieldsNumber);
    if (maxPriceValue) percent += Math.round(maxPercent / fieldsNumber);

    setProgressPercent(percent);
  }, [
    carNameValue,
    imgBase64,
    carTypeSelectValue,
    colors,
    descriptionValue,
    numberValue,
    tankValue,
    minPriceValue,
    maxPriceValue,
  ]);

  useEffect(() => {
    if (carIsCreate)
      setTimeout(() => {
        setCarIsCreate(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CARS_LIST}`);
      }, 3000);
    if (carIsDelete)
      setTimeout(() => {
        setCarIsDelete(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CARS_LIST}`);
      }, 3000);
  }, [carIsCreate, carIsDelete]);

  // Создаю массив для поля фильтрации
  const categoriesName = useMemo(
    () => categories.map((item) => (item.name ? item.name : '')),
    [categories]
  );

  // Удаляю все дубли и null из массива
  const cleanCategoriesName = useMemo(
    () =>
      categoriesName.filter(
        (item, index) => categoriesName.indexOf(item) === index && item !== null && item !== ''
      ),
    [categoriesName]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCategoriesName = useMemo(() => {
    return cleanCategoriesName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanCategoriesName]);

  const selectCategories = useMemo(() => {
    return categories.find((item) => item.name === carTypeSelectValue);
  }, [carTypeSelectValue]);

  const carNameValueHandler = useCallback(
    (event) => {
      setCarNameValidationError(false);
      setCarNameValue(event.target.value);
    },
    [carNameValue]
  );

  const carTypeHandler = useCallback(
    (value) => {
      setCarTypeValue(value);
    },
    [carTypeValue]
  );

  const carTypeSelectHandler = useCallback(
    (value) => {
      setCarTypeValidationError(false);
      setCarTypeSelectValue(value);
    },
    [carTypeSelectValue]
  );

  const descriptionHandler = useCallback(
    (event) => {
      setDescriptionValidationError(false);
      setDescriptionValue(event.target.value);
    },
    [descriptionValue]
  );

  const colorValueHandler = useCallback(
    (event) => {
      setColorValidationError(false);
      setColorValue(event.target.value);
    },
    [colorValue]
  );

  const deleteColorHandler = useCallback(
    (index: number) => {
      const newColors = [...colors];
      newColors.splice(index, 1);
      setColors(newColors);
    },
    [colors]
  );

  const addColorHandler = useCallback(() => {
    const validation = colorValue.match(onlyLettersReg);
    const duplicate = colors.find((item) => item === colorValue);

    if (!colorValue) {
      setColorValidationError(true);
      setColorErrorText('Поле пустое');
    } else if (validation === null) {
      setColorValidationError(true);
      setColorErrorText('Разрешены только буквы');
    } else if (duplicate) {
      setColorValidationError(true);
      setColorErrorText('Такой цвет уже есть');
    } else {
      setColors((oldColors: string[]) => [...oldColors, colorValue]);
      setColorValue('');
    }
  }, [colors, colorValue]);

  const numberHandler = useCallback(
    (event) => {
      setNumberValidationError(false);
      setNumberValue(event.target.value);
    },
    [numberValue]
  );

  const tankHandler = useCallback(
    (value) => {
      setTankValidationError(false);
      setTankValue(value);
    },
    [tankValue]
  );
  const minPriceHandler = useCallback(
    (value) => {
      setMinPriceValidationError(false);
      setMinPriceValue(value);
    },
    [minPriceValue]
  );
  const maxPriceHandler = useCallback(
    (value) => {
      setMaxPriceValidationError(false);
      setMaxPriceValue(value);
    },
    [maxPriceValue]
  );

  const postData = useMemo(() => {
    if (
      carNameValue &&
      imgBase64 &&
      imgName &&
      descriptionValue &&
      selectCategories &&
      colors.length > 0 &&
      tankValue &&
      numberValue &&
      minPriceValue &&
      maxPriceValue
    )
      return {
        name: carNameValue,
        thumbnail: {
          path: imgBase64,
          size: imgSize,
          originalname: imgName,
          mimetype: imgMimetype,
        },
        description: descriptionValue,
        categoryId: selectCategories.id,
        colors,
        tank: tankValue,
        number: numberValue,
        priceMin: minPriceValue,
        priceMax: maxPriceValue,
      };
    return null;
  }, [
    carNameValue,
    imgBase64,
    descriptionValue,
    selectCategories,
    colors,
    tankValue,
    numberValue,
    minPriceValue,
    maxPriceValue,
  ]);

  const saveBtnHandler = useCallback(() => {
    if (!imgBase64) setImgValidationError(true);
    if (!carNameValue) setCarNameValidationError(true);
    if (!carTypeSelectValue) setCarTypeValidationError(true);
    if (colors.length === 0) {
      setColorValidationError(true);
      setColorErrorText('Цвет не добавлен');
    }
    if (!descriptionValue) setDescriptionValidationError(true);
    if (!numberValue) setNumberValidationError(true);
    if (!tankValue) setTankValidationError(true);
    if (!minPriceValue) setMinPriceValidationError(true);
    if (!maxPriceValue) setMaxPriceValidationError(true);

    if (postData && !id) createCar(postData, tokenBearer);
    if (postData && id) updateCar(id, postData, tokenBearer);
  }, [
    postData,
    imgBase64,
    carNameValue,
    carTypeSelectValue,
    colors,
    descriptionValue,
    numberValue,
    tankValue,
    minPriceValue,
    maxPriceValue,
  ]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CARS_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить машину?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deleteCar(id, tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col xxl={18} xl={16} lg={14} md={12} sm={24} xs={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки автомобиля</AdminTitle>
        <Row className={styles.specifications}>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.item, styles.leftBlock)}
          >
            <AdminText>Модель автомобиля</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={carNameValueHandler}
                value={carNameValue}
                placeholder="Введите модель автомобиля"
                maxLength={50}
                danger={carNameValidationError}
              />
              {carNameValidationError ? <DangerText>{carNameErrorText}</DangerText> : null}
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Тип автомобиля</AdminText>
            <AdminAutocomplete
              options={optionsCategoriesName}
              value={carTypeValue}
              onChange={carTypeHandler}
              placeholder="Выберите тип автомобиля"
              className={styles.inputContainer}
              onSelect={carTypeSelectHandler}
              isLoading={categoriesIsLoading}
              type="second"
              danger={carTypeValidationError}
            />
            {carTypeValidationError ? <DangerText>{carTypeErrorText}</DangerText> : null}
          </Col>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.item, styles.leftBlock)}
          >
            <AdminText>Цвет автомобиля</AdminText>
            <div className={cn(styles.inputContainer, styles.flex)}>
              <AdminInput
                onChange={colorValueHandler}
                value={colorValue}
                placeholder="Введите цвет автомобиля"
                danger={colorValidationError}
              />
              <AdminBtn onClick={addColorHandler} className={styles.buttonAdd} type="add">
                +
              </AdminBtn>
            </div>
            {colorValidationError ? <DangerText>{colorErrorText}</DangerText> : null}
            {colors ? (
              <AdminMiniItemGrid array={colors} deleteHandler={deleteColorHandler} />
            ) : null}
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Описание автомобиля</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={descriptionHandler}
                value={descriptionValue}
                placeholder="Введите описание автомобиля"
                maxLength={310}
                danger={descriptionValidationError}
              />
              {descriptionValidationError ? <DangerText>{descriptionErrorText}</DangerText> : null}
            </div>
          </Col>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.item, styles.leftBlock)}
          >
            <AdminText>Номер автомобиля</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={numberHandler}
                value={numberValue}
                placeholder="Введите номер автомобиля"
                danger={numberValidationError}
              />
              {numberValidationError ? <DangerText>{numberErrorText}</DangerText> : null}
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Количество бензина (%)</AdminText>
            <div className={styles.inputContainer}>
              <AdminInputNumber
                min={1}
                max={100}
                value={tankValue}
                onChange={tankHandler}
                danger={tankValidationError}
              />
              {tankValidationError ? <DangerText>{tankErrorText}</DangerText> : null}
            </div>
          </Col>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.item, styles.leftBlock)}
          >
            <AdminText>Минимальная цена</AdminText>
            <div className={styles.inputContainer}>
              <AdminInputNumber
                min={1}
                value={minPriceValue}
                onChange={minPriceHandler}
                danger={minPriceValidationError}
              />
              {minPriceValidationError ? <DangerText>{minPriceErrorText}</DangerText> : null}
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Максимальная цена</AdminText>
            <div className={styles.inputContainer}>
              <AdminInputNumber
                min={1}
                value={maxPriceValue}
                onChange={maxPriceHandler}
                danger={maxPriceValidationError}
              />
              {maxPriceValidationError ? <DangerText>{maxPriceErrorText}</DangerText> : null}
            </div>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={carCreateIsLoading}
            disabled={carIsCreate || carIsDelete}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={carIsCreate || carIsDelete}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={carDeleteIsLoading}
              disabled={carIsCreate || carIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
