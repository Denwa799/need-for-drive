import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './PriceForm.module.less';
import ButtonApp from '../../../ui/ButtonApp/ButtonApp';

const { Title, Text } = Typography;

interface IPriceForm {
  address: string;
}

const PriceForm: FC<IPriceForm> = ({ address }) => {
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
      <ButtonApp disabled={!address}>Выбрать модель</ButtonApp>
    </div>
  );
};

export default PriceForm;
