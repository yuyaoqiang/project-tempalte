const path = require("path");
const webpackConfig = require("./webpack.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

webpackConfig.mode = "production";
webpackConfig.entry = "./src/index";
webpackConfig.devtool = "";
const ruleArray = [
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader"
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
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
  new HtmlWebpackPlugin({
    filename: "index.html",
    inject: " body",
    template: path.resolve(__dirname, "../template/index_prod.html")
  }),
  // css抽取单独文件
  new MiniCssExtractPlugin({
    filename: "style/[name].[hash:5].css"
  }),

  // css压缩文件
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require("cssnano"),
    cssProcessorPluginOptions: {
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true
          },
          normalizeUnicode: false
        }
      ]
    },
    canPrint: true
  })
];

ruleArray.map(item => {
  webpackConfig.module.rules.push(item);
});
pluginArray.map(item => {
  webpackConfig.plugins.push(item);
});

const optimization = {
  splitChunks: {
    chunks: "all",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
      styles: {
        name: "style",
        test: /\.less\.css$/,
        chunks: "all",
        enforce: true
      }
    }
  }
};
webpackConfig.optimization = optimization;

module.exports = webpackConfig;
