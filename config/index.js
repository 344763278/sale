// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../static/index.html'),
    assetsRoot: path.resolve(__dirname, '../static'),
    assetsSubDirectory: 'other',
    assetsPublicPath: '/static/',
    productionSourceMap: true,
    // Gzip off by default as many popular other hosts such as
    // Surge or Netlify already gzip all other assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8880,
    autoOpenBrowser: false,
    assetsSubDirectory: 'other',
    assetsPublicPath: '/',
    proxyTable: {
        '/pengkuan': {
            // target: 'http://10.0.30.51:8002',  // 你接口的域名
            target: 'http://10.0.11.24/',         // 你接口的域名
            // target: 'http://10.0.10.182:8000', // 你接口的域名 周浩
            // target: 'http://10.0.10.222:8000', // 你接口的域名 亮仔
            // target: 'http://10.0.10.117:8001', // 你接口的域名 赵军
            pathRewrite: {
                '^/pengkuan': ''
            },
            secure: false,      // 如果是https接口，需要配置这个参数
            changeOrigin: true,     // 如果接口跨域，需要进行这个参数配置
        },
        
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
