const path = require('path');

module.exports = {
    // "production" | "development" | "none"
    // 从 webpack v4 开始, 指定 mode 会自动地配置 process.env.NODE_ENV
    // 如果 mode 未通过配置或 CLI 赋值，CLI 将使用可能有效的 NODE_ENV 值作为 mode
    // mode: "production" 自动开启 tree shaking 没被引用或引入不被使用过的 module 不会打包进来
    mode: "production", 
    
    // string | object | array
    // 默认为 ./src
    // 这里应用程序开始执行
    entry: "./app/entry",
    
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "dist"), // string (default)
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        filename: "[name].js", // string (default)
        // entry chunk 的文件名模板
        publicPath: "/assets/", // string
        // 输出解析文件的目录，url 相对于 HTML 页面
        library: { // 这里有一种旧的语法形式可以使用（点击显示）
            type: "umd", // 通用模块定义
            // the type of the exported library
            name: "MyLibrary", // string | string[]
            // the name of the exported library

            /* Advanced output.library configuration (click to show) */
        },
        uniqueName: "my-application", // (defaults to package.json "name")
        // unique name for this build to avoid conflicts with other builds in the same HTML
        name: "my-config",
        // name of the configuration, shown in output

        
        /* 高级输出配置 */
        chunkFilename: "[name].js",
        chunkFilename: "[id].js",
        chunkFilename: "[contenthash].js", // 长效缓存
        // the filename template for additional chunks
        assetModuleFilename: "[hash][ext][query]", // string
        // the filename template for asset modules
        webassemblyModuleFilename: "[hash].module.wasm", // string
        // the filename template for wasm modules
        sourceMapFilename: "[file].map", // string
        sourceMapFilename: "sourcemaps/[file].map", // string
        // source map location 的文件名模板
        devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string
        // devtool 模块的文件名模板
        devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", // string
        // devtool 模块的文件名模板（用于冲突）
        crossOriginLoading: "use-credentials", // enum
        crossOriginLoading: "anonymous",
        crossOriginLoading: false,
        // specifies how cross origin request are issued by the runtime
        trustedTypes: false, // boolean (default) | string | object
        // Trusted Types support
        importFunctionName: "import", // string (default)
        // expression that is called when using import()
        // can be replaced to use polyfills
        importMetaName: "import.meta", // string (default)
        // expression that is used when using import.meta
        // can be replaced to use polyfills


        /* Expert output configuration 1 */
        pathinfo: true, // boolean
        // include useful path info about modules, exports, requests, etc. into the generated code
        charset: true, // string
        // add charset attribute to injected script tags
        chunkLoadTimeout: 120000, // number (default)
        // timeout for loading chunks
        compareBeforeEmit: true, // boolean (default)
        // compare the generated asset with the asset on disk before writing to disk
        strictModuleExceptionHandling: true, // boolean
        // handle errors in module evaluation correctly, but for a performance cost
        devtoolNamespace: "MyLibrary", // string
        // prefix in the source names for devtools
        // defaults to output.uniqueName
        environment: {
            // Properties about the environment
            arrowFunction: true,
            bigIntLiteral: true,
            const: true,
            destructuring: true,
            dynamicImport: true,
            forOf: true,
            module: true
        },
        globalObject: "self", // string (default),
        // expression that points to the global object
        iife: true, // boolean (default)
        // wrap the bundle in a IIFE for isolation
        module: false, // boolean (default)
        // generate a module type javascript file instead of a classic script
        scriptType: "module",
        // adds a type attribute to injected script tags

        /* Expert output configuration 2 */
        chunkLoading: "jsonp", // "jsonp" | "import-scripts" | "require" | "async-node" | false
        // method of loading chunks
        chunkLoadingGlobal: "myWebpackJsonp", // string
        // name of the global variable used to load chunks
        enabledChunkLoadingTypes: ["jsonp"], // string[]
        // the chunk loading methods that are available
        enabledLibraryTypes: ["var"], // string[]
        // the library types that are available
        enabledWasmLoadingTypes: ["var"], // string[]
        // the wasm loading methods that are available
        chunkFormat: "array-push",
        chunkFormat: "commonjs",
        chunkFormat: false,
        // the format of chunks
        hotUpdateMainFilename: "[fullhash].hot-update.json", // string
        // filename template for HMR manifest
        hotUpdateChunkFilename: "[id].[fullhash].hot-update.js", // string
        // filename template for HMR chunks
        hotUpdateGlobal: "hmrUpdateFunction", // string
        // the name of the global variable used to load hot update chunks
        sourcePrefix: "\t", // string
        // prefix module sources in bundle for better readability
        // but breaks multi-line template strings
        hashFunction: "md4", // string (default)
        // hash function used in general
        hashDigest: "hex", // string (default)
        // hash digest type used
        hashDigestLength: 20, // number (default)
        // length of hashes
        hashSalt: "salt", // string | Buffer
        // an additional hash salt to fix hash related issues or change the hash in general
    },
    module: {
        // 模块配置相关
        rules: [
            // 模块规则（配置 loader、解析器等选项）
            {
                // Conditions:
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "app/demo-files")
                ],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude to match the full path
                // - Try to avoid exclude and prefer include
                // Each condition can also receive an object with "and", "or" or "not" properties
                // which are an array of conditions.
                issuer: /\.css$/,
                issuer: path.resolve(__dirname, "app"),
                issuer: { and: [ /\.css$/, path.resolve(__dirname, "app") ] },
                issuer: { or: [ /\.css$/, path.resolve(__dirname, "app") ] },
                issuer: { not: [ /\.css$/ ] },
                issuer: [ /\.css$/, path.resolve(__dirname, "app") ], // like "or"
                // conditions for the issuer (the origin of the import)

                /* Advanced conditions */
                resource: /\.css$/,
                // matches the resource of the module, behaves equal to "test" and "include"
                compiler: /html-webpack-plugin/,
                // matches the name of the child compilation
                dependency: "esm", // import-style dependencies
                dependency: "commonjs", // require-style dependencies
                dependency: "amd", // AMD-style dependency
                dependency: "wasm", // WebAssembly imports section
                dependency: "url", // new URL(), url() and similar
                dependency: "worker", // new Worker() and similar
                dependency: "loader", // this.loadModule in loaders
                // matches the type of dependency
                descriptionData: { type: "module" },
                // matches information from the package.json
                mimetype: "text/javascript",
                // matches the mimetype in DataUris
                realResource: /\.css$/,
                // matches the resource but ignores when resource was been renamed
                resourceFragment: "#blah",
                // matches the fragment part of the resource request
                resourceQuery: "?blah",
                // matches the query part of the resource request

                // Actions:
                loader: "babel-loader",
                // 应该应用的 loader，它相对上下文解析
                options: {
                    presets: ["es2015"]
                },
                // options for the loader
                use: [
                    // apply multiple loaders and options instead
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                        // ...
                        }
                    }
                ],
                type: "javascript/auto",
                // specifies the module type

                /* Advanced actions */
                enforce: "pre",
                enforce: "post",
                // flags to apply these rules, even if they are overridden
                generator: { /* ... */ },
                // Options for the generator (depends on module type)
                parser: { /* ... */ },
                // Options for the parser (depends on module type)
                resolve: { /* ... */ },
                // Resolve options (same as "resolve" in configuration)
                sideEffects: false, // boolean
                // Overrides "sideEffects" from package.json
            },
            {
                oneOf: [
                // ... (rules)
                ]
                // only use one of these nested rules
            },
            {
                // ... (conditions)
                rules: [
                // ... (rules)
                ]
                // use all of these nested rules (combine with conditions to be useful)
            },
        ],

        /* 高级模块配置 */
        noParse: [
          /special-library\.js$/
        ],
        // 不解析这里的模块
        unknownContextRequest: ".",
        unknownContextRecursive: true,
        unknownContextRegExp: /^\.\/.*$/,
        unknownContextCritical: true,
        exprContextRequest: ".",
        exprContextRegExp: /^\.\/.*$/,
        exprContextRecursive: true,
        exprContextCritical: true,
        wrappedContextRegExp: /.*/,
        wrappedContextRecursive: true,
        wrappedContextCritical: false,
        // specifies default behavior for dynamic requests
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving of loaders)
        modules: ["node_modules",path.resolve(__dirname, "app")],
        // directories where to look for modules (in order)
        extensions: [".js", ".json", ".jsx", ".css"],
        // 使用的扩展名
        alias: {
            // a list of module name aliases
            // aliases are imported relative to the current context
            "module": "new-module",
            // 别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
            "only-module$": "new-module",
            // 别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
            "module": path.resolve(__dirname, "app/third/module.js"),
            // alias "module" -> "./app/third/module.js" and "module/file" results in error
            "module": path.resolve(__dirname, "app/third"),
            // alias "module" -> "./app/third" and "module/file" -> "./app/third/file"
            [path.resolve(__dirname, "app/module.js")]: path.resolve(__dirname, "app/alternative-module.js"),
            // alias "./app/module.js" -> "./app/alternative-module.js"
        },


        /* 可供选择的别名语法 */
        alias: [
            {
              name: "module",
              // 旧的 request
              alias: "new-module",
              // 新的 request
              onlyModule: true
              // 如果为 true，只有 "module" 是别名
              // 如果为 false，"module/inner/path" 也是别名
            }
        ],

        /* 高级解析选项 */
        conditionNames: ["myCompanyCondition", "..."],
        // conditions used for the "exports" and "imports" field in description file
        roots: [path.resolve(__dirname, "app/root")],
        // locations where to resolve server-relative requests (starting with "/")
        // This behavior is only applied when the request doesn't resolve as absolute path
        fallback: { "events": path.resolve(__dirname, "events.js") },
        // Similar to alias, but only applied when the normal resolving fails
        mainFields: ["main"],
        // properties that are read from description file
        // when a folder is requested
        restrictions: [ /\.js$/, path.resolve(__dirname, "app") ],
        // To successful resolve the result must match these criteria
        cache: true, // boolean
        // enable safe caching of resolving
        // this is safe as it tracks and validates all resolving dependencies
        unsafeCache: true,
        unsafeCache: {},
        // enables unsafe caching for resolved requests
        // this is unsafe as there is no validation
        // but performance improvement is really big
        plugins: [
            // ...
        ],


        /* Expert resolve configuration */
        symlinks: true, // (default)
        // follow symlinks to new location
        descriptionFiles: ["package.json"], // (default)
        // files that are read for package description
        aliasFields: ["browser"],
        // properties that are read from description file
        // to alias requests in this package
        exportsFields: ["exports"], // (default)
        // fields in description file that are used for external module request
        importsFields: ["imports"], // (default)
        // fields in description file that are used for internal request
        mainFiles: ["index"],
        // files that are used when resolving in a directory and no mainField applies
        fullySpecified: true, // boolean
        // Input request is already full specified (it includes filename and extension)
        // Module requests are still resolved as usual
        preferRelative: true, // boolean
        // Try to resolve module requests also a relative request
        enforceExtension: false,
        // if true request must not include an extension
        // if false request may already include an extension
        cachePredicate: ({ path, request }) => true,
        // predicate function which selects requests for caching
        cacheWithContext: false, // (default)
        // include context information in cache key
        // This must be set to true when custom plugins resolve depending on
        // those information
        useSyncFileSystemCalls: false, // (default)
        // use sync fs calls instead of async fs calls
        byDependency: { commonjs: { extensions: [".js", "..."] } },
        // change resolving depending on issuer dependency
    
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 200000, // 整数类型（以字节为单位）
        maxEntrypointSize: 400000, // 整数类型（以字节为单位）
        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devtool: "source-map", // enum
    // 通过为浏览器调试工具提供极其详细的源映射的元信息来增强调试能力，
    // 但会牺牲构建速度。
    context: __dirname, // string（绝对路径！）
    // webpack 的主目录
    // entry 和 module.rules.loader 选项
    // 都相对于此目录解析
    target: "web", // 枚举
    // the environment in which the bundle should run
    // changes chunk loading behavior, available external modules
    // and generated code style
    externals: ["react", /^@angular/],
    // Don't follow/bundle these modules, but request them at runtime from the environment
    externalsType: "var", // (defaults to output.library.type)
    // Type of externals, when not specified inline in externals
    externalsPresets: {
        electron: true,
        electronMain: true,
        electronPreload: true,
        electronRenderer: true,
        node: true,
        nwjs: true,
        web: true,
        webAsync: true,
    },
    // presets of externals
    ignoreWarnings: [/warning/],
    stats: "errors-only",
    stats: {
        // lets you precisely control what bundle information gets displayed
        preset: "errors-only",
        // A stats preset

        /* Advanced global settings */
        all: false,
        // switch all flags on or off
        colors: true,
        // switch colors on and off
        context: __dirname,
        // all paths will be relative to this directory
        ids: true,
        // include module and chunk ids in the output

        env: true,
        // include value of --env in the output
        outputPath: true,
        // include absolute output path in the output
        publicPath: true,
        // include public path in the output

        assets: true,
        // show list of assets in output

        /* Advanced assets settings */
        assetsSort: "size",
        // sorting of assets
        assetsSpace: 50,
        // number of asset lines to display
        cachedAssets: false,
        // show assets that are caching in output
        excludeAssets: /\.png$/,
        // hide some assets
        groupAssetsByPath: true,
        // group assets by their path in the output directory
        groupAssetsByExtension: true,
        // group assets by their extension
        groupAssetsByEmitStatus: true,
        // group assets depending if they are cached, emitted or compared
        groupAssetsByChunk: true,
        // group assets by how they relate to chunks
        groupAssetsByInfo: true,
        // group assets by meta information like immutable, development, etc.
        relatedAssets: true,
        // show assets that are related to other assets, like SourceMaps, compressed version, etc.
        performance: true,
        // show performance hints next to assets and modules
    

        entrypoints: true,
        // show entrypoints list
        chunkGroups: true,
        // show named chunk group list

        /* Advanced chunk group settings */
        chunkGroupAuxiliary: true,
        // show auxiliary assets for entrypoints/chunk groups
        chunkGroupChildren: true,
        // show child chunk groups for entrypoints/chunk groups
        chunkGroupMaxAssets: 5,
        // collapse chunk group assets lists when this limit has been reached

        chunks: true,
        // show list of chunks in output

        /* Advanced chunks settings */
        chunksSort: "size",
        // sort chunks list
        chunkModules: true,
        // show modules contained in each chunk
        chunkOrigins: true,
        // show the origin of a chunk (why was this chunk created)
        chunkRelations: true,
        // show relations to other chunks (parents, children, sibilings)
        dependentModules: true,
        // show modules that are dependencies of other modules in that chunk

        modules: true,
        // show list of modules in output
        /* Advanced module settings */
        modulesSpace: 50,
        // number of modules lines to display
        nestedModules: true,
        // show nested modules (when concatenated)
        cachedModules: true,
        // show modules that were cached
        orphanModules: true,
        // show modules that are not referenced in optimized graph anymore
        excludeModules: /\.css$/,
        // hide some modules
        reasons: true,
        // show the reasons why modules are included
        source: true,
        // include the Source Code of modules (only in JSON)


        /* Expert module settings */
        modulesSort: "size",
        // sort modules list
        groupModulesByPath: true,
        // group modules by their resource path
        groupModulesByExtension: true,
        // group modules by their extension
        groupModulesByAttributes: true,
        // group modules by attributes like if the have errors/warnings/assets
        // or are optional
        groupModulesByCacheStatus: true,
        // group modules depending if they are built, code was generated or if
        // they are cacheable in general
        depth: true,
        // show depth in the module graph of modules
        moduleAssets: true,
        // show assets emitted by modules in module list
        runtimeModules: true,
        // show runtime modules in the modules list
    

        /* Advanced optimization settings */
        providedExports: true,
        // show exports provided by modules
        usedExports: true,
        // show which exports are used by modules
        optimizationBailout: true,
        // show information why optimizations bailed out for modules

        children: true,
        // show stats for child compilations

        logging: true,
        // show logging in output
        loggingDebug: /webpack/,
        // show debug type logging for some loggers
        loggingTrace: true,
        // show stack traces for warnings and errors in logging output

        warnings: true,
        // show warnings

        errors: true,
        // show errors
        errorDetails: true,
        // show details for errors
        errorStack: true,
        // show internal stack trace for errors
        moduleTrace: true,
        // show module trace for errors
        // (why was causing module referenced)

        builtAt: true,
        // show timestamp in summary
        errorsCount: true,
        // show errors count in summary
        warningsCount: true,
        // show warnings count in summary
        timings: true,
        // show build timing in summary
        version: true,
        // show webpack version in summary
        hash: true,
        // show build hash in summary
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        static: path.join(__dirname, 'public'), // boolean | string | array | object, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        // ...
    },
    experiments: {
        asyncWebAssembly: true,
        // WebAssembly as async module (Proposal)
        syncWebAssembly: true,
        // WebAssembly as sync module (deprecated)
        outputModule: true,
        // Allow to output ESM
        topLevelAwait: true,
        // Allow to use await on module evaluation (Proposal)
    },

    // list of additional plugins
    plugins: [
        // ...
    ],
    
    optimization: {
        chunkIds: "size",
        // method of generating ids for chunks
        moduleIds: "size",
        // method of generating ids for modules
        mangleExports: "size",
        // rename export names to shorter names
        minimize: true,
        // minimize the output files
        minimizer: [new CssMinimizer(), "..."],
        // minimizers to use for the output files

        /* Advanced optimizations */
        concatenateModules: true,
        // concatenate multiple modules into a single one
        emitOnErrors: true,
        // emit output files even if there are build errors
        flagIncludedChunks: true,
        // avoid downloading a chunk if it's fully contained in
        // an already loaded chunk
        innerGraph: true,
        // determine references without modules between symbols
        mergeDuplicateChunks: true,
        // merge chunks if they are equal
        nodeEnv: "production",
        // value of process.env.NODE_ENV inside of modules
        portableRecords: true,
        // use relative paths in records
        providedExports: true,
        // determine which exports are exposed by modules
        usedExports: true,
        // determine which exports are used by modules and
        // remove the unused ones
        realContentHash: true,
        // caculcate a contenthash for assets based on the content
        removeAvailableModules: true,
        // run extra pass to determine modules that are already in
        // parent chunks and remove them
        removeEmptyChunks: true,
        // remove chunks that are empty
        runtimeChunk: "single",
        // change placement of runtime code
        sideEffects: true,
        // skip modules that are side effect free when using reexports

        splitChunks: {
            cacheGroups: {
                "my-name": {
                    // define groups of modules with specific
                    // caching behavior
                    test: /\.sass$/,
                    type: "css/mini-extract",

                    /* Advanced selectors */
                    chunks: "async",
                    minChunks: 1,
                    enforceSizeThreshold: 100000,
                    minSize: 0,
                    minRemainingSize: 0,
                    usedExports: true,
                    maxAsyncRequests: 30,
                    maxInitialRequests: 30,

                    /* Advanced effects */
                    maxAsyncSize: 200000,
                    maxInitialSize: 100000,
                    maxSize: 200000,
                    filename: "my-name-[contenthash].js",
                    idHint: "my-name",
                    name: false,
                    hidePathInfo: true,
                    automaticNameDelimiter: "-",
                }
            },

            fallbackCacheGroup: { 
                automaticNameDelimiter: "-",
                minSize: 20000,
                maxAsyncSize: 200000,
                maxInitialSize: 100000,
                maxSize: 200000,
            },

            /* Advanced selectors */
            chunks: "all",
            // select which chunks should be optimized
            usedExports: true,
            // treat modules as equal only when used exports are equal
            minChunks: 1,
            // minimum number of chunks a module must be in
            enforceSizeThreshold: 100000,
            // ignore when following criteria when size of modules
            // is above this threshold
            minSize: 20000,
            // size of modules must be above this threshold
            minRemainingSize: 20000,
            // when modules are removed from a single chunk
            // the size of the modules that are remaining
            // must be above this threshold
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            // number of parallel requests for a single on demand loading
            // resp. entrypoint but be above this threshold


            /* Advanced effects */
            maxAsyncSize: 200000,
            maxInitialSize: 100000,
            maxSize: 200000,
            // when size of modules in the new chunk is above this
            // threshold, split it further
            filename: "[contenthash].js",
            // give the new chunk a different filename
            name: false, // false | string | (module, chunks, key) => string
            // give the new chunk a different name
            // when an existing name is used, chunks are merged
            // non-splitChunks chunks can only be selected, when they are
            // a parent or sibling chunk of all selected modules
            hidePathInfo: true,
            // hide path info when splitting via "maxSize"
            automaticNameDelimiter: "-",
            // use this separator to separate original name from path info
            // when splitting via "maxSize"

            /* Expert settings */
            defaultSizeTypes: ["javascript", "..."]
            // when using numbers for sizes measure these size types
            // minSize: { javascript: 10000 } allows to be more specific
        }
    },

    /* 高级配置 */
    loader: { /* ... */ },
    // add custom API or properties to loader context
    resolveLoader: { /* same as resolve */ },
    // separate resolve options for loaders
    node: {
        // Polyfills and mocks to run Node.js-
        // environment code in non-Node environments.
        global: true, // boolean
        // replace "global" with the output.globalObject
        __filename: "mock", // boolean | "mock" | "eval-only"
        __dirname: "mock", // boolean | "mock" | "eval-only"
        // true: includes the real path
        // "mock": includes a fake path
        // "eval-only": only defines it at compile-time
        // false: disables all handling
    },
    recordsPath: path.resolve(__dirname, "build/records.json"),
    recordsInputPath: path.resolve(__dirname, "build/records.json"),
    recordsOutputPath: path.resolve(__dirname, "build/records.json"),
    // store ids into a file to make the build even more deterministic

    /* Advanced caching configuration */
    cache: false, // boolean
    // disable/enable caching
    snapshot: {
        managedPaths: [ path.resolve(__dirname, "node_modules") ],
        // paths that are snapshot using only package.json name and version
        immutablePaths: [ path.resolve(__dirname, ".yarn/cache") ],
        // paths that doesn't need to be snapshot as they are immutable
        module: { timestamp: true, hash: true },
        resolve: { timestamp: true, hash: false },
        resolveBuildDependencies: { timestamp: true, hash: false },
        buildDependencies: { timestamp: true, hash: true },
        // snapshot method for different operations
    },
    watch: true, // boolean
    // 启用 watch 模式
    watchOptions: {
        aggregateTimeout: 1000, // 以毫秒为单位
        // 将多个修改聚合到单个 rebuild
        poll: true,
        poll: 500, // 以毫秒为间隔单位
        // 在 watch 模式中启用轮询
        // 必须用在不通知更改的文件系统中
        // 即 nfs shares
    },

    /* Advanced build configuration */
    infrastructureLogging: {
        level: "none",
        level: "error",
        level: "warn",
        level: "info", // (default)
        level: "log",
        level: "verbose",
        debug: true,
        debug: /webpack/,
        debug: [ "MyPlugin", /webpack/ ]
    },
    parallelism: 1, // number
    // limit the number of parallel processed modules
    profile: true, // boolean
    // capture timing information
    bail: true, //boolean
    // fail out on the first error instead of tolerating it.
    dependencies: ["name"],
    // When using an array of configs this can be used to reference other
    // configs and let this config run after the other config at initial build
}