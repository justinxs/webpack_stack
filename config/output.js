module.exports = {
    //...
    output: {
        // 告诉 webpack 为 HTML 的 <script> 标签添加 charset="utf-8" 标识
        charset: true,

        // string function (pathData, assetInfo) => string
        // 每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下
        filename: 'bundle.js',

        // string function (pathData, assetInfo) => string
        // 输出非初始（non-initial）chunk 文件的名称
        // 异步 chunks 以及 cacheGroups chunks
        chunkFilename: '[id].js',

        // 与 output.filename 相同，不过应用于 Asset Modules
        assetModuleFilename: '[hash][ext][query]',

        // string = '[file].map[query]'
        // 仅在 devtool 设置为 'source-map' 时有效，此选项会向硬盘写入一个输出文件
        sourceMapFilename: '[file].map[query]',

        // 文件输出目录
        path: path.resolve(__dirname, 'dist'),
        // boolean=true string: 'verbose'
        // 告知 webpack 在 bundle 中引入「所包含模块信息」的相关注释
        // development => true, production => false
        pathinfo: true,
        // string: 'module' | 'text/javascript' boolean = false
        // 这个配置项允许使用自定义 script 类型加载异步 chunk，例如 <script type="module" ...>
        scriptType: 'module',

        // string function (pathData, assetInfo) => string
        // 资源文件公共路径
        publicPath: '/',

        // boolean { dry?: boolean, keep?: RegExp | string | ((filename: string) => boolean) }
        // 在生成文件之前清空 output 目录
        // dry: true 打印而不是删除应该移除的静态资源
        // keep: /ignored\/dir\//, 保留 'ignored/dir' 下的静态资源
        // keep: (asset) => asset.includes('ignored/dir') 保留 'ignored/dir' 下的静态资源
        clean: true,

        // false string: 'array-push' | 'commonjs' | 'module' | <any string>
        // chunk 的格式（formats 默认包含 'array-push' (web/WebWorker)、'commonjs' (node.js)、'module' (ESM)，还有其他情况可由插件添加）
        chunkFormat: 'commonjs',
        // chunk 请求到期之前的毫秒数，默认为 120000
        chunkLoadTimeout: 30000,
        // webpack 用于加载 chunk 的全局变量
        chunkLoadingGlobal: 'myCustomFunc',
        // 加载 chunk 的方法
        // （默认值有 'jsonp' (web)、'import' (ESM)、'importScripts' (WebWorker)、'require' (sync node.js)、'async-node' (async node.js)，还有其他值可由插件添加)
        chunkLoading: 'async-node',


        // 告知 webpack 在写入到输出文件系统时检查输出的文件是否已经存在并且拥有相同内容
        // 当在磁盘中已经存在有相同内容的文件时，webpack 将不会写入输出文件
        compareBeforeEmit: false,

        // boolean = false string: 'anonymous' | 'use-credentials'
        // 告诉 webpack 启用 cross-origin 属性 加载 chunk。仅在 target 设置为 'web' 时生效
        crossOriginLoading: 'anonymous',

        // string = 'import'
        // 内部 import() 函数的名称. 可用于 polyfilling, 例如 通过 dynamic-import-polyfill
        importFunctionName: '__import__',
    },
};