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
              '@line-height-base':'16px',
              '@heading-1-size':'70px',
              '@heading-2-size':'40px',
              '@heading-5-size':'18px',
              '@heading-color':'#121212',
              '@drawer-bg':'#111518',
              '@menu-dark-bg':'#111518',
              '@menu-dark-color':'#fff',
              '@menu-dark-highlight-color':'#0EC261',
              '@modal-mask-bg': 'rgba(17, 21, 24, 0.8)',
              '@screen-md': '769px',
              '@carousel-dot-width': '8px',
              '@carousel-dot-height': '8px',
              '@carousel-dot-active-width': '8px',
              '@checkbox-border-radius': '0px',
              '@checkbox-check-bg': '#fff',
              '@checkbox-check-color': '#121212',
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
  resolve: {
    less: {
      mainFiles: ['src'],
    }
  }
};