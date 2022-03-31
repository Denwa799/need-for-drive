import React, { FC } from 'react';
import { Col, Pagination, Row } from 'antd';
import styles from '../FormModel.module.less';
import { IRenderPagination } from './type';

export const RenderPagination: FC<IRenderPagination> = ({ total, onChange, pageSizeOptions }) => {
  if (window.innerWidth <= 991) {
    return (
      <Row className={styles.Pagination}>
        <Col span={24}>
          <Pagination
            defaultCurrent={1}
            defaultPageSize={4}
            size="small"
            responsive={false}
            total={total}
            showSizeChanger
            onChange={onChange}
            pageSizeOptions={pageSizeOptions}
          />
        </Col>
      </Row>
    );
  }
  return null;
};
