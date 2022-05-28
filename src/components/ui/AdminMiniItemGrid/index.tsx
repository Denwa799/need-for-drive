import React, { FC } from 'react';
import cn from 'classnames';
import { Col, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { IAdminMiniItemGrid } from './type';

export const AdminMiniItemGrid: FC<IAdminMiniItemGrid> = ({
  className,
  containerClassName,
  array,
  deleteHandler,
}) => {
  return (
    <Row className={cn(styles.AdminMiniItemGrid, containerClassName)}>
      {array.map((item, index) => {
        return (
          <Col
            key={item}
            xxl={8}
            xl={8}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.color, className)}
          >
            <p className={styles.text}>{item}</p>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={(event) => deleteHandler(index)}
            >
              <DeleteOutlined />
            </button>
          </Col>
        );
      })}
    </Row>
  );
};
