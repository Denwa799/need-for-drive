import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { pointsSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useParams } from 'react-router-dom';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminErrorLoading } from 'components/ui/AdminErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminPoint = () => {
  const { id } = useParams();

  const {
    point,
    pointIsLoading,
    pointError,
    pointIsCreate,
    pointCreateError,
    pointIsDelete,
    pointDeleteError,
  } = useTypedSelector(pointsSelector);

  const {
    fetchPoint,
    cleanPoint,
    setPointIsCreate,
    setPointCreateError,
    setPointIsDelete,
    setPointDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanPoint();
      setPointIsCreate(false);
      setPointCreateError('');
      setPointIsDelete(false);
      setPointDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(point).length === 0) {
      fetchPoint(Number(id));
    }
  }, [id, point]);

  return (
    <div>
      {pointIsLoading || pointError ? (
        <AdminErrorLoading loading={pointIsLoading} error={pointError} />
      ) : (
        <div className={styles.AdminPointCreate}>
          <AdminSuccessError
            successText="Успех! Пункт выдачи сохранен"
            isSuccess={pointIsCreate}
            errorText={pointCreateError}
            isError={!!pointCreateError}
          />
          <AdminSuccessError
            successText="Успех! Пункт выдачи удален"
            isSuccess={pointIsDelete}
            errorText={pointDeleteError}
            isError={!!pointDeleteError}
          />
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить пункт выдачи</AdminTitle>
            ) : (
              <AdminTitle>Карточка пункта выдачи</AdminTitle>
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
