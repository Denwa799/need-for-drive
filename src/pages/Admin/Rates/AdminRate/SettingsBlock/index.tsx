import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AdminBackground } from 'components/ui/AdminBackground';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Col, Modal, Row } from 'antd';
import cn from 'classnames';
import { AdminText } from 'components/ui/AdminText';
import { AdminBtn } from 'components/ui/AdminBtn';
import { DangerText } from 'components/ui/DangerText';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesSelector, ratesTypeSelector } from 'store/selectors/selectors';
import { useCookies } from 'react-cookie';
import { useActions } from 'hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { AdminInputNumber } from 'components/ui/AdminInputNumber';
import { AdminAutocomplete } from 'components/ui/AdminAutocomplete';
import styles from './styles.module.less';

const { confirm } = Modal;

export const SettingsBlock: FC = () => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const navigate = useNavigate();
  const { id } = useParams();

  const { rate, rateCreateIsLoading, rateIsCreate, rateIsDelete, rateDeleteIsLoading } =
    useTypedSelector(ratesSelector);
  const { allRateType, allRateTypeIsLoading } = useTypedSelector(ratesTypeSelector);

  const [rateTypeValue, setRateTypeValue] = useState('');
  const [rateTypeSelectValue, setRateTypeSelectValue] = useState('');
  const [rateTypeValidationError, setRateTypeValidationError] = useState(false);
  const [rateTypeErrorText, setRateTypeErrorText] = useState('Тип тарифа не выбран');

  const [priceValue, setPriceValue] = useState(1);
  const [priceValidationError, setPriceValidationError] = useState(false);
  const [priceErrorText, setPriceErrorText] = useState('Пустое поле');

  const { fetchRatesType, createRate, updateRate, deleteRate, setRateIsCreate, setRateIsDelete } =
    useActions();

  useEffect(() => {
    if (!allRateTypeIsLoading) fetchRatesType();
  }, []);

  useEffect(() => {
    if (!rateTypeValue) {
      setRateTypeSelectValue('');
    }
  }, [rateTypeValue]);

  useEffect(() => {
    if (Object.keys(rate).length > 0 && id) {
      if (rate.price) setPriceValue(rate.price);
      if (rate.rateTypeId) {
        setRateTypeValue(rate.rateTypeId.name);
        setRateTypeSelectValue(rate.rateTypeId.name);
      }
    }
  }, [rate]);

  useEffect(() => {
    if (rateIsCreate)
      setTimeout(() => {
        setRateIsCreate(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_LIST}`);
      }, 3000);
    if (rateIsDelete)
      setTimeout(() => {
        setRateIsDelete(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_LIST}`);
      }, 3000);
  }, [rateIsCreate, rateIsDelete]);

  // Создаю массив для поля автодополнения
  const ratesTypeName = useMemo(
    () => allRateType.map((item) => (item.name ? item.name : '')),
    [allRateType]
  );

  // Удаляю все дубли и null из массива
  const cleanRatesTypeName = useMemo(
    () =>
      ratesTypeName.filter(
        (item, index) => ratesTypeName.indexOf(item) === index && item !== null && item !== ''
      ),
    [ratesTypeName]
  );

  // Создаю массив объектов для передачи в поле options для компоненты autocomplete
  const optionsRatesTypeName = useMemo(() => {
    return cleanRatesTypeName.map((name: string) => {
      return {
        value: name,
      };
    });
  }, [cleanRatesTypeName]);

  const selectRatesType = useMemo(() => {
    return allRateType.find((item) => item.name === rateTypeSelectValue);
  }, [rateTypeSelectValue]);

  const rateTypeHandler = useCallback(
    (value) => {
      setRateTypeValue(value);
    },
    [rateTypeValue]
  );

  const rateTypeSelectHandler = useCallback(
    (value) => {
      setRateTypeValidationError(false);
      setRateTypeSelectValue(value);
    },
    [rateTypeSelectValue]
  );

  const priceValueHandler = useCallback((value) => {
    setPriceValidationError(false);
    setPriceValue(value);
  }, []);

  const postData = useMemo(() => {
    if (selectRatesType && priceValue)
      return {
        rateTypeId: selectRatesType.id,
        price: priceValue,
      };
    return null;
  }, [selectRatesType, priceValue]);

  const saveBtnHandler = useCallback(() => {
    if (!rateTypeSelectValue) setRateTypeValidationError(true);
    if (!priceValue) setPriceValidationError(true);

    if (postData && !id) createRate(postData, tokenBearer);
    if (postData && id) updateRate(id, postData, tokenBearer);
  }, [postData, priceValue]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить тариф?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deleteRate(id, tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col span={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки тарифа</AdminTitle>
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
            <AdminText>Тип тарифа</AdminText>
            <AdminAutocomplete
              options={optionsRatesTypeName}
              value={rateTypeValue}
              onChange={rateTypeHandler}
              placeholder="Выберите тип тарифа"
              className={styles.inputContainer}
              onSelect={rateTypeSelectHandler}
              isLoading={allRateTypeIsLoading}
              type="second"
              danger={rateTypeValidationError}
            />
            {rateTypeValidationError ? <DangerText>{rateTypeErrorText}</DangerText> : null}
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Цена</AdminText>
            <div className={styles.inputContainer}>
              <AdminInputNumber
                min={1}
                value={priceValue}
                onChange={priceValueHandler}
                danger={priceValidationError}
              />
              {priceValidationError ? <DangerText>{priceErrorText}</DangerText> : null}
            </div>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={rateCreateIsLoading}
            disabled={rateIsCreate}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={rateIsCreate}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={rateDeleteIsLoading}
              disabled={rateIsCreate || rateIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
