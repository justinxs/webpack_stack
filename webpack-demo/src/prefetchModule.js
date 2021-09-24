/**
 * Magic Comments
 * 动态引入该模块 使用 webpackPrefetch，实现<link rel="prefetch" href="prefetchModule.js">
 * 在异步 import() 的时候，父模块加载完后会动态插入 link，等待异步函数 resolve 再真正加载 script
 * 同步 import() 情况，父模块加载完并执行到 import() 会立即加载 script，并不会创建link
 * https://webpack.docschina.org/api/module-methods/#magic-comments
 */
/* webpackInclude: /\.json$/ */
/* webpackExclude: /\.noimport\.json$/ */
/* webpackChunkName: "my-chunk-name" */
/* webpackMode: "lazy" */
/* webpackPrefetch: true */
/* webpackPreload: true */
import _ from 'lodash';
import moment from 'moment';
console.log('prefetch module')
export function now() {
    console.log(moment().format('YYYY/MM/DD hh:mm:ss'), _.join(['Hello', 'webpack']))
}

export class Lazy {
    constructor(params) {
        this.timeout = params ? params.timeout : 100
    }

    load(cb) {
        setTimeout(() => {
            cb()
        }, this.timeout);
    }
}