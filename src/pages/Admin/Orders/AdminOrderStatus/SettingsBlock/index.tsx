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
import { orderStatusSelector } from 'store/selectors/selectors';
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
    orderStatus,
    orderStatusIsCreate,
    orderStatusIsDelete,
    orderStatusCreateIsLoading,
    orderStatusDeleteIsLoading,
  } = useTypedSelector(orderStatusSelector);

  const [orderStatusNameValue, setOrderStatusNameValue] = useState('');
  const [orderStatusNameValidationError, setOrderStatusNameValidationError] = useState(false);
  const [orderStatusNameErrorText, setOrderStatusNameErrorText] = useState('Пустое поле');

  const {
    createOrderStatus,
    updateOrderStatus,
    deleteOrderStatus,
    setOrderStatusIsDelete,
    setOrderStatusIsCreate,
  } = useActions();

  useEffect(() => {
    if (!orderStatusNameValue) {
      setOrderStatusNameValue('');
    }
  }, [orderStatusNameValue]);

  useEffect(() => {
    if (Object.keys(orderStatus).length > 0 && id) {
      if (orderStatus.name) setOrderStatusNameValue(orderStatus.name);
    }
  }, [orderStatus, id]);

  useEffect(() => {
    if (orderStatusIsCreate)
      setTimeout(() => {
        setOrderStatusIsCreate(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER_STATUS_LIST}`);
      }, 3000);
    if (orderStatusIsDelete)
      setTimeout(() => {
        setOrderStatusIsDelete(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER_STATUS_LIST}`);
      }, 3000);
  }, [orderStatusIsCreate, orderStatusIsDelete]);

  const orderStatusNameValueHandler = useCallback(
    (event) => {
      setOrderStatusNameValidationError(false);
      setOrderStatusNameValue(event.target.value);
    },
    [orderStatusNameValue]
  );

  const postData = useMemo(() => {
    if (orderStatusNameValue)
      return {
        name: orderStatusNameValue,
      };
    return null;
  }, [orderStatusNameValue]);

  const saveBtnHandler = useCallback(() => {
    if (!orderStatusNameValue) setOrderStatusNameValidationError(true);

    if (postData && !id) createOrderStatus(postData, tokenBearer);
    if (postData && id) updateOrderStatus(id, postData, tokenBearer);
  }, [postData, orderStatusNameValue]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER_STATUS_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить статус заказа?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deleteOrderStatus(id, tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col span={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки статуса заказа</AdminTitle>
        <Row className={styles.specifications}>
          <Col span={24} className={styles.item}>
            <AdminText>Название</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={orderStatusNameValueHandler}
                value={orderStatusNameValue}
                placeholder="Введите название статуса заказа"
                danger={orderStatusNameValidationError}
              />
              {orderStatusNameValidationError ? (
                <DangerText>{orderStatusNameErrorText}</DangerText>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={orderStatusCreateIsLoading}
            disabled={orderStatusIsCreate || orderStatusIsDelete}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={orderStatusIsCreate || orderStatusIsDelete}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={orderStatusDeleteIsLoading}
              disabled={orderStatusIsCreate || orderStatusIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
