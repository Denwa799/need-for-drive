import React, { FC, useMemo } from 'react';
import { Typography } from 'antd';
import cn from 'classnames';
import ButtonApp from 'components/ui/ButtonApp/ButtonApp';
import { IPriceForm } from './type';
import styles from './PriceForm.module.less';

const { Title, Text } = Typography;

const PriceForm: FC<IPriceForm> = ({
  maxStage,
  address,
  locationButtonHandler,
  modelButtonHandler,
  additionallyButtonHandler,
  modelName,
  priceMin,
  priceMax,
  priceFormTotalButtonHandler,
  orderIsLoading,
  orderError,
}) => {
  const RenderBtns = () =>
    useMemo(() => {
      switch (maxStage) {
        case 1:
          return (
            <ButtonApp disabled={!address} onClick={locationButtonHandler}>
              Выбрать модель
            </ButtonApp>
          );
        case 2:
          return (
            <ButtonApp disabled={!modelName} onClick={modelButtonHandler}>
              Дополнительно
            </ButtonApp>
          );
        case 3:
          return (
            <ButtonApp disabled={!address} onClick={additionallyButtonHandler}>
              Итого
            </ButtonApp>
          );
        case 4:
          return (
            <ButtonApp
              disabled={!address}
              onClick={priceFormTotalButtonHandler}
              loading={orderIsLoading}
            >
              Заказать
            </ButtonApp>
          );
        case 5:
          return (
            <ButtonApp disabled={!address} type="red">
              Отменить
            </ButtonApp>
          );
        default:
          return (
            <ButtonApp disabled={!address} onClick={locationButtonHandler}>
              Выбрать модель
            </ButtonApp>
          );
      }
    }, [maxStage]);

  return (
    <div className={styles.PriceForm}>
      <Title level={5}>Ваш заказ:</Title>
      {address && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Пункт выдачи</Text>
            <Text className={styles.listText}>{address}</Text>
          </div>
        </div>
      )}
      {modelName && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Модель</Text>
            <Text className={cn(styles.listText, styles.modelName)}>{modelName}</Text>
          </div>
        </div>
      )}
      {priceMin > 0 && priceMax > 0 && (
        <div className={styles.priceFinished}>
          <Text>
            <b>Цена</b>: от {priceMin} до {priceMax} ₽
          </Text>
        </div>
      )}
      <div className={styles.button}>
        <RenderBtns />
      </div>
      {orderError && <div className={styles.orderError}>{orderError}</div>}
    </div>
  );
};

export default PriceForm;
