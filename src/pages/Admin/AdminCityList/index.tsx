import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { AdminTitle } from 'components/ui/AdminTitle';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { citySelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import { AdminList } from 'components/ui/AdminList';
import { AdminBtn } from 'components/ui/AdminBtn';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { AdminPagination } from 'components/ui/AdminPagination';
import { ICity } from 'models/ICity';
import { paginationItems } from 'utils/pagination';
import styles from './styles.module.less';
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

  return (
    <div className={styles.AdminCityList}>
      <AdminContainer>
        <AdminTitle>Города</AdminTitle>
        <AdminList>
          <AdminCityListFilters setCurrentPage={setCurrentPage} setFilteredCity={setFilteredCity} />
          {cityIsLoading || cityError ? (
            <ErrorLoading loading={cityIsLoading} error={cityError} />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr className={styles.head}>
                  <th>Id</th>
                  <th>Название</th>
                  <th className={styles.text__right}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginationCity.map((item) => {
                  return (
                    <tr className={styles.body} key={item.id}>
                      <td className={cn(styles.firstItem, styles.item)}>{item.id}</td>
                      <td className={styles.item}>{item.name}</td>
                      <td className={styles.btnsBlock}>
                        <AdminBtn
                          onClick={deleteBtnHandler}
                          type="close"
                          icon={<CloseOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Удалить
                        </AdminBtn>
                        <AdminBtn
                          onClick={changeBtnHandler}
                          type="more"
                          icon={<MoreOutlined />}
                          containerClassName={styles.btnContainer}
                          className={styles.btn}
                        >
                          Изменить
                        </AdminBtn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
