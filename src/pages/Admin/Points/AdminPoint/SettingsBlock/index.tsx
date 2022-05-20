import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AdminBackground } from 'components/ui/AdminBackground';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Col, Modal, Row } from 'antd';
import cn from 'classnames';
import { AdminText } from 'components/ui/AdminText';
import { AdminInput } from 'components/ui/AdminInput';
import { AdminBtn } from 'components/ui/AdminBtn';
import { DangerText } from 'components/ui/DangerText';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { citySelector, mapPointsSelector } from 'store/selectors/selectors';
import { useCookies } from 'react-cookie';
import { useActions } from 'hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import styles from './styles.module.less';

const { confirm } = Modal;

export const SettingsBlock: FC = () => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const navigate = useNavigate();
  const { id } = useParams();

  const { pointId, pointIsCreate, pointIsDelete, pointCreateIsLoading, pointDeleteIsLoading } =
    useTypedSelector(mapPointsSelector);
  const { city, cityIsLoading } = useTypedSelector(citySelector);

  const [pointNameValue, setPointNameValue] = useState('');
  const [pointNameValidationError, setPointNameValidationError] = useState(false);
  const [pointNameErrorText, setPointNameErrorText] = useState('Пустое поле');

  const [cityNameValue, setCityNameValue] = useState('');
  const [cityNameSelectValue, setCityNameSelectValue] = useState('');
  const [cityNameValidationError, setCityNameValidationError] = useState(false);
  const [cityNameErrorText, setCityNameErrorText] = useState('Город не выбран');

  const [addressValue, setAddressValue] = useState('');
  const [addressValidationError, setAddressValidationError] = useState(false);
  const [addressErrorText, setAddressErrorText] = useState('Пустое поле');

  const { fetchCity, createPoint, updatePoint, deletePoint } = useActions();

  useEffect(() => {
    if (!cityIsLoading) fetchCity();
  }, []);

  useEffect(() => {
    if (!cityNameValue) {
      setCityNameSelectValue('');
    }
  }, [cityNameValue]);

  useEffect(() => {
    if (Object.keys(pointId).length > 0 && id) {
      if (pointId.name) setPointNameValue(pointId.name);
      if (pointId.cityId) {
        setCityNameValue(pointId.cityId.name);
        setCityNameSelectValue(pointId.cityId.name);
      }
      if (pointId.address) setAddressValue(pointId.address);
    }
  }, [pointId, id]);

  useEffect(() => {
    if (pointIsCreate)
      setTimeout(() => {
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_POINT_LIST}`);
      }, 3000);
    if (pointIsDelete)
      setTimeout(() => {
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_POINT_LIST}`);
      }, 3000);
  }, [pointIsCreate, pointIsDelete]);

  // Создаю массив для поля автозаполнения
  const citiesName = useMemo(() => city.map((item) => (item.name ? item.name : '')), [city]);

  // Удаляю все дубли и null из массива
  const cleanCitiesName = useMemo(
    () =>
      citiesName.filter(
        (item, index) => citiesName.indexOf(item) === index && item !== null && item !== ''
      ),
    [citiesName]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsCitiesName = useMemo(() => {
    return cleanCitiesName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanCitiesName]);

  const selectCity = useMemo(() => {
    return city.find((item) => item.name === cityNameSelectValue);
  }, [cityNameSelectValue]);

  const pointNameValueHandler = useCallback((event) => {
    setPointNameValidationError(false);
    setPointNameValue(event.target.value);
  }, []);

  const cityNameHandler = useCallback(
    (value) => {
      setCityNameValue(value);
    },
    [cityNameValue]
  );

  const cityNameSelectHandler = useCallback(
    (value) => {
      setCityNameValidationError(false);
      setCityNameSelectValue(value);
    },
    [cityNameSelectValue]
  );

  const addressValueHandler = useCallback((event) => {
    setAddressValidationError(false);
    setAddressValue(event.target.value);
  }, []);

  const postData = useMemo(() => {
    if (pointNameValue && selectCity && addressValue)
      return {
        name: pointNameValue,
        cityId: selectCity.id,
        address: addressValue,
      };
    return null;
  }, [pointNameValue, selectCity, addressValue]);

  const saveBtnHandler = useCallback(() => {
    if (!pointNameValue) setPointNameValidationError(true);
    if (!cityNameSelectValue) setCityNameValidationError(true);
    if (!addressValue) setAddressValidationError(true);

    if (postData && !id) createPoint(postData, tokenBearer);
    if (postData && id) updatePoint(id, postData, tokenBearer);
  }, [postData, pointNameValue, cityNameSelectValue, addressValue]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_POINT_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить пункт выдачи?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deletePoint(id, tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col span={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки пункта выдачи</AdminTitle>
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
            <AdminText>Название</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={pointNameValueHandler}
                value={pointNameValue}
                placeholder="Введите название пункта выдачи"
                danger={pointNameValidationError}
              />
              {pointNameValidationError ? <DangerText>{pointNameErrorText}</DangerText> : null}
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Город</AdminText>
            <AdminAutocomplete
              options={optionsCitiesName}
              value={cityNameValue}
              onChange={cityNameHandler}
              placeholder="Выберите город"
              className={styles.inputContainer}
              onSelect={cityNameSelectHandler}
              isLoading={cityIsLoading}
              type="second"
              danger={cityNameValidationError}
            />
            {cityNameValidationError ? <DangerText>{cityNameErrorText}</DangerText> : null}
          </Col>
          <Col span={24} className={cn(styles.item, styles.lastItem)}>
            <AdminText>Адрес</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={addressValueHandler}
                value={addressValue}
                placeholder="Введите адрес пункта выдачи"
                danger={addressValidationError}
              />
              {addressValidationError ? <DangerText>{addressErrorText}</DangerText> : null}
            </div>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={pointCreateIsLoading}
            disabled={pointIsCreate || pointIsDelete}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={pointIsCreate || pointIsDelete}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={pointDeleteIsLoading}
              disabled={pointIsCreate || pointIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
