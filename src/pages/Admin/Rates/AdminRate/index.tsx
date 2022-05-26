import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminRate = () => {
  const { id } = useParams();

  const {
    rateIsCreate,
    rate,
    rateCreateError,
    rateIsDelete,
    rateDeleteError,
    rateIsLoading,
    rateError,
  } = useTypedSelector(ratesSelector);

  const {
    fetchRate,
    setRateIsCreate,
    setRateCreateError,
    cleanRate,
    setRateIsDelete,
    setRateDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanRate();
      setRateIsCreate(false);
      setRateCreateError('');
      setRateIsDelete(false);
      setRateDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(rate).length === 0) {
      fetchRate(id);
    }
  }, [id, rate]);

  return (
    <div>
      {rateIsLoading || rateError ? (
        <ErrorLoading loading={rateIsLoading} error={rateError} />
      ) : (
        <div className={styles.AdminRateCreate}>
          <AdminSuccessError
            successText="Успех! Тариф сохранен"
            isSuccess={rateIsCreate}
            errorText={rateCreateError}
            isError={!!rateCreateError}
          />
          <AdminSuccessError
            successText="Успех! Тариф удален"
            isSuccess={rateIsDelete}
            errorText={rateDeleteError}
            isError={!!rateDeleteError}
          />
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
