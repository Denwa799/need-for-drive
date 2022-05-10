import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { AdminBtn } from 'components/ui/AdminBtn';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { useActions } from 'hooks/useActions';
import { pageSizeOptions, paginationItems } from 'utils/pagination';
import { ratesSelector } from 'store/selectors/selectors';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import cn from 'classnames';
import { errorMessage } from 'utils/errorMessage';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { AdminPagination } from 'components/ui/AdminPagination';
import { IRate } from 'models/IRate';
import { PageChangeHandlerType } from './type';
import styles from './styles.module.less';
import { AdminRateListFilters } from './AdminRateListFilters';

export const AdminRateList = () => {
  const { rates, ratesIsLoading, ratesError } = useTypedSelector(ratesSelector);
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

  return (
    <div className={styles.AdminRateList}>
      <AdminContainer>
        <AdminTitle>Тарифы</AdminTitle>
        <AdminList>
          <AdminRateListFilters
            setCurrentPage={setCurrentPage}
            setFilteredRates={setFilteredRates}
          />
          {ratesIsLoading || ratesError ? (
            <ErrorLoading loading={ratesIsLoading} error={ratesError} />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr className={styles.head}>
                  <th>Id</th>
                  <th>Название</th>
                  <th>Цена</th>
                  <th className={styles.text__right}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginationRates.map((item) => {
                  return (
                    <tr className={styles.body} key={item.id}>
                      <td className={cn(styles.firstItem, styles.item)}>{item.id}</td>
                      <td className={cn(styles.item, styles.name)}>
                        {item.rateTypeId ? item.rateTypeId.name : errorMessage}
                      </td>
                      <td className={cn(styles.item, styles.price)}>
                        {item.price ? `${item.price.toLocaleString()} ₽` : errorMessage}
                      </td>
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
          total={filteredRates.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
