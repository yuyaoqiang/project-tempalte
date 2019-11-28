const webpack = require("webpack");
const webpackProdConfig = require("./build/webpack.prod.js");
const { src, dest, series } = require("gulp");
const clean = require("gulp-clean");

const libArray = [
  "node_modules/react/umd/react.production.min.js",
  "node_modules/react-dom/umd/react-dom.production.min.js",
  "node_modules/fastclick/lib/fastclick.js"
];

const webpackBuild = cb => {
  webpack(webpackProdConfig, (err, stats) => {
    cb();
  });
};

const copyLibrary = done => {
  return src(libArray).pipe(dest("resource/lib"));
};

const copyResource = done => {
  return src("resource/**/*").pipe(dest("dist"));
};

const cleanFelder = done => {
  return src(["resource", "dist"], { allowEmpty: true }).pipe(clean());
};

exports.prodBuild = series(cleanFelder, webpackBuild, copyLibrary, copyResource);
