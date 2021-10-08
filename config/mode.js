module.exports = {
    // 'none' | 'development' | 'production'
    // mode 的默认值设置为 production
    // 从 webpack v4 开始, 指定 mode 会自动地配置 process.env.NODE_ENV
    // 如果 mode 未通过配置或 CLI 赋值，CLI 将使用可能有效的 NODE_ENV 值作为 mode
    // mode: "production" 自动开启 tree shaking 没被引用或引入不被使用过的 module 不会打包进来
    mode: 'development',
};