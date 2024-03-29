import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { ratesSelector } from 'store/selectors/selectors';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { errorMessage } from 'utils/errorMessage';
import { AdminPagination } from 'components/ui/AdminPagination';
import { IRate } from 'models/IRate';
import { AdminTable } from 'components/ui/AdminTable';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { RouteNames } from 'router/routes';
import { Modal } from 'antd';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminRateListFilters } from './AdminRateListFilters';
import { PageChangeHandlerType } from './type';

const { confirm } = Modal;

export const AdminRateList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;

  const { ratesIsLoading, ratesError, rateIsDelete, rateDeleteError } =
    useTypedSelector(ratesSelector);
  const [filteredRates, setFilteredRates] = useState<IRate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchRates, deleteRate, setRateIsDelete } = useActions();

  useEffect(() => {
    if (!ratesIsLoading) fetchRates();
  }, []);

  const changeBtnHandler = useCallback((id: number) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE}/${id}`);
  }, []);

  const deleteBtnHandler = useCallback((id: number) => {
    confirm({
      title: 'Вы действительно хотите удалить тариф?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteRate(id, tokenBearer);
      },
    });
  }, []);

  useEffect(() => {
    if (rateIsDelete)
      setTimeout(() => {
        setRateIsDelete(false);
        fetchRates();
        setCurrentPage(1);
      }, 3000);
  }, [rateIsDelete]);

  const paginationRates = useMemo(
    () => paginationItems(filteredRates, currentPage, limit),
    [filteredRates, currentPage, limit]
  );

  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  const tableHead = useMemo(() => {
    return ['Название', 'Цена'];
  }, []);

  const tableBody = useMemo(() => {
    return paginationRates.map((item) => {
      return {
        id: item.id,
        name: item.rateTypeId ? item.rateTypeId.name : errorMessage,
        price: item.price ? `${item.price.toLocaleString()} ₽` : errorMessage,
      };
    });
  }, [paginationRates]);

  return (
    <div>
      <AdminSuccessError
        successText="Успех! Тариф удален"
        isSuccess={rateIsDelete}
        errorText={rateDeleteError}
        isError={!!rateDeleteError}
      />
      <AdminContainer>
        <AdminTitle>Тарифы</AdminTitle>
        <AdminList>
          <AdminRateListFilters
            setCurrentPage={setCurrentPage}
            setFilteredRates={setFilteredRates}
          />
          {ratesIsLoading || ratesError ? (
            <ErrorLoading loading={ratesIsLoading} error={ratesError} />
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
          total={filteredRates.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
