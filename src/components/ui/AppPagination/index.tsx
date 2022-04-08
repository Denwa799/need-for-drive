import React, { FC } from 'react';
import { Col, Pagination, Row } from 'antd';
import styles from './styles.module.less';
import { IAppPagination } from './type';

export const AppPagination: FC<IAppPagination> = ({ total, onChange, pageSizeOptions, page }) => {
  return (
    <Row className={styles.Pagination}>
      <Col span={24}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={4}
          current={page}
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
};
