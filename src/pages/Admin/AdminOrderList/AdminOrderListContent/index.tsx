import React, { useState } from 'react';
import { AutoComplete, Button, Checkbox, Col, Input, Row, Typography } from 'antd';
import {
  CaretDownFilled,
  CaretUpFilled,
  CheckOutlined,
  CloseOutlined,
  MoreOutlined,
} from '@ant-design/icons/lib';
import defaultImg from 'assets/img/cars/image-1.webp';
import cn from 'classnames';
import AppContainer from 'layouts/AppContainer/AppContainer';
import styles from './styles.module.less';

const { Title } = Typography;

export const AdminOrderListContent = () => {
  const [isFullThank, setIsFullThank] = useState(true);
  const [isRight, setIsRight] = useState(false);

  return (
    <AppContainer classNames={styles.container}>
      <Title level={3} className={styles.title}>
        Заказы
      </Title>
      <div className={styles.content}>
        <Row className={styles.filters}>
          <Col xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
            <AutoComplete className={styles.autocomplete}>
              <Input className={styles.input} placeholder="Период" />
            </AutoComplete>
            <div className={styles.filterIcn}>
              <CaretUpFilled />
              <CaretDownFilled />
            </div>
          </Col>
          <Col xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
            <AutoComplete className={styles.autocomplete}>
              <Input className={styles.input} placeholder="Название" />
            </AutoComplete>
            <div className={styles.filterIcn}>
              <CaretUpFilled />
              <CaretDownFilled />
            </div>
          </Col>
          <Col xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
            <AutoComplete className={styles.autocomplete}>
              <Input className={styles.input} placeholder="Город" />
            </AutoComplete>
            <div className={styles.filterIcn}>
              <CaretUpFilled />
              <CaretDownFilled />
            </div>
          </Col>
          <Col xl={2} lg={4} md={5} sm={12} xs={24} className={styles.filter}>
            <AutoComplete className={styles.autocomplete}>
              <Input className={styles.input} placeholder="Статус" />
            </AutoComplete>
            <div className={styles.filterIcn}>
              <CaretUpFilled />
              <CaretDownFilled />
            </div>
          </Col>
          <Col xl={16} lg={8} md={4} sm={24} xs={24} className={styles.applyBtnContainer}>
            <Button type="primary" className={styles.applyBtn}>
              Применить
            </Button>
          </Col>
        </Row>
        <Row className={styles.car}>
          <Col xl={3} lg={3} md={6} sm={12} xs={24}>
            <img src={defaultImg} alt="машина" className={styles.img} />
          </Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={24}>
            <p className={styles.description}>
              <b>ELANTRA</b> в <b>Ульяновск</b>, Нариманова 42
            </p>
            <p className={styles.description}>12.06.2019 12:00 — 13.06.2019 12:00</p>
            <p className={styles.description}>
              Цвет: <b>Голубой</b>
            </p>
          </Col>
          <Col xl={4} lg={4} md={6} sm={12} xs={24} className={styles.additional}>
            <Checkbox className={styles.checkbox} checked={isFullThank}>
              Полный бак
            </Checkbox>
            <Checkbox className={styles.checkbox} checked={isFullThank}>
              Детское кресло
            </Checkbox>
            <Checkbox className={styles.checkbox} checked={isRight}>
              Правый руль
            </Checkbox>
          </Col>
          <Col xl={4} lg={3} md={6} sm={12} xs={24} className={styles.price}>
            4 300 ₽
          </Col>
          <Col xl={7} lg={8} md={24} sm={24} xs={24} className={styles.btns}>
            <Button
              className={cn(styles.btn, styles.finishBtn)}
              icon={<CheckOutlined className={cn(styles.icn, styles.checkIcn)} />}
            >
              Готово
            </Button>
            <Button
              className={cn(styles.btn, styles.cancelBtn)}
              icon={<CloseOutlined className={cn(styles.icn, styles.cancelIcn)} />}
            >
              Готово
            </Button>
            <Button
              className={cn(styles.btn, styles.moreBtn)}
              icon={<MoreOutlined className={cn(styles.icn, styles.moreIcn)} />}
            >
              Изменить
            </Button>
          </Col>
        </Row>
      </div>
    </AppContainer>
  );
};
