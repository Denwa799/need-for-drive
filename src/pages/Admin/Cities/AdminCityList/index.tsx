import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { citySelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminList } from 'components/ui/AdminList';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { AdminPagination } from 'components/ui/AdminPagination';
import { ICity } from 'models/ICity';
import { paginationItems } from 'utils/pagination';
import { errorMessage } from 'utils/errorMessage';
import { AdminTable } from 'components/ui/AdminTable';
import { RouteNames } from 'router/routes';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { useCookies } from 'react-cookie';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminCityListFilters } from './AdminCityListFilters';
import { PageChangeHandlerType } from './type';

const { confirm } = Modal;

export const AdminCityList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;

  const { citiesIsLoading, citiesError, cityIsDelete, cityDeleteError } =
    useTypedSelector(citySelector);
  const [filteredCity, setFilteredCity] = useState<ICity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { fetchCities, deleteCity, setCityIsDelete } = useActions();

  useEffect(() => {
    if (!citiesIsLoading) fetchCities();
  }, []);

  const changeBtnHandler = useCallback((id: number) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CITY}/${id}`);
  }, []);

  const deleteBtnHandler = useCallback((id: number) => {
    confirm({
      title: 'Вы действительно хотите удалить город?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteCity(Number(id), tokenBearer);
      },
    });
  }, []);

  useEffect(() => {
    if (cityIsDelete)
      setTimeout(() => {
        setCityIsDelete(false);
        fetchCities();
      }, 3000);
  }, [cityIsDelete]);

  const paginationCity = useMemo(
    () => paginationItems(filteredCity, currentPage, limit),
    [filteredCity, currentPage, limit]
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
    return paginationCity.map((item) => {
      return {
        id: item.id,
        name: item.name ? item.name : errorMessage,
      };
    });
  }, [paginationCity]);

  return (
    <div>
      <AdminSuccessError
        successText="Успех! Город удален"
        isSuccess={cityIsDelete}
        errorText={cityDeleteError}
        isError={!!cityDeleteError}
      />
      <AdminContainer>
        <AdminTitle>Города</AdminTitle>
        <AdminList>
          <AdminCityListFilters setCurrentPage={setCurrentPage} setFilteredCity={setFilteredCity} />
          {citiesIsLoading || citiesError ? (
            <ErrorLoading loading={citiesIsLoading} error={citiesError} />
          ) : (
            <AdminTable
              head={tableHead}
              body={tableBody}
              isBtns
              onChangeClick={changeBtnHandler}
              onDeleteClick={deleteBtnHandler}
              deleteDisabled={cityIsDelete}
            />
          )}
        </AdminList>
        <AdminPagination
          total={filteredCity.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
