import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import locale from 'antd/lib/locale/ru_RU';
import { ConfigProvider } from 'antd';
import 'moment/locale/ru';
import App from './App';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
