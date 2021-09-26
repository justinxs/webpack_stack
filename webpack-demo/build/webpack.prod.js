const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
    // 从 webpack v4 开始, 指定 mode 会自动地配置 process.env.NODE_ENV
    // 自动开启 tree shaking 没被引用或引入不被使用过的 module 不会打包进来
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            // webpack v5 开箱即带有最新版本的 terser-webpack-plugin，自定义配置仍需安装
            new TerserPlugin({
                extractComments: false,
                parallel: true
            }),
            // 这个插件使用 cssnano 优化和压缩 CSS
            new CssMinimizerPlugin()
        ]
    }
})