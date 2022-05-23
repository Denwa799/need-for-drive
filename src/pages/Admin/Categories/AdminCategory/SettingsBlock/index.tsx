import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AdminBackground } from 'components/ui/AdminBackground';
import { AdminTitle } from 'components/ui/AdminTitle';
import { Col, Modal, Row } from 'antd';
import cn from 'classnames';
import { AdminText } from 'components/ui/AdminText';
import { AdminInput } from 'components/ui/AdminInput';
import { AdminBtn } from 'components/ui/AdminBtn';
import { DangerText } from 'components/ui/DangerText';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { categoriesSelector } from 'store/selectors/selectors';
import { useCookies } from 'react-cookie';
import { useActions } from 'hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from 'router/routes';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import styles from './styles.module.less';

const { confirm } = Modal;

export const SettingsBlock: FC = () => {
  const [cookies] = useCookies(['auth']);
  const tokenBearer = cookies.auth.access_token;
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    category,
    categoryIsCreate,
    categoryIsDelete,
    categoryCreateIsLoading,
    categoryDeleteIsLoading,
    categoriesIsLoading,
  } = useTypedSelector(categoriesSelector);

  const [categoryNameValue, setCategoryNameValue] = useState('');
  const [categoryNameValidationError, setCategoryNameValidationError] = useState(false);
  const [categoryNameErrorText, setCategoryNameErrorText] = useState('Пустое поле');

  const [descriptionValue, setDescriptionValue] = useState('');
  const [descriptionValidationError, setDescriptionValidationError] = useState(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState('Пустое поле');

  const {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    setCategoryIsCreate,
    setCategoryIsDelete,
  } = useActions();

  useEffect(() => {
    if (!categoriesIsLoading) fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryNameValue) {
      setCategoryNameValue('');
    }
  }, [categoryNameValue]);

  useEffect(() => {
    if (Object.keys(category).length > 0 && id) {
      if (category.name) setCategoryNameValue(category.name);
      if (category.description) setDescriptionValue(category.description);
    }
  }, [category, id]);

  useEffect(() => {
    if (categoryIsCreate)
      setTimeout(() => {
        setCategoryIsCreate(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CATEGORY_LIST}`);
      }, 3000);
    if (categoryIsDelete)
      setTimeout(() => {
        setCategoryIsDelete(false);
        navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CATEGORY_LIST}`);
      }, 3000);
  }, [categoryIsCreate, categoryIsDelete]);

  const categoryNameValueHandler = useCallback(
    (event) => {
      setCategoryNameValidationError(false);
      setCategoryNameValue(event.target.value);
    },
    [categoryNameValue]
  );

  const descriptionValueHandler = useCallback((event) => {
    setDescriptionValidationError(false);
    setDescriptionValue(event.target.value);
  }, []);

  const postData = useMemo(() => {
    if (categoryNameValue && descriptionValue)
      return {
        name: categoryNameValue,
        description: descriptionValue,
      };
    return null;
  }, [categoryNameValue, descriptionValue]);

  const saveBtnHandler = useCallback(() => {
    if (!categoryNameValue) setCategoryNameValidationError(true);
    if (!descriptionValue) setDescriptionValidationError(true);

    if (postData && !id) createCategory(postData, tokenBearer);
    if (postData && id) updateCategory(id, postData, tokenBearer);
  }, [postData, categoryNameValue, descriptionValue]);

  const cancelBtnHandler = useCallback(
    () => navigate(`/${RouteNames.ADMIN}/${RouteNames.ADMIN_CATEGORY_LIST}`),
    []
  );

  const deleteBtnHandler = useCallback(() => {
    confirm({
      title: 'Вы действительно хотите удалить категорию машины?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        if (id) {
          deleteCategory(id, tokenBearer);
        }
      },
    });
  }, []);

  return (
    <Col span={24} className={styles.SettingsBlock}>
      <AdminBackground className={styles.settingsCard}>
        <AdminTitle level={5}>Настройки категории машины</AdminTitle>
        <Row className={styles.specifications}>
          <Col
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={24}
            className={cn(styles.item, styles.leftBlock)}
          >
            <AdminText>Название</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={categoryNameValueHandler}
                value={categoryNameValue}
                placeholder="Введите название категории машины"
                danger={categoryNameValidationError}
              />
              {categoryNameValidationError ? (
                <DangerText>{categoryNameErrorText}</DangerText>
              ) : null}
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24} className={styles.item}>
            <AdminText>Описание</AdminText>
            <div className={styles.inputContainer}>
              <AdminInput
                onChange={descriptionValueHandler}
                value={descriptionValue}
                placeholder="Введите описание категории машины"
                danger={descriptionValidationError}
              />
              {descriptionValidationError ? <DangerText>{descriptionErrorText}</DangerText> : null}
            </div>
          </Col>
        </Row>
        <Row className={styles.btns}>
          <AdminBtn
            onClick={saveBtnHandler}
            containerClassName={cn(styles.saveBtnContainer, { [styles.editPage]: id })}
            className={styles.saveBtn}
            isLoading={categoryCreateIsLoading}
            disabled={categoryIsCreate || categoryIsDelete}
          >
            Сохранить
          </AdminBtn>
          <AdminBtn
            onClick={cancelBtnHandler}
            type="gray"
            containerClassName={cn(styles.cancelBtnContainer, { [styles.editPage]: id })}
            className={styles.cancelBtn}
            disabled={categoryIsCreate || categoryIsDelete}
          >
            Отменить
          </AdminBtn>
          {id ? (
            <AdminBtn
              onClick={deleteBtnHandler}
              type="pink"
              containerClassName={styles.deleteBtnContainer}
              className={styles.deleteBtn}
              isLoading={categoryDeleteIsLoading}
              disabled={categoryIsCreate || categoryIsDelete}
            >
              Удалить
            </AdminBtn>
          ) : null}
        </Row>
      </AdminBackground>
    </Col>
  );
};
