import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import locale from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';
import 'moment/locale/ru';
import App from './App';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <CookiesProvider>
        <ConfigProvider locale={locale}>
          <App />
        </ConfigProvider>
      </CookiesProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
