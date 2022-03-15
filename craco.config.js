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
              '@border-radius-base': '8px',
              '@text-color': '#121212',
              '@btn-font-weight': 500,
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