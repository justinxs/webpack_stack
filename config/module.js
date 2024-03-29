module.exports = {
    module: {
        // 可以使用 module.generator 在一个地方配置所有生成器的选项
        generator: {
            'asset': {
                // asseet 模块的 generator 选项
                // 自定义 asset 模块的 publicPath，自 webpack 5.28.0 起可用
                publicPath: 'assets/',
            },
            'asset/inline': {
                // asset/内联模块的 generator 选项
            },
            'asset/resource': {
                // asset/资源模块的 generator 选项
        
                // 自定义 asset/resource 模块的 publicPath，自 webpack 5.28.0 起可用
                publicPath: 'assets/',
            },
            'javascript': {
                // 该模块类型尚不支持 generator 选项
            },
            'javascript/auto': {
                // 同上
            },
            'javascript/dynamic': {
                // 同上
            },
            'javascript/esm': {
                // 同上
            },
        },

        // 类似于 module.generator，你可以用 module.parser 在一个地方配置所有解析器的选项
        parser: {
            'asset': {
                // 资源模块的 parser 选项
            },
            'asset/inline': {
                // 该模块类型尚不支持 parser 选项
            },
            'asset/resource': {
                // 同上
            },
            'asset/source': {
                // 同上
            },
            'javascript': {
                // javascript 模块的解析器选项
                // 例如，启用解析 require.ensure 语法的功能
                requireEnsure: true,
                // 为 CommonJS 启用 魔法注释
                commonjsMagicComments: true,
                // boolean = true | 'relative'
                // 启用 new URL() 语法解析
                url: true,
            },
            'javascript/auto': {
                // 同上
            },
            'javascript/dynamic': {
                // 同上
            },
            'javascript/esm': {
                // 同上
            },
        },

        // webpack 忽略解析的文件
        // 忽略的文件中 不应该含有 import, require, define 的调用，或任何其他导入机制
        noParse: /jquery|lodash/,

        // boolean function (module)
        // 缓存模块请求的解析，cache: false => false,cache: true，并且此模块的来自 node_modules，则值为 true，否则为 false
        unsafeCache: false,

        // 规则数组，这些规则能够对模块(module)应用 loader，或者修改解析器(parser)
        rules: [
            // 每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)
            {
                // Rule 条件
                // resource：资源文件的绝对路径。它已经根据 resolve 规则解析。
                // issuer: 请求者的文件绝对路径。是导入时的位置。
                // 属性 test, include, exclude 和 resource 对 resource 匹配，并且属性 issuer 对 issuer 匹配
                // 当使用多个条件时，所有条件都匹配
                test: /\.js$/,
                include: /src\//,
                exclude: /node_modules\//,
                // 匹配 a.js?inline
                resourceQuery: /inline/,


                
            }
        ]
    },
};