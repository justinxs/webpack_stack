const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 9001
        })
    ],
});