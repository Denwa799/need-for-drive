import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import { AdminContainer } from 'layouts/AdminContainer';
import { AdminTitle } from 'components/ui/AdminTitle';
import { AdminList } from 'components/ui/AdminList';
import { CarNumber } from 'components/ui/CarNumber';
import { MoreOutlined } from '@ant-design/icons';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { carsSelector } from 'store/selectors/selectors';
import ErrorLoading from 'components/ui/ErrorLoading/ErrorLoading';
import { useActions } from 'hooks/useActions';
import noImage from 'assets/img/noImage.webp';
import { ICar } from 'models/ICar';
import { AdminPagination } from 'components/ui/AdminPagination';
import { paginationItems } from 'utils/pagination';
import { AdminBtn } from 'components/ui/AdminBtn';
import { errorMessage } from 'utils/errorMessage';
import { RouteNames } from 'router/routes';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.less';
import { PageChangeHandlerType } from './type';
import { AdminCarsListFilters } from './AdminCarsListFilters';

const { Title } = Typography;

export const AdminCarsList = () => {
  const navigate = useNavigate();

  const { carsIsLoading, carsError } = useTypedSelector(carsSelector);
  const [filteredCars, setFilteredCars] = useState<ICar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const pageSizeOptions = useMemo(() => ['4', '10', '25', '50', '75', '100'], []);

  const { fetchCars } = useActions();

  useEffect(() => {
    if (!carsIsLoading) fetchCars();
  }, []);

  // Установка дефолтной картинки при ошибке пути к изображению
  const imageOnErrorHandler = useCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = noImage;
  }, []);

  const changeBtnHandler = useCallback((id: number) => {
    navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CAR}/${id}`);
  }, []);

  const paginationCars = useMemo(
    () => paginationItems(filteredCars, currentPage, limit),
    [filteredCars, currentPage, limit]
  );

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
      <AdminContainer>
        <AdminTitle>Машины</AdminTitle>
        <AdminList>
          <AdminCarsListFilters setCurrentPage={setCurrentPage} setFilteredCars={setFilteredCars} />
          {carsIsLoading || carsError ? (
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
                        {car.colors && car.colors.length > 0 && car.colors[0] !== ''
                          ? car.colors.map((color, index, array) => {
                              return (
                                <b key={`${Math.random()}${color}`}>
                                  {index + 1 !== array.length ? `${color}, ` : `${color}`}
                                </b>
                              );
                            })
                          : errorMessage}
                      </p>
                    </Col>
                    <Col xl={7} lg={9} md={24} sm={24} xs={24} className={styles.priceBlock}>
                      <p className={styles.price}>
                        Минимальная цена:{' '}
                        <b>{car.priceMin ? `${car.priceMin.toLocaleString()} ₽` : errorMessage}</b>
                      </p>
                      <p className={styles.price}>
                        Максимальная цена:{' '}
                        <b>{car.priceMax ? `${car.priceMax.toLocaleString()} ₽` : errorMessage}</b>
                      </p>
                    </Col>
                    <Col xl={4} lg={4} md={24} sm={24} xs={24} className={styles.btns}>
                      <AdminBtn
                        onClick={() => changeBtnHandler(car.id)}
                        type="more"
                        icon={<MoreOutlined />}
                        containerClassName={styles.btnContainer}
                        className={styles.btn}
                      >
                        Изменить
                      </AdminBtn>
                    </Col>
                  </Row>
                );
              })}
            </div>
          )}
        </AdminList>
        <AdminPagination
          total={filteredCars.length}
          onChange={pageChangeHandler}
          pageSizeOptions={pageSizeOptions}
          page={currentPage}
        />
      </AdminContainer>
    </div>
  );
};
