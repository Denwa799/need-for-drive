import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { errorMessage } from 'utils/errorMessage';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { categoriesSelector } from 'store/selectors/selectors';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { AdminPagination } from 'components/ui/AdminPagination';
import { ICategory } from 'models/ICategory';
import { AdminTable } from 'components/ui/AdminTable';
import { RouteNames } from 'router/routes';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useCookies } from 'react-cookie';
import { AdminSuccessMsg } from 'components/ui/AdminSuccessMsg';
import { AdminCategoryListFilters } from './AdminCategoryListFilters';
import { PageChangeHandlerType } from './type';

const { confirm } = Modal;

export const AdminCategoryList = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;

  const { categoriesIsLoading, categoriesError, categoryIsDelete, categoryDeleteError } =
    useTypedSelector(categoriesSelector);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchCategories, deleteCategory, setCategoryIsDelete } = useActions();

  useEffect(() => {
    if (!categoriesIsLoading) fetchCategories();
  }, []);

  const changeBtnHandler = useCallback((id: string) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CATEGORY}/${id}`);
  }, []);

  const deleteBtnHandler = useCallback((id: string) => {
    confirm({
      title: 'Вы действительно хотите удалить город?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteCategory(id, tokenBearer);
      },
    });
  }, []);

  useEffect(() => {
    if (categoryIsDelete)
      setTimeout(() => {
        setCategoryIsDelete(false);
        fetchCategories();
      }, 3000);
  }, [categoryIsDelete]);

  const paginationCategories = useMemo(
    () => paginationItems(filteredCategories, currentPage, limit),
    [filteredCategories, currentPage, limit]
  );

  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  const tableHead = useMemo(() => {
    return ['Id', 'Название', 'Описание'];
  }, []);

  const tableBody = useMemo(() => {
    return paginationCategories.map((item) => {
      return {
        id: item.id,
        name: item.name ? item.name : errorMessage,
        description: item.description ? item.description : errorMessage,
      };
    });
  }, [paginationCategories]);

  return (
    <div>
      {categoryIsDelete ? (
        <AdminSuccessMsg type="success">Успех! Категория машины удалена</AdminSuccessMsg>
      ) : null}
      {categoryDeleteError ? (
        <AdminSuccessMsg type="error">{categoryDeleteError}</AdminSuccessMsg>
      ) : null}
      <AdminContainer>
        <AdminTitle>Категории машин</AdminTitle>
        <AdminList>
          <AdminCategoryListFilters
            setCurrentPage={setCurrentPage}
            setFilteredCategories={setFilteredCategories}
          />
          {categoriesIsLoading || categoriesError ? (
            <ErrorLoading loading={categoriesIsLoading} error={categoriesError} />
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
          total={filteredCategories.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
