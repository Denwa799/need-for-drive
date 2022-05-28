import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesTypeSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useParams } from 'react-router-dom';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminErrorLoading } from 'components/ui/AdminErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminRateType = () => {
  const { id } = useParams();

  const {
    rateType,
    rateTypeIsLoading,
    rateTypeError,
    rateTypeIsCreate,
    rateTypeCreateError,
    rateTypeIsDelete,
    rateTypeDeleteError,
  } = useTypedSelector(ratesTypeSelector);

  const {
    fetchRateType,
    cleanRateType,
    setRateTypeIsCreate,
    setRateTypeCreateError,
    setRateTypeIsDelete,
    setRateTypeDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanRateType();
      setRateTypeIsCreate(false);
      setRateTypeCreateError('');
      setRateTypeIsDelete(false);
      setRateTypeDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(rateType).length === 0) {
      fetchRateType(id);
    }
  }, [id, rateType]);

  return (
    <div>
      {rateTypeIsLoading || rateTypeError ? (
        <AdminErrorLoading loading={rateTypeIsLoading} error={rateTypeError} />
      ) : (
        <div className={styles.AdminRateType}>
          <AdminSuccessError
            successText="Успех! Тип тарифа сохранен"
            isSuccess={rateTypeIsCreate}
            errorText={rateTypeCreateError}
            isError={!!rateTypeCreateError}
          />
          <AdminSuccessError
            successText="Успех! Тип тарифа удален"
            isSuccess={rateTypeIsDelete}
            errorText={rateTypeDeleteError}
            isError={!!rateTypeDeleteError}
          />
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить тип тарифа</AdminTitle>
            ) : (
              <AdminTitle>Карточка типа тарифа</AdminTitle>
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
