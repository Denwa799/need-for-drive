import React, { FC } from 'react';
import { Typography } from 'antd';
import cn from 'classnames';
import ButtonApp from 'components/ui/ButtonApp/ButtonApp';
import styles from './PriceForm.module.less';
import { IPriceForm } from './type';

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
}) => {
  function renderBtns() {
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
        return <ButtonApp disabled={!address}>Заказать</ButtonApp>;
      default:
        return (
          <ButtonApp disabled={!address} onClick={locationButtonHandler}>
            Выбрать модель
          </ButtonApp>
        );
    }
  }

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
      <div className={styles.button}>{renderBtns()}</div>
    </div>
  );
};

export default PriceForm;
