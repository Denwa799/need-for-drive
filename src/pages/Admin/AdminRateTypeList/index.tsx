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
import { PageChangeHandlerType } from './type';
import { AdminRateTypeListFilters } from './AdminRateTypeListFilters';

export const AdminRateType = () => {
  const { ratesTypeIsLoading, ratesTypeError } = useTypedSelector(ratesTypeSelector);
  const [filteredRatesType, setFilteredRatesType] = useState<IRateType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchRatesType } = useActions();

  useEffect(() => {
    fetchRatesType();
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить тип тарифа');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить тип тарифа');
  }, []);

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
    return ['Id', 'Название', 'Единица измерения'];
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
  );
};
