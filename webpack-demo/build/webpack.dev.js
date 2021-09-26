const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // 从 webpack v4 开始, 指定 mode 会自动地配置 process.env.NODE_ENV
    mode: 'development',
    devtool: 'cheap-source-map',
    // webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
            watch: true,
        },
        compress: true,
        host: '0.0.0.0',
        port: 9000,
        hot: true,
        open: ['http://localhost:9000'],
        client: {
            progress: true
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8340',
                pathRewrite: { '^/api': '/api' },
            },
        },
    },
});