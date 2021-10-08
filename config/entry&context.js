const path = require('path');

module.exports = {
    // string 基础目录，绝对路径
    // 默认使用当前目录
    context: path.resolve(__dirname, 'app'),

    // string 
    // Array [string] 
    // object = { <key> string | [string] | object = { import string | [string], dependOn string | [string], filename string, layer string }} 
    // (function() => string | [string] | object = { <key> string | [string] } | object = { import string | [string], dependOn string | [string], filename string })
    // 每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。
    entry: {
        home: './home.js',
        shared: ['react', 'react-dom', 'redux', 'react-redux'],
        catalog: {
            import: './catalog.js',
            filename: 'pages/catalog.js',
            dependOn: 'shared',
        },
        personal: {
            import: './personal.js',
            filename: 'pages/personal.js',
            dependOn: ['shared'],
            chunkLoading: 'jsonp',
            layer: 'name of layer', // set the layer for an entry point
        },
    },
    // Dynamic entry
    entry: () => './demo',
    entry: () => new Promise((resolve) => resolve(['./demo', './demo2'])),
};