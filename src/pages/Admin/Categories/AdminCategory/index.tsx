import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { categoriesSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { useParams } from 'react-router-dom';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminCategory = () => {
  const { id } = useParams();

  const {
    categoryId,
    categoryIdIsLoading,
    categoryIdError,
    categoryIsCreate,
    categoryCreateError,
    categoryIsDelete,
    categoryDeleteError,
  } = useTypedSelector(categoriesSelector);

  const {
    fetchCategoryId,
    cleanCategoryId,
    setCategoryIsCreate,
    setCategoryCreateError,
    setCategoryIsDelete,
    setCategoryDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanCategoryId();
      setCategoryIsCreate(false);
      setCategoryCreateError('');
      setCategoryIsDelete(false);
      setCategoryDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(categoryId).length === 0) {
      fetchCategoryId(id);
    }
  }, [id, categoryId]);

  return (
    <div>
      {categoryIdIsLoading || categoryIdError ? (
        <ErrorLoading loading={categoryIdIsLoading} error={categoryIdError} />
      ) : (
        <div className={styles.AdminCategory}>
          {categoryIsCreate ? (
            <AdminSuccessMsg type="success">Успех! Категория машины сохранена</AdminSuccessMsg>
          ) : null}
          {categoryCreateError ? (
            <AdminSuccessMsg type="error">{categoryCreateError}</AdminSuccessMsg>
          ) : null}
          {categoryIsDelete ? (
            <AdminSuccessMsg type="success">Успех! Категория машины удалена</AdminSuccessMsg>
          ) : null}
          {categoryDeleteError ? (
            <AdminSuccessMsg type="error">{categoryDeleteError}</AdminSuccessMsg>
          ) : null}
          <AdminContainer>
            {!id ? (
              <AdminTitle>Добавить категорию машины</AdminTitle>
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
