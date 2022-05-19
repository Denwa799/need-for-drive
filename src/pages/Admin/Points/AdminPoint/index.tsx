import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { mapPointsSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminPoint = () => {
  const { id } = useParams();

  const {
    pointId,
    pointIdIsLoading,
    pointIdError,
    pointIsCreate,
    pointCreateError,
    pointIsDelete,
    pointDeleteError,
  } = useTypedSelector(mapPointsSelector);

  const {
    fetchPointId,
    cleanPointId,
    setPointIsCreate,
    setPointCreateError,
    setPointIsDelete,
    setPointDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanPointId();
      setPointIsCreate(false);
      setPointCreateError('');
      setPointIsDelete(false);
      setPointDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(pointId).length === 0) {
      fetchPointId(id);
    }
  }, [id, pointId]);

  return (
    <div>
      {pointIdIsLoading || pointIdError ? (
        <ErrorLoading loading={pointIdIsLoading} error={pointIdError} />
      ) : (
        <div className={styles.AdminPointCreate}>
          {pointIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Пункт выдачи сохранен</AdminSuccessMsg>
          ) : null}
          {pointCreateError ? (
            <AdminSuccessMsg type="error">{pointCreateError}</AdminSuccessMsg>
          ) : null}
          {pointIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Пункт выдачи удален</AdminSuccessMsg>
          ) : null}
          {pointDeleteError ? (
            <AdminSuccessMsg type="error">{pointDeleteError}</AdminSuccessMsg>
          ) : null}
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
