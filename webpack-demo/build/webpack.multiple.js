const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        pageOne: {
            import: './src/index.js',
            dependOn: ['lib'],
        },
        pageTwo: {
            import: './src/two.js',
            dependOn: ['lib'],
        },
        lib: {
            import: ['lodash'], 
            runtime: 'runtime'
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        publicPath: '',
    },
    optimization: {
        // object string boolean 
        // true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk
        // "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // 自动地在 resource 和 inline 之间进行选择, 默认maxSize = 8kb
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: 'images/[name].[hash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                // 自动地在 resource 和 inline 之间进行选择, 默认maxSize = 8kb
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            title: 'webpack demo',
            filename: 'index.html',
            template: 'index.html',
            favicon: path.resolve(__dirname, '../favicon.ico'),
            chunks: ['pageOne', 'lib']
        }),
        new HtmlWebpackPlugin({
            inject: true,
            title: 'webpack demo two',
            filename: 'two.html',
            template: 'index.html',
            favicon: path.resolve(__dirname, '../favicon.ico'),
            chunks: ['pageTwo', 'lib']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id][contenthash].css',
            ignoreOrder: true
        }),
    ],
};