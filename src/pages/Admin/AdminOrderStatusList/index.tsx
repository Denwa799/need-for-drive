import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderStatusSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import cn from 'classnames';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { AdminBtn } from 'components/ui/AdminBtn';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { errorMessage } from 'utils/errorMessage';
import { AdminPagination } from 'components/ui/AdminPagination';
import { AdminContainer } from 'layouts/AdminContainer';
import { IOrderStatus } from 'models/IOrderStatus';
import styles from './styles.module.less';
import { PageChangeHandlerType } from './type';
import { AdminOrderStatusListFilters } from './AdminOrderStatusListFilters';

export const AdminOrderStatusList = () => {
  const { orderStatusIsLoading, orderStatusError } = useTypedSelector(orderStatusSelector);
  const [filteredOrdersStatus, setFilteredOrdersStatus] = useState<IOrderStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchAllOrderStatus } = useActions();

  useEffect(() => {
    fetchAllOrderStatus();
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить статус заказа');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить статус заказа');
  }, []);

  const paginationRatesType = useMemo(
    () => paginationItems(filteredOrdersStatus, currentPage, limit),
    [filteredOrdersStatus, currentPage, limit]
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
          <AdminOrderStatusListFilters
            setCurrentPage={setCurrentPage}
            setFilteredOrdersStatus={setFilteredOrdersStatus}
          />
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
          total={filteredOrdersStatus.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
