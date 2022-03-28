import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './PriceForm.module.less';
import ButtonApp from '../../../ui/ButtonApp/ButtonApp';
import { IPriceForm } from './type';

const { Title, Text } = Typography;

const PriceForm: FC<IPriceForm> = ({
  maxStage,
  address,
  locationButtonHandler,
  modelButtonHandler,
  additionallyButtonHandler,
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
          <ButtonApp disabled={!address} onClick={modelButtonHandler}>
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
      <div className={styles.priceItem}>
        <div>
          <Text className={styles.listTitle}>Пункт выдачи</Text>
          <Text className={styles.listText}>{address}</Text>
        </div>
      </div>
      <div className={styles.priceItem}>
        <div>
          <Text className={styles.listTitle}>Модель</Text>
          <Text className={styles.listText}>Hyndai, i30 N</Text>
        </div>
      </div>
      <div className={styles.priceFinished}>
        <Text>
          <b>Цена</b>: от 10 000 до 32 000₽
        </Text>
      </div>
      {renderBtns()}
    </div>
  );
};

export default PriceForm;