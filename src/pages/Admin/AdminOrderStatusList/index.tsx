import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { orderStatusSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { errorMessage } from 'utils/errorMessage';
import { AdminPagination } from 'components/ui/AdminPagination';
import { AdminContainer } from 'layouts/AdminContainer';
import { IOrderStatus } from 'models/IOrderStatus';
import { AdminTable } from 'components/ui/AdminTable';
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

  const tableHead = useMemo(() => {
    return ['Название'];
  }, []);

  const tableBody = useMemo(() => {
    return paginationRatesType.map((item) => {
      return {
        id: item.id,
        name: item.name ? item.name : errorMessage,
      };
    });
  }, [paginationRatesType]);

  return (
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
          <AdminTable
            head={tableHead}
            body={tableBody}
            isBtns
            onChangeClick={changeBtnHandler}
            onDeleteClick={deleteBtnHandler}
          />
        )}
      </AdminList>
      <AdminPagination
        total={filteredOrdersStatus.length}
        onChange={pageChangeHandler}
        pageSizeOptions={pageSizeOptions}
        page={currentPage}
      />
    </AdminContainer>
  );
};
