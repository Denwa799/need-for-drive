import React, { FC } from 'react';
import { Breadcrumb } from 'antd';
import cn from 'classnames';
import styles from './styles.module.less';
import { IOrderBreadcrumb } from './type';

export const OrderBreadcrumb: FC<IOrderBreadcrumb> = ({
  activeStage,
  maxStage,
  setActiveStage,
}) => {
  // Стили для Breadcrumb.Item
  const breadcrumbLocation = cn(
    styles.breadcrumbItem,
    { [styles.breadcrumbActive]: activeStage === 1 },
    { [styles.breadcrumbComplete]: maxStage >= 2 }
  );
  const breadcrumbModel = cn(
    styles.breadcrumbItem,
    { [styles.breadcrumbActive]: activeStage === 2 },
    { [styles.breadcrumbComplete]: maxStage >= 3 }
  );
  const breadcrumbAdditionally = cn(
    styles.breadcrumbItem,
    { [styles.breadcrumbActive]: activeStage === 3 },
    { [styles.breadcrumbComplete]: maxStage >= 4 }
  );
  const breadcrumbTotal = cn(styles.breadcrumbItem, styles.breadcrumbFinal, {
    [styles.breadcrumbActive]: activeStage === 4,
  });

  // Обработчики переключение вкладок в панели breadcrumb
  const breadcrumbLocationHandler = () => {
    setActiveStage(1);
  };
  const breadcrumbModelHandler = () => {
    if (maxStage >= 2) setActiveStage(2);
  };
  const breadcrumbAdditionallyHandler = () => {
    if (maxStage >= 3) setActiveStage(3);
  };
  const breadcrumbTotalHandler = () => {
    if (maxStage >= 4) setActiveStage(4);
  };

  return (
    <div className={styles.OrderBreadcrumb}>
      <Breadcrumb separator="►" className={styles.breadcrumb}>
        <Breadcrumb.Item className={breadcrumbLocation} onClick={breadcrumbLocationHandler}>
          Местоположение
        </Breadcrumb.Item>
        <Breadcrumb.Item className={breadcrumbModel} onClick={breadcrumbModelHandler}>
          Модель
        </Breadcrumb.Item>
        <Breadcrumb.Item className={breadcrumbAdditionally} onClick={breadcrumbAdditionallyHandler}>
          Дополнительно
        </Breadcrumb.Item>
        <Breadcrumb.Item className={breadcrumbTotal} onClick={breadcrumbTotalHandler}>
          Итого
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};
