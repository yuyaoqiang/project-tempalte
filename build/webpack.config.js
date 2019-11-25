const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "../src/index"),
  output: {
    filename: "main[chunkhash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./"
  },
  devtool: "",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: "static/img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: "static/fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: " body",
      template: path.resolve(__dirname, "../template/index.html")
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },

  devServer: {},
  optimization: {},
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};
