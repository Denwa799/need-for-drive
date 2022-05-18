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
import { PageChangeHandlerType } from './type';
import { AdminCategoryListFilters } from './AdminCategoryListFilters';

export const AdminCategoryList = () => {
  const { categoriesIsLoading, categoriesError } = useTypedSelector(categoriesSelector);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { fetchCategories } = useActions();

  useEffect(() => {
    if (!categoriesIsLoading) fetchCategories();
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить категорию');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить категорию');
  }, []);

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
  );
};
