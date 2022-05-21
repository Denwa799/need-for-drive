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
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Modal } from 'antd';
import { RouteNames } from 'router/routes';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { AdminOrderStatusListFilters } from './AdminOrderStatusListFilters';
import { PageChangeHandlerType } from './type';

const { confirm } = Modal;

export const AdminOrderStatusList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;

  const { orderStatusIsLoading, orderStatusError, orderStatusIsDelete, orderStatusDeleteError } =
    useTypedSelector(orderStatusSelector);
  const [filteredOrdersStatus, setFilteredOrdersStatus] = useState<IOrderStatus[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchAllOrderStatus, deleteOrderStatus, setOrderStatusIsDelete } = useActions();

  useEffect(() => {
    if (!orderStatusIsLoading) fetchAllOrderStatus();
  }, []);

  const changeBtnHandler = useCallback((id: string) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_ORDER_STATUS}/${id}`);
  }, []);

  const deleteBtnHandler = useCallback((id: string) => {
    confirm({
      title: 'Вы действительно хотите удалить статус заказа?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteOrderStatus(id, tokenBearer);
      },
    });
  }, []);

  useEffect(() => {
    if (orderStatusIsDelete)
      setTimeout(() => {
        setOrderStatusIsDelete(false);
        fetchAllOrderStatus();
        setCurrentPage(1);
      }, 3000);
  }, [orderStatusIsDelete]);

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
    <div>
      {orderStatusIsDelete ? (
        <AdminSuccessMsg type="success">Успех! Статус заказа удален</AdminSuccessMsg>
      ) : null}
      {orderStatusDeleteError ? (
        <AdminSuccessMsg type="error">{orderStatusDeleteError}</AdminSuccessMsg>
      ) : null}
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
    </div>
  );
};
