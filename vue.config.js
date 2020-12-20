module.exports = {
    devServer: {
        //  port: 8001, // 端口号，如果端口被占用，会自动提升 1 默认为8080
        open: true, // 启动服务自动打开浏览器
        https: false, // 协议 要启用https就打开
        host: "localhost", // 主机名，也可以 127.0.0.1 或 做真机测试时候 0.0.0.0 
        proxy: {//跨域
            [process.env.VUE_APP_BASE_API]:{
              // 需要代理到的目标路径
              target:process.env.VUE_APP_SERVICE_URL,
              changOrigin: true, //开启代理
              // 重写路径
              pathRewrite: {
                // 会将 /dev-api 替换为 '',也就是 /dev-api 会移除，
                [`^${process.env.VUE_APP_BASE_API}`]:'',
              }
            }
            
          },
    },
    //    这个必须关闭,公司开发应该开启
    lintOnSave: false, // 默认 true, 关闭语法校验(不然你写console,log()也会报错,除非加Window.) 警告仅仅会被输出到命令行，且不会使得编译失败。
    // outputDir: "dist2", // 默认是 dist ,存放打包文件的目录,
    // assetsDir: "assets", // 存放生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir) 目录
    // indexPath: "out/index.html", // 默认 index.html, 指定打包后生成的 index.html 的输出路径 (相对于 outputDir)默认也就是dist中./index.html的意思。
    productionSourceMap: false, // 打包时, 不生成 .map 文件, 加快打包构建
}