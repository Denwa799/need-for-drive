import React, { FC } from 'react';
import cn from 'classnames';
import { Col, Progress, Row } from 'antd';
import styles from './styles.module.less';
import { IAdminProgressbar } from './type';

export const AdminProgressbar: FC<IAdminProgressbar> = ({ percent, className }) => {
  return (
    <div className={cn(styles.AdminProgressbar, className)}>
      <Row className={styles.progressContainer}>
        <Col span={12} className={styles.progressText}>
          Заполнено
        </Col>
        <Col span={12} className={styles.progressPercent}>
          {`${percent}%`}
        </Col>
        <Progress percent={percent} className={styles.progress} showInfo={false} />
      </Row>
    </div>
  );
};
