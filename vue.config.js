module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
        store: "@/store"
      },
      extensions: [".ts", ".tsx", ".js", ".vue"]
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080
  }
};
