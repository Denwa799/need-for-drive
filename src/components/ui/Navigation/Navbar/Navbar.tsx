import React, { FC, useCallback, useState } from 'react';
import { Drawer, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { RouteNames } from 'router/routes';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { languageSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import MenuToggle from 'components/ui/MenuToggle/MenuToggle';
import TelegramSvg from 'components/ui/CustomIcns/TelegramSvg';
import ButtonChange from 'components/ui/ButtonChange/ButtonChange';
import styles from './Navbar.module.less';

const Navbar: FC = () => {
  const { language } = useTypedSelector(languageSelector);
  const { setLanguage } = useActions();

  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const changeLanguageHandler = useCallback(
    (lang: string) => {
      setLanguage(lang);
    },
    [language]
  );

  return (
    <div className={styles.Navbar}>
      <Drawer
        className={styles.Drawer}
        visible={visible}
        placement="left"
        onClose={handleClose}
        key="left"
      >
        <Menu className={styles.Menu} theme="dark">
          <Menu.Item key={0}>
            <NavLink to={RouteNames.PARKING} onClick={handleClose} className={styles.link}>
              ПАРКОВКА
            </NavLink>
          </Menu.Item>
          <Menu.Item key={1}>
            <NavLink to={RouteNames.INSURANCE} onClick={handleClose}>
              СТРАХОВАНИЕ
            </NavLink>
          </Menu.Item>
          <Menu.Item key={2}>
            <NavLink to={RouteNames.PETROL} onClick={handleClose}>
              БЕНЗИН
            </NavLink>
          </Menu.Item>
          <Menu.Item key={3}>
            <NavLink to={RouteNames.SERVICE} onClick={handleClose}>
              ОБСЛУЖИВАНИЕ
            </NavLink>
          </Menu.Item>
        </Menu>
        <div className={styles.networksIcons}>
          <Icon className={styles.icon} component={TelegramSvg} />
        </div>
        <div className={styles.langButton}>
          {language === 'rus' && (
            <ButtonChange value="eng" changeLang={changeLanguageHandler}>
              Eng
            </ButtonChange>
          )}
          {language === 'eng' && (
            <ButtonChange value="rus" changeLang={changeLanguageHandler}>
              Рус
            </ButtonChange>
          )}
        </div>
      </Drawer>
      <MenuToggle onOpen={handleOpen} />
    </div>
  );
};

export default Navbar;
