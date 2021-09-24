const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    performance: {
        // 资源文件最大限制大小warning提示 1000kb
        maxAssetSize: 1000 * 1024,
        maxEntrypointSize: 1000 * 1024,
    },
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        publicPath: '',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                loader: 'babel-loader',
                exclude: file => {
                    if (/node_modules[\\/]lodash/.test(file)) {
                        console.log(file)
                    }
                    return /node_modules/.test(file)
                }
            },
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
                test: /\.scss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // 自动地在 resource 和 inline 之间进行选择, 默认maxSize = 8kb
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb
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
                        maxSize: 4 * 1024 // 4kb
                    }
                },
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: "vendor", // node_modules内的依赖库
                    chunks: "initial", // 只打包初始时依赖，异步引入单独打包
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    minChunks: 1,
                    minSize: 0
                },
            }
        },
    },
    plugins: [
        // 自动注入js、css等入口资源生成html文件
        new HtmlWebpackPlugin({
            inject: true,
            title: 'webpack demo',
            filename: 'index.html',
            template: 'index.html',
            favicon: path.resolve(__dirname, '../favicon.ico')
        }),
        // 提取style生成 css文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id][contenthash:8].css',
            ignoreOrder: true
        }),
        // 注入webpack编译时js中的全局变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    resolve: {
        // 路径别名以及文件默认查找后缀数组
		alias: {
			'@': path.resolve(__dirname, '../src'),
			'@styles': path.resolve(__dirname, '../src/styles'),
			'@images': path.resolve(__dirname, '../src/images')
		},
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue', '.json'],
	}
};