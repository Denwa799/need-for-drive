import { AdminContainer } from 'layouts/AdminContainer';
import React, { useEffect } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { categoriesSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { useParams } from 'react-router-dom';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminErrorLoading } from 'components/ui/AdminErrorLoading';
import styles from './styles.module.less';
import { SettingsBlock } from './SettingsBlock';

export const AdminCategory = () => {
  const { id } = useParams();

  const {
    category,
    categoryIsLoading,
    categoryError,
    categoryIsCreate,
    categoryCreateError,
    categoryIsDelete,
    categoryDeleteError,
  } = useTypedSelector(categoriesSelector);

  const {
    fetchCategory,
    cleanCategory,
    setCategoryIsCreate,
    setCategoryCreateError,
    setCategoryIsDelete,
    setCategoryDeleteError,
  } = useActions();

  useEffect(() => {
    return () => {
      cleanCategory();
      setCategoryIsCreate(false);
      setCategoryCreateError('');
      setCategoryIsDelete(false);
      setCategoryDeleteError('');
    };
  }, []);

  useEffect(() => {
    if (id && Object.keys(category).length === 0) {
      fetchCategory(Number(id));
    }
  }, [id, category]);

  return (
    <div>
      {categoryIsLoading || categoryError ? (
        <AdminErrorLoading loading={categoryIsLoading} error={categoryError} />
      ) : (
        <div className={styles.AdminCategory}>
          <AdminSuccessError
            successText="Успех! Категория машины сохранена"
            isSuccess={categoryIsCreate}
            errorText={categoryCreateError}
            isError={!!categoryCreateError}
          />
          <AdminSuccessError
            successText="Успех! Категория машины удалена"
            isSuccess={categoryIsDelete}
            errorText={categoryDeleteError}
            isError={!!categoryDeleteError}
          />
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
