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
import { PageChangeHandlerType } from './type';
import { AdminRateListFilters } from './AdminRateListFilters';

export const AdminRateList = () => {
  const { ratesIsLoading, ratesError } = useTypedSelector(ratesSelector);
  const [filteredRates, setFilteredRates] = useState<IRate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchRates } = useActions();

  useEffect(() => {
    fetchRates();
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить тариф');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить тариф');
  }, []);

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
    <AdminContainer>
      <AdminTitle>Тарифы</AdminTitle>
      <AdminList>
        <AdminRateListFilters setCurrentPage={setCurrentPage} setFilteredRates={setFilteredRates} />
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
  );
};
