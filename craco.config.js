const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0EC261',
              '@font-family': 'Roboto, sans-serif',
              '@border-radius-base': '8px',
              '@text-color': '#121212',
              '@btn-font-weight': 500,
              '@layout-body-background':'#FFF',
              '@layout-header-background':'#FFF',
              '@heading-1-size':'70px',
              '@heading-2-size':'40px',
              '@heading-color':'#121212',
            },
            javascriptEnabled: true,
          },
        },
      },
      eslint: {
        enable: false
      },
    },
  ],
};