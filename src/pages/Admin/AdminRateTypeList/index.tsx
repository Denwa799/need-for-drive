import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesTypeSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { AdminFiltersContainer } from 'components/ui/AdminFiltersContainer';
import { Col } from 'antd';
import { AdminBtn } from 'components/ui/AdminBtn';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import cn from 'classnames';
import { errorMessage } from 'utils/errorMessage';
import { AdminPagination } from 'components/ui/AdminPagination';
import { AdminContainer } from 'layouts/AdminContainer';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { PageChangeHandlerType } from './type';
import styles from './styles.module.less';

export const AdminRateType = () => {
  const { ratesType, ratesTypeIsLoading, ratesTypeError } = useTypedSelector(ratesTypeSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchRatesType } = useActions();

  useEffect(() => {
    fetchRatesType();
  }, []);

  const addHandler = useCallback(() => {
    alert('Добавить тип тарифа');
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить тип тарифа');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить тип тарифа');
  }, []);

  const paginationRatesType = useMemo(
    () => paginationItems(ratesType, currentPage, limit),
    [ratesType, currentPage, limit]
  );

  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  return (
    <div className={styles.AdminRateType}>
      <AdminContainer>
        <AdminTitle>Типы тарифов</AdminTitle>
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
          {ratesTypeIsLoading || ratesTypeError ? (
            <ErrorLoading loading={ratesTypeIsLoading} error={ratesTypeError} />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr className={styles.head}>
                  <th>Id</th>
                  <th>Название</th>
                  <th>Единица измерения</th>
                  <th className={styles.text__right}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginationRatesType.map((item) => {
                  return (
                    <tr className={styles.body} key={item.id}>
                      <td className={cn(styles.firstItem, styles.item)}>{item.id}</td>
                      <td className={cn(styles.item, styles.name)}>
                        {item.name ? item.name : errorMessage}
                      </td>
                      <td className={cn(styles.item, styles.unit)}>
                        {item.unit ? item.unit : errorMessage}
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
          total={ratesType.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
