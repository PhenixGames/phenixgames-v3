const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,

    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = process.env.VUE_APP_TITLE;
            return args;
        });
    },
    // devServer: {
    //   proxy: process.env.VUE_APP_HTTP + process.env.VUE_APP_DOMAIN + ':' + process.env.VUE_APP_PORT,
    //   port: process.env.VUE_APP_PORT
    // },
    publicPath: process.env.NODE_ENV === 'production' ? 'dist/' : '/',
});
