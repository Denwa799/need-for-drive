import React, { FC } from 'react';
import { CloseOutlined, MoreOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
import { AdminBtn } from '../AdminBtn';
import { IAdminTable } from './type';

export const AdminTable: FC<IAdminTable> = ({
  head,
  body,
  isBtns = false,
  onDeleteClick,
  onChangeClick,
  deleteDisabled,
}) => {
  return (
    <table className={styles.AdminTable}>
      <thead>
        <tr className={styles.head}>
          {head.map((item) => {
            return <th key={item}>{item}</th>;
          })}
          {isBtns ? <th className={styles.text__right}>Действия</th> : null}
        </tr>
      </thead>
      <tbody>
        {body.map((row) => {
          return (
            <tr className={styles.body} key={`${Math.random()}${Object.keys(row)[0]}`}>
              {Object.values(row)
                .slice(1)
                .map((item) => {
                  return (
                    <td className={styles.item} key={`${Math.random()}${item}`}>
                      {item}
                    </td>
                  );
                })}
              {isBtns ? (
                <td className={styles.btnsBlock}>
                  <AdminBtn
                    onClick={(() => onDeleteClick!(Object.values(row)[0])) || (() => null)}
                    type="close"
                    icon={<CloseOutlined />}
                    containerClassName={styles.btnContainer}
                    className={styles.btn}
                    disabled={deleteDisabled}
                  >
                    Удалить
                  </AdminBtn>
                  <AdminBtn
                    onClick={(() => onChangeClick!(Object.values(row)[0])) || (() => null)}
                    type="more"
                    icon={<MoreOutlined />}
                    containerClassName={styles.btnContainer}
                    className={styles.btn}
                  >
                    Изменить
                  </AdminBtn>
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
