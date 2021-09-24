const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
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
    },
});