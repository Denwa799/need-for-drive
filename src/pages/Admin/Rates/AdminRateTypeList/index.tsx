import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { ratesTypeSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { errorMessage } from 'utils/errorMessage';
import { AdminPagination } from 'components/ui/AdminPagination';
import { AdminContainer } from 'layouts/AdminContainer';
import { IRateType } from 'models/IRateType';
import { AdminTable } from 'components/ui/AdminTable';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { RouteNames } from 'router/routes';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { AdminRateTypeListFilters } from './AdminRateTypeListFilters';
import { PageChangeHandlerType } from './type';

const { confirm } = Modal;

export const AdminRateTypeList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;

  const { ratesTypeIsLoading, ratesTypeError, rateTypeIsDelete, rateTypeDeleteError } =
    useTypedSelector(ratesTypeSelector);
  const [filteredRatesType, setFilteredRatesType] = useState<IRateType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchRatesType, deleteRateType, setRateTypeIsDelete } = useActions();

  useEffect(() => {
    if (!ratesTypeIsLoading) fetchRatesType();
  }, []);

  const changeBtnHandler = useCallback((id: string) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_RATE_TYPE}/${id}`);
  }, []);

  const deleteBtnHandler = useCallback((id: string) => {
    confirm({
      title: 'Вы действительно хотите удалить тип тарифа?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteRateType(id, tokenBearer);
      },
    });
  }, []);

  useEffect(() => {
    if (rateTypeIsDelete)
      setTimeout(() => {
        setRateTypeIsDelete(false);
        fetchRatesType();
        setCurrentPage(1);
      }, 3000);
  }, [rateTypeIsDelete]);

  const paginationRatesType = useMemo(
    () => paginationItems(filteredRatesType, currentPage, limit),
    [filteredRatesType, currentPage, limit]
  );

  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  const tableHead = useMemo(() => {
    return ['Название', 'Единица измерения'];
  }, []);

  const tableBody = useMemo(() => {
    return paginationRatesType.map((item) => {
      return {
        id: item.id,
        name: item.name ? item.name : errorMessage,
        unit: item.unit ? item.unit : errorMessage,
      };
    });
  }, [paginationRatesType]);

  return (
    <div>
      {rateTypeIsDelete ? (
        <AdminSuccessMsg type="success">Успех! Тип тарифа удален</AdminSuccessMsg>
      ) : null}
      {rateTypeDeleteError ? (
        <AdminSuccessMsg type="error">{rateTypeDeleteError}</AdminSuccessMsg>
      ) : null}
      <AdminContainer>
        <AdminTitle>Типы тарифов</AdminTitle>
        <AdminList>
          <AdminRateTypeListFilters
            setCurrentPage={setCurrentPage}
            setFilteredRatesType={setFilteredRatesType}
          />
          {ratesTypeIsLoading || ratesTypeError ? (
            <ErrorLoading loading={ratesTypeIsLoading} error={ratesTypeError} />
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
          total={filteredRatesType.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
