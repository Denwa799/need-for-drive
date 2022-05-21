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
import { PageChangeHandlerType } from './type';
import { AdminCityListFilters } from './AdminCityListFilters';

export const AdminCityList = () => {
  const { cityIsLoading, cityError } = useTypedSelector(citySelector);
  const [filteredCity, setFilteredCity] = useState<ICity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { fetchCity } = useActions();

  useEffect(() => {
    fetchCity();
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить город');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить город');
  }, []);

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
    <AdminContainer>
      <AdminTitle>Города</AdminTitle>
      <AdminList>
        <AdminCityListFilters setCurrentPage={setCurrentPage} setFilteredCity={setFilteredCity} />
        {cityIsLoading || cityError ? (
          <ErrorLoading loading={cityIsLoading} error={cityError} />
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
        total={filteredCity.length}
        onChange={pageChangeHandler}
        pageSizeOptions={pageSizeOptions}
        page={currentPage}
      />
    </AdminContainer>
  );
};
