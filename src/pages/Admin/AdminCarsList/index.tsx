import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { AdminSidebar } from 'layouts/AdminSidebar';
import { AdminHeader } from 'layouts/AdminHeader';
import { AdminFooter } from 'layouts/AdminFooter';
import { AdminContainer } from 'layouts/AdminContainer';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { CarNumber } from 'components/ui/CarNumber';
import { MoreOutlined } from '@ant-design/icons';
import { AppPagination } from 'components/ui/AppPagination';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector } from 'store/selectors/selectors';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { useActions } from 'hooks/useActions';
import noImage from 'assets/img/noImage.webp';
import styles from './styles.module.less';
import { PageChangeHandlerType } from './type';

const { Title } = Typography;

export const AdminCarsList = () => {
  const { cars, carsIsLoading, carsError } = useTypedSelector(carsSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const errorMessage = 'Нет информации';

  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { fetchCars } = useActions();

  // Установка дефолтной картинки при ошибке пути к изображению
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = noImage;
  }, []);

  // Переменные для реализации пагинации
  const lastPaginationIndex = useMemo(() => {
    return currentPage * limit;
  }, [currentPage, limit]);

  const firstPaginationIndex = useMemo(() => {
    return lastPaginationIndex - limit;
  }, [lastPaginationIndex, limit]);

  // Отфильтрованный массив, исходя из пагинации
  const paginationCars = useMemo(() => {
    return cars.slice(firstPaginationIndex, lastPaginationIndex);
  }, [cars, firstPaginationIndex, lastPaginationIndex]);

  useEffect(() => {
    fetchCars();
  }, []);

  // Обработка нажатия на кнопки смены страницы в пагинации
  const pageChangeHandler = useCallback<PageChangeHandlerType>(
    (pageNumber, pageSize) => {
      setCurrentPage(pageNumber);
      setLimit(pageSize);
    },
    [currentPage, limit]
  );

  return (
    <div className={styles.AdminCarsList}>
      <Row className={styles.content}>
        <AdminSidebar />
        <Col xl={20} lg={20} md={22} sm={22} xs={22}>
          <AdminHeader />
          <AdminContainer>
            <AdminTitle>Машины</AdminTitle>
            <AdminList>
              {carsIsLoading ? (
                <ErrorLoading loading={carsIsLoading} error={carsError} />
              ) : (
                <div>
                  {paginationCars.map((car) => {
                    return (
                      <Row key={car.id} className={styles.car}>
                        <Col xl={3} lg={3} md={12} sm={12} xs={24} className={styles.imgBlock}>
                          <img
                            src={car.thumbnail.path}
                            alt={car.name ? car.name : 'машина'}
                            className={styles.img}
                            onError={imageOnErrorHandler}
                          />
                          <CarNumber
                            number={car.number ? car.number : errorMessage}
                            className={styles.number}
                            containerClassName={styles.numberContainer}
                          />
                        </Col>
                        <Col xl={10} lg={8} md={12} sm={12} xs={24}>
                          <Title level={5} className={styles.title}>
                            {car.name}
                          </Title>
                          <p className={styles.description}>
                            Описание: <b>{car.description}</b>
                          </p>
                          <p className={styles.description}>
                            Категория: <b>{car.categoryId ? car.categoryId.name : errorMessage}</b>
                          </p>
                          <p className={styles.description}>
                            Бензин: <b>{car.tank ? `${car.tank} %` : errorMessage}</b>
                          </p>
                          <p className={styles.description}>
                            Цвета:{' '}
                            {car.colors && car.colors.length > 0
                              ? car.colors.map((color) => {
                                  return <b key={`${Math.random()}${color}`}>{color}, </b>;
                                })
                              : errorMessage}
                          </p>
                        </Col>
                        <Col xl={7} lg={9} md={24} sm={24} xs={24} className={styles.priceBlock}>
                          <p className={styles.price}>
                            Минимальная цена:{' '}
                            <b>
                              {car.priceMin ? `${car.priceMin.toLocaleString()} ₽` : errorMessage}
                            </b>
                          </p>
                          <p className={styles.price}>
                            Максимальная цена:{' '}
                            <b>
                              {car.priceMax ? `${car.priceMax.toLocaleString()} ₽` : errorMessage}
                            </b>
                          </p>
                        </Col>
                        <Col xl={4} lg={4} md={24} sm={24} xs={24} className={styles.btns}>
                          <Button
                            className={styles.btn}
                            icon={<MoreOutlined className={styles.icn} />}
                          >
                            Изменить
                          </Button>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              )}
            </AdminList>
            <Row className={styles.pagination}>
              <AppPagination
                total={cars.length}
                onChange={pageChangeHandler}
                pageSizeOptions={pageSizeOptions}
                page={currentPage}
                type="blue"
              />
            </Row>
          </AdminContainer>
          <AdminFooter />
        </Col>
      </Row>
    </div>
  );
};
