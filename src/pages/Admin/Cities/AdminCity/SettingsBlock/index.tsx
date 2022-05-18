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
import { citySelector } from 'store/selectors/selectors';
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

  const { cityId, cityCreateIsLoading, cityIsCreate, cityIsDelete, cityDeleteIsLoading } =
    useTypedSelector(citySelector);

  const [cityNameValue, setCityNameValue] = useState('');
  const [cityNameValidationError, setCityNameValidationError] = useState(false);
  const [cityNameErrorText, setCityNameErrorText] = useState('Пустое поле');

  const { createCity, updateCity, deleteCity } = useActions();

  useEffect(() => {
    if (Object.keys(cityId).length > 0 && id) {
      if (cityId.name) setCityNameValue(cityId.name);
    }
  }, [cityId]);

  useEffect(() => {
    if (cityIsCreate)
      setTimeout(() => {
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CITY_LIST}`);
      }, 3000);
    if (cityIsDelete)
      setTimeout(() => {
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CITY_LIST}`);
      }, 3000);
  }, [cityIsCreate, cityIsDelete]);

  const cityNameValueHandler = useCallback((event) => {
    setCityNameValidationError(false);
    setCityNameValue(event.target.value);
  }, []);

  const postData = useMemo(() => {
    if (cityNameValue)
      return {
        name: cityNameValue,
      };
    return null;
  }, [cityNameValue]);

  const saveBtnHandler = useCallback(() => {
    if (!cityNameValue) setCityNameValidationError(true);

    if (postData && !id) createCity(postData, tokenBearer);
    if (postData && id) updateCity(id, postData, tokenBearer);
  }, [postData, cityNameValue]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CITY_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить город?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deleteCity(id, tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col span={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки города</AdminTitle>
        <Row className={styles.specifications}>
          <Col span={24} className={cn(styles.item, styles.leftBlock)}>
            <AdminText>Название</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={cityNameValueHandler}
                value={cityNameValue}
                placeholder="Введите название города"
                danger={cityNameValidationError}
              />
              {cityNameValidationError ? <DangerText>{cityNameErrorText}</DangerText> : null}
            </div>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={cityCreateIsLoading}
            disabled={cityIsCreate}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={cityIsCreate}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={cityDeleteIsLoading}
              disabled={cityIsCreate || cityIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
