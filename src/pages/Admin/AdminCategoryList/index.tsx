import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import cn from 'classnames';
import { errorMessage } from 'utils/errorMessage';
import { AdminBtn } from 'components/ui/AdminBtn';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { categoriesSelector } from 'store/selectors/selectors';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { AdminPagination } from 'components/ui/AdminPagination';
import { Col } from 'antd';
import { PageChangeHandlerType } from './type';
import styles from './styles.module.less';
import { AdminFiltersContainer } from '../../../components/ui/AdminFiltersContainer';

export const AdminCategoryList = () => {
  const { categories, categoriesIsLoading, categoriesError } = useTypedSelector(categoriesSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchCategories } = useActions();

  useEffect(() => {
    fetchCategories();
  }, []);

  const addHandler = useCallback(() => {
    alert('Добавить категорию');
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить категорию');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить категорию');
  }, []);

  const paginationCategories = useMemo(
    () => paginationItems(categories, currentPage, limit),
    [categories, currentPage, limit]
  );

  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  return (
    <div className={styles.AdminCategoryList}>
      <AdminContainer>
        <AdminTitle>Категории машин</AdminTitle>
        <AdminList>
          <AdminFiltersContainer className={styles.header}>
            <Col span={24} className={styles.addBtnBlock}>
              <AdminBtn
                onClick={addHandler}
                className={styles.addBtn}
                containerClassName={styles.addBtnContainer}
              >
                Добавить
              </AdminBtn>
            </Col>
          </AdminFiltersContainer>
          {categoriesIsLoading || categoriesError ? (
            <ErrorLoading loading={categoriesIsLoading} error={categoriesError} />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr className={styles.head}>
                  <th>Id</th>
                  <th>Название</th>
                  <th>Описание</th>
                  <th className={styles.text__right}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginationCategories.map((item) => {
                  return (
                    <tr className={styles.body} key={item.id}>
                      <td className={cn(styles.firstItem, styles.item)}>{item.id}</td>
                      <td className={styles.item}>{item.name ? item.name : errorMessage}</td>
                      <td className={cn(styles.item, styles.description)}>
                        {item.description ? item.description : errorMessage}
                      </td>
                      <td className={styles.btnsBlock}>
                        <AdminBtn
                          onClick={deleteBtnHandler}
                          type="close"
                          icon={<CloseOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Удалить
                        </AdminBtn>
                        <AdminBtn
                          onClick={changeBtnHandler}
                          type="more"
                          icon={<MoreOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Изменить
                        </AdminBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </AdminList>
        <AdminPagination
          total={categories.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
