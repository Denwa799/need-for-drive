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
import { ratesTypeSelector } from 'store/selectors/selectors';
import { useCookies } from 'react-cookie';
import { useActions } from 'hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import styles from './styles.module.less';

const { confirm } = Modal;

export const SettingsBlock: FC = () => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    rateType,
    rateTypeIsCreate,
    rateTypeIsDelete,
    rateTypeCreateIsLoading,
    rateTypeDeleteIsLoading,
  } = useTypedSelector(ratesTypeSelector);

  const [rateTypeNameValue, setRateTypeNameValue] = useState('');
  const [rateTypeNameValidationError, setRateTypeNameValidationError] = useState(false);
  const [rateTypeNameErrorText, setRateTypeNameErrorText] = useState('Пустое поле');

  const [unitValue, setUnitValue] = useState('');
  const [unitValidationError, setUnitValidationError] = useState(false);
  const [unitErrorText, setUnitErrorText] = useState('Пустое поле');

  const {
    createRateType,
    updateRateType,
    deleteRateType,
    setRateTypeIsDelete,
    setRateTypeIsCreate,
  } = useActions();

  useEffect(() => {
    if (!rateTypeNameValue) {
      setRateTypeNameValue('');
    }
  }, [rateTypeNameValue]);

  useEffect(() => {
    if (Object.keys(rateType).length > 0 && id) {
      if (rateType.name) setRateTypeNameValue(rateType.name);
      if (rateType.unit) setUnitValue(rateType.unit);
    }
  }, [rateType, id]);

  useEffect(() => {
    if (rateTypeIsCreate)
      setTimeout(() => {
        setRateTypeIsCreate(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_TYPE_LIST}`);
      }, 3000);
    if (rateTypeIsDelete)
      setTimeout(() => {
        setRateTypeIsDelete(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_TYPE_LIST}`);
      }, 3000);
  }, [rateTypeIsCreate, rateTypeIsDelete]);

  const rateTypeNameValueHandler = useCallback(
    (event) => {
      setRateTypeNameValidationError(false);
      setRateTypeNameValue(event.target.value);
    },
    [rateTypeNameValue]
  );

  const unitValueHandler = useCallback((event) => {
    setUnitValidationError(false);
    setUnitValue(event.target.value);
  }, []);

  const postData = useMemo(() => {
    if (rateTypeNameValue && unitValue)
      return {
        name: rateTypeNameValue,
        unit: unitValue,
      };
    return null;
  }, [rateTypeNameValue, unitValue]);

  const saveBtnHandler = useCallback(() => {
    if (!rateTypeNameValue) setRateTypeNameValidationError(true);
    if (!unitValue) setUnitValidationError(true);

    if (postData && !id) createRateType(postData, tokenBearer);
    if (postData && id) updateRateType(id, postData, tokenBearer);
  }, [postData, rateTypeNameValue, unitValue]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_TYPE_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить тип тарифа?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deleteRateType(id, tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col span={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки типа тарифа</AdminTitle>
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
                onChange={rateTypeNameValueHandler}
                value={rateTypeNameValue}
                placeholder="Введите название типа тарифа"
                danger={rateTypeNameValidationError}
              />
              {rateTypeNameValidationError ? (
                <DangerText>{rateTypeNameErrorText}</DangerText>
              ) : null}
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Единица измерения</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={unitValueHandler}
                value={unitValue}
                placeholder="Введите единицу измерения"
                danger={unitValidationError}
              />
              {unitValidationError ? <DangerText>{unitErrorText}</DangerText> : null}
            </div>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={rateTypeCreateIsLoading}
            disabled={rateTypeIsCreate || rateTypeIsDelete}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={rateTypeIsCreate || rateTypeIsDelete}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={rateTypeDeleteIsLoading}
              disabled={rateTypeIsCreate || rateTypeIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
