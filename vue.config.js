module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".vue"]
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080
  }
};
