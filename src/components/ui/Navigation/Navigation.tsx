import React, { FC, useCallback } from 'react';
import { Col, Row } from 'antd';
import { useTypedSelector } from 'hooks/useTypesSelector';
import { languageSelector } from 'store/selectors/selectors';
import { useActions } from 'hooks/useActions';
import styles from './Navigation.module.less';
import Navbar from './Navbar/Navbar';
import ButtonChange from '../ButtonChange/ButtonChange';

const Navigation: FC = () => {
  const { language } = useTypedSelector(languageSelector);
  const { setLanguage } = useActions();

  const changeLanguageHandler = useCallback(
    (lang: string) => {
      setLanguage(lang);
    },
    [language]
  );

  return (
    <Col xl={1} lg={1} md={2} sm={24} xs={24} className={styles.Navigation}>
      <Row>
        <Col span={24} className={styles.burger}>
          <Navbar />
        </Col>
      </Row>
      <Row className={`${styles.navFooter}`}>
        <Col span={24} className={styles.langButton}>
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
        </Col>
      </Row>
    </Col>
  );
};

export default Navigation;
