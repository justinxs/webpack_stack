const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    // JavaScript 执行入口文件
    entry: path.resolve(__dirname, './main.js'),
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
            new CssMinimizerPlugin()
        ],
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader"
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name]_[contenthash:8].css`,
        }),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') }),
    ]
};