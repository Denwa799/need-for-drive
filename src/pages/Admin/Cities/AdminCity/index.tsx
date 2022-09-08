import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { citySelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useParams } from 'react-router-dom';
import { AdminErrorLoading } from 'components/ui/AdminErrorLoading';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
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
      fetchCity(Number(id));
    }
  }, [id, city]);

  return (
    <div>
      {cityIsLoading || cityError ? (
        <AdminErrorLoading loading={cityIsLoading} error={cityError} />
      ) : (
        <div className={styles.AdminCityCreate}>
          <AdminSuccessError
            successText="Успех! Город сохранен"
            isSuccess={cityIsCreate}
            errorText={cityCreateError}
            isError={!!cityCreateError}
          />
          <AdminSuccessError
            successText="Успех! Город удален"
            isSuccess={cityIsDelete}
            errorText={cityDeleteError}
            isError={!!cityDeleteError}
          />
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
