import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesTypeSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
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
        <ErrorLoading loading={rateTypeIsLoading} error={rateTypeError} />
      ) : (
        <div className={styles.AdminRateType}>
          {rateTypeIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Тип тарифа сохранен</AdminSuccessMsg>
          ) : null}
          {rateTypeCreateError ? (
            <AdminSuccessMsg type="error">{rateTypeCreateError}</AdminSuccessMsg>
          ) : null}
          {rateTypeIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Тип тарифа удален</AdminSuccessMsg>
          ) : null}
          {rateTypeDeleteError ? (
            <AdminSuccessMsg type="error">{rateTypeDeleteError}</AdminSuccessMsg>
          ) : null}
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить тип тарифа</AdminTitle>
            ) : (
              <AdminTitle>Карточка категории машины</AdminTitle>
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
