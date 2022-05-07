import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderStatusSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { Col } from 'antd';
import cn from 'classnames';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { PageChangeHandlerType } from './type';
import { AdminTitle } from '../../../components/ui/AdminTitle';
import { AdminList } from '../../../components/ui/AdminList';
import { AdminFiltersContainer } from '../../../components/ui/AdminFiltersContainer';
import styles from './styles.module.less';
import { AdminBtn } from '../../../components/ui/AdminBtn';
import ErrorLoading from '../../../components/ui/ErrorLoading/ErrorLoading';
import { errorMessage } from '../../../utils/errorMessage';
import { AdminPagination } from '../../../components/ui/AdminPagination';
import { AdminContainer } from '../../../layouts/AdminContainer';

export const AdminOrderStatusList = () => {
  const { allOrderStatus, orderStatusIsLoading, orderStatusError } =
    useTypedSelector(orderStatusSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchAllOrderStatus } = useActions();

  useEffect(() => {
    fetchAllOrderStatus();
  }, []);

  const addHandler = useCallback(() => {
    alert('Добавить статус заказа');
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить статус заказа');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить статус заказа');
  }, []);

  const paginationRatesType = useMemo(
    () => paginationItems(allOrderStatus, currentPage, limit),
    [allOrderStatus, currentPage, limit]
  );

  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  return (
    <div className={styles.AdminOrderStatusList}>
      <AdminContainer>
        <AdminTitle>Статус заказа</AdminTitle>
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
          {orderStatusIsLoading || orderStatusError ? (
            <ErrorLoading loading={orderStatusIsLoading} error={orderStatusError} />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr className={styles.head}>
                  <th>Id</th>
                  <th>Название</th>
                  <th className={styles.text__right}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginationRatesType.map((item) => {
                  return (
                    <tr className={styles.body} key={item.id}>
                      <td className={cn(styles.firstItem, styles.item)}>{item.id}</td>
                      <td className={styles.item}>{item.name ? item.name : errorMessage}</td>
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
          total={allOrderStatus.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
