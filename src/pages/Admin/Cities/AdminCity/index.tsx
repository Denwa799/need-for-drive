import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { citySelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminCity = () => {
  const { id } = useParams();

  const {
    cityIsCreate,
    city,
    cityCreateError,
    cityIsDelete,
    cityDeleteError,
    cityIsLoading,
    cityError,
  } = useTypedSelector(citySelector);

  const {
    fetchCity,
    setCityIsCreate,
    setCityCreateError,
    cleanCity,
    setCityIsDelete,
    setCityDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanCity();
      setCityIsCreate(false);
      setCityCreateError('');
      setCityIsDelete(false);
      setCityDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(city).length === 0) {
      fetchCity(id);
    }
  }, [id, city]);

  return (
    <div>
      {cityIsLoading || cityError ? (
        <ErrorLoading loading={cityIsLoading} error={cityError} />
      ) : (
        <div className={styles.AdminCityCreate}>
          {cityIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Город сохранен</AdminSuccessMsg>
          ) : null}
          {cityCreateError ? (
            <AdminSuccessMsg type="error">{cityCreateError}</AdminSuccessMsg>
          ) : null}
          {cityIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Город удален</AdminSuccessMsg>
          ) : null}
          {cityDeleteError ? (
            <AdminSuccessMsg type="error">{cityDeleteError}</AdminSuccessMsg>
          ) : null}
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить город</AdminTitle>
            ) : (
              <AdminTitle>Карточка города</AdminTitle>
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
