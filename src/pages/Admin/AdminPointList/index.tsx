import { AdminContainer } from 'layouts/AdminContainer';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { mapPointsSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import cn from 'classnames';
import { AdminBtn } from 'components/ui/AdminBtn';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import { errorMessage } from 'utils/errorMessage';
import { Col } from 'antd';
import { PageChangeHandlerType } from '../AdminCityList/type';
import styles from './styles.module.less';
import { AdminFiltersContainer } from '../../../components/ui/AdminFiltersContainer';
import { AdminPagination } from '../../../components/ui/AdminPagination';

export const AdminPointList = () => {
  const { points, mapPointsIsLoading, mapPointsError } = useTypedSelector(mapPointsSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { fetchPoints } = useActions();

  useEffect(() => {
    fetchPoints();
  }, []);

  const addPointHandler = useCallback(() => {
    alert('Добавить пункт выдачи');
  }, []);

  const changeBtnHandler = useCallback(() => {
    alert('Изменить пункт выдачи');
  }, []);

  const deleteBtnHandler = useCallback(() => {
    alert('Удалить пункт выдачи');
  }, []);

  // Переменные для реализации пагинации
  const lastPaginationIndex = useMemo(() => {
    return currentPage * limit;
  }, [currentPage, limit]);

  const firstPaginationIndex = useMemo(() => {
    return lastPaginationIndex - limit;
  }, [lastPaginationIndex, limit]);

  // Отфильтрованный массив, исходя из пагинации
  const paginationPoints = useMemo(() => {
    return points.slice(firstPaginationIndex, lastPaginationIndex);
  }, [points, firstPaginationIndex, lastPaginationIndex]);

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  return (
    <div className={styles.AdminPointList}>
      <AdminContainer>
        <AdminTitle>Пункты выдачи</AdminTitle>
        <AdminList>
          <AdminFiltersContainer className={styles.header}>
            <Col span={24} className={styles.addBtnBlock}>
              <AdminBtn
                onClick={addPointHandler}
                className={styles.addBtn}
                containerClassName={styles.addBtnContainer}
              >
                Добавить
              </AdminBtn>
            </Col>
          </AdminFiltersContainer>
          {mapPointsIsLoading || mapPointsError ? (
            <ErrorLoading loading={mapPointsIsLoading} error={mapPointsError} />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr className={styles.head}>
                  <th>Id</th>
                  <th>Название</th>
                  <th>Город</th>
                  <th>Адрес</th>
                  <th className={styles.text__right}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {paginationPoints.map((item) => {
                  return (
                    <tr className={styles.body} key={item.id}>
                      <td className={cn(styles.firstItem, styles.item)}>{item.id}</td>
                      <td className={styles.item}>{item.name ? item.name : errorMessage}</td>
                      <td className={styles.item}>
                        {item.cityId ? item.cityId.name : errorMessage}
                      </td>
                      <td className={styles.item}>{item.address ? item.address : errorMessage}</td>
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
          total={points.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
