import React, { FC, useMemo } from 'react';
import { Typography } from 'antd';
import cn from 'classnames';
import ButtonApp from 'components/ui/ButtonApp/ButtonApp';
import { IPriceForm } from './type';
import styles from './PriceForm.module.less';

const { Title, Text } = Typography;

const PriceForm: FC<IPriceForm> = ({
  maxStage,
  city,
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
  price,
  color,
  duration,
  rate,
  isFullTank,
  isNeedChildChair,
  isRightWheel,
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
            <ButtonApp disabled={!color || !rate || !duration} onClick={additionallyButtonHandler}>
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
    }, []);

  return (
    <div className={styles.PriceForm}>
      <Title level={5}>Ваш заказ:</Title>
      {address && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Пункт выдачи</Text>
            <Text className={styles.listText}>
              {city},<br />
              {address}
            </Text>
          </div>
        </div>
      )}
      {modelName && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Модель</Text>
            <Text className={cn(styles.listText, styles.firstLatterUppercase)}>{modelName}</Text>
          </div>
        </div>
      )}
      {color && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Цвет</Text>
            <Text className={cn(styles.listText, styles.firstLatterUppercase)}>{color}</Text>
          </div>
        </div>
      )}
      {duration && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Длительность аренды</Text>
            <Text className={styles.listText}>{duration}</Text>
          </div>
        </div>
      )}
      {rate && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Тариф</Text>
            <Text className={cn(styles.listText, styles.firstLatterUppercase)}>{rate}</Text>
          </div>
        </div>
      )}
      {isFullTank && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Полный бак</Text>
            <Text className={styles.listText}>Да</Text>
          </div>
        </div>
      )}
      {isNeedChildChair && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Детское кресло</Text>
            <Text className={styles.listText}>Да</Text>
          </div>
        </div>
      )}
      {isRightWheel && (
        <div className={styles.priceItem}>
          <div className={styles.priceDots}>
            <Text className={styles.listTitle}>Правый руль</Text>
            <Text className={styles.listText}>Да</Text>
          </div>
        </div>
      )}
      {priceMin > 0 && priceMax > 0 && (!rate || !duration) && (
        <div className={styles.priceFinished}>
          <Text>
            <b>Цена</b>: от {priceMin} до {priceMax} ₽
          </Text>
        </div>
      )}
      {price > 0 && rate && duration && (
        <div className={styles.priceFinished}>
          <Text>
            <b>Цена</b>: {price} ₽
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
