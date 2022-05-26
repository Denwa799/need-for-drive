import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { pointsSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { errorMessage } from 'utils/errorMessage';
import { AdminPagination } from 'components/ui/AdminPagination';
import { IPoint } from 'models/IPoint';
import { paginationItems } from 'utils/pagination';
import { AdminTable } from 'components/ui/AdminTable';
import { RouteNames } from 'router/routes';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { Modal } from 'antd';
import { useCookies } from 'react-cookie';
import { AdminSuccessError } from 'components/ui/AdminSuccessError';
import { AdminPointListFilters } from './AdminPointListFilters';
import { PageChangeHandlerType } from './type';

const { confirm } = Modal;

export const AdminPointList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;

  const { pointsIsLoading, pointsError, pointIsDelete, pointDeleteError } =
    useTypedSelector(pointsSelector);
  const [filteredPoints, setFilteredPoints] = useState<IPoint[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { fetchPoints, deletePoint, setPointIsDelete } = useActions();

  useEffect(() => {
    if (!pointsIsLoading) fetchPoints();
  }, []);

  const changeBtnHandler = useCallback((id: string) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_POINT}/${id}`);
  }, []);

  const deleteBtnHandler = useCallback((id: string) => {
    confirm({
      title: 'Вы действительно хотите удалить пункт выдачи?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deletePoint(id, tokenBearer);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (pointIsDelete)
      setTimeout(() => {
        setPointIsDelete(false);
        fetchPoints();
      }, 3000);
  }, [pointIsDelete]);

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
    return ['Название', 'Город', 'Адрес'];
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
    <div>
      <AdminSuccessError
        successText="Успех! Пункт выдачи удален"
        isSuccess={pointIsDelete}
        errorText={pointDeleteError}
        isError={!!pointDeleteError}
      />
      <AdminContainer>
        <AdminTitle>Пункты выдачи</AdminTitle>
        <AdminList>
          <AdminPointListFilters
            setCurrentPage={setCurrentPage}
            setFilteredPoints={setFilteredPoints}
          />
          {pointsIsLoading || pointsError ? (
            <ErrorLoading loading={pointsIsLoading} error={pointsError} />
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
    </div>
  );
};
