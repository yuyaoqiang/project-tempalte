const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

webpackConfig.mode = "development";
webpackConfig.entry = [
  "webpack-hot-middleware/client?noInfo=true&reload=true",
  path.resolve(__dirname, "../src/index.tsx")
];
webpackConfig.output.publicPath = "/";
webpackConfig.output.path = path.resolve(__dirname, "../src/temporary");
webpackConfig.devtool = "source-map";
webpackConfig.output.filename = "main[hash].js";

const ruleArray = [
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "postcss-loader"
      }
    ]
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "postcss-loader"
      },
      {
        loader: "less-loader"
      }
    ]
  }
];

const pluginArray = [
  // 热更新
  new webpack.HotModuleReplacementPlugin()
];

pluginArray.map(item => {
  webpackConfig.plugins.push(item);
});

ruleArray.map(item => {
  webpackConfig.module.rules.push(item);
});

const devServer = {
  historyApiFallback: true,
  hot: true,
  contentBase: "../src",
  compress: true,
  open: true,
  port: "8081",
  publicPath: "/",
  proxy: {
    // 接口请求代理
  }
};
webpackConfig.devServer = devServer;

module.exports = webpackConfig;
