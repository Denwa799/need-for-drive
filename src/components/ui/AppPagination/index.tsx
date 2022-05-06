import React, { FC } from 'react';
import { Col, Pagination, Row } from 'antd';
import cn from 'classnames';
import styles from './styles.module.less';
import { IAppPagination } from './type';

export const AppPagination: FC<IAppPagination> = ({
  total,
  onChange,
  pageSizeOptions,
  page,
  type,
  sizeChangerInvisibleWidth = 0,
}) => {
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
          showSizeChanger={window.innerWidth > sizeChangerInvisibleWidth}
          onChange={onChange}
          pageSizeOptions={pageSizeOptions}
          className={cn({ blue: type === 'blue' })}
        />
      </Col>
    </Row>
  );
};
