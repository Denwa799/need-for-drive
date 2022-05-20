import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminRate = () => {
  const { id } = useParams();

  const {
    rateIsCreate,
    rateId,
    rateCreateError,
    rateIsDelete,
    rateDeleteError,
    rateIdIsLoading,
    rateIdError,
  } = useTypedSelector(ratesSelector);

  const {
    fetchRateId,
    setRateIsCreate,
    setRateCreateError,
    cleanRateId,
    setRateIsDelete,
    setRateDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanRateId();
      setRateIsCreate(false);
      setRateCreateError('');
      setRateIsDelete(false);
      setRateDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(rateId).length === 0) {
      fetchRateId(id);
    }
  }, [id, rateId]);

  return (
    <div>
      {rateIdIsLoading ? (
        <ErrorLoading loading={rateIdIsLoading} error={rateIdError} />
      ) : (
        <div className={styles.AdminRateCreate}>
          {rateIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Тариф сохранен</AdminSuccessMsg>
          ) : null}
          {rateCreateError ? (
            <AdminSuccessMsg type="error">{rateCreateError}</AdminSuccessMsg>
          ) : null}
          {rateIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Тариф удален</AdminSuccessMsg>
          ) : null}
          {rateDeleteError ? (
            <AdminSuccessMsg type="error">{rateDeleteError}</AdminSuccessMsg>
          ) : null}
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить тариф</AdminTitle>
            ) : (
              <AdminTitle>Карточка тарифа</AdminTitle>
            )}
            <Row>
              <SettingsBlock />
            </Row>
          </AdminContainer>
        </div>
      )}
    </div>
  );
};
