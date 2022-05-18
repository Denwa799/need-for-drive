import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { mapPointsSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { errorMessage } from 'utils/errorMessage';
import { AdminPagination } from 'components/ui/AdminPagination';
import { IMapPoint } from 'models/IMapPoint';
import { paginationItems } from 'utils/pagination';
import { AdminTable } from 'components/ui/AdminTable';
import { PageChangeHandlerType } from './type';
import { AdminPointListFilters } from './AdminPointListFilters';

export const AdminPointList = () => {
  const { mapPointsIsLoading, mapPointsError } = useTypedSelector(mapPointsSelector);
  const [filteredPoints, setFilteredPoints] = useState<IMapPoint[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { fetchPoints } = useActions();

  useEffect(() => {
    if (!mapPointsIsLoading) fetchPoints();
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить пункт выдачи');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить пункт выдачи');
  }, []);

  const paginationPoints = useMemo(
    () => paginationItems(filteredPoints, currentPage, limit),
    [filteredPoints, currentPage, limit]
  );

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  const tableHead = useMemo(() => {
    return ['Id', 'Название', 'Город', 'Адрес'];
  }, []);

  const tableBody = useMemo(() => {
    return paginationPoints.map((item) => {
      return {
        id: item.id,
        name: item.name ? item.name : errorMessage,
        city: item.cityId ? item.cityId.name : errorMessage,
        address: item.address ? item.address : errorMessage,
      };
    });
  }, [paginationPoints]);

  return (
    <AdminContainer>
      <AdminTitle>Пункты выдачи</AdminTitle>
      <AdminList>
        <AdminPointListFilters
          setCurrentPage={setCurrentPage}
          setFilteredPoints={setFilteredPoints}
        />
        {mapPointsIsLoading || mapPointsError ? (
          <ErrorLoading loading={mapPointsIsLoading} error={mapPointsError} />
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
        total={filteredPoints.length}
        onChange={pageChangeHandler}
        pageSizeOptions={pageSizeOptions}
        page={currentPage}
      />
    </AdminContainer>
  );
};
