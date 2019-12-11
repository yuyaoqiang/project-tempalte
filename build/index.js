const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const mkdirp = require("mkdirp");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const request = require("request");
const webpackConfig = require("./webpack.dev.js");
const qs = require("query-string");
const open = require("open");

const app = express(),
  PORT = 1668, // 设置启动端口
  complier = webpack(webpackConfig);

var httpServer = http.createServer(app);

// 启动时生成一个存放临时文件的目录
mkdirp.sync(path.resolve(__dirname, "../src/temporary"));

let devMiddleware = webpackDevMiddleware(complier, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true, //向控制台显示任何内容
  hot: true
});

let hotMiddleware = webpackHotMiddleware(complier, {
  log: false,
  heartbeat: 2000
});

// 将上层dist/lib目录载入到express进程中, 以便本地开发环境使用/lib路径请求静态资源
app.use("/lib", express.static(path.join(__dirname, "../resource/lib")));
app.use(bodyParser());

app.use(fileUpload());

app.use(devMiddleware);

app.use(hotMiddleware);

// 这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
// app.use(express.static(DIST_DIR))

// 接口代理
// const URI = 'http://window_control_admin.ya802018.net/api';
const URI = "http://47.244.10.144:8080";
app.use("/api", (req, res, next) => {
  switch (req.method) {
    case "GET": {
      request(
        {
          url: `${URI}${req.url}`,
          method: req.method,
          // headers:options,
          headers: {
            "client-type": req.headers["client-type"],
            Authorization: req.headers["authorization"],
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "WWW-Authenticate": req.headers["www-authenticate"]
          }
        },
        (error, response, body) => {
          res.statusCode = response.statusCode;
          res.setHeader("Content-Type", "application/json;charset=utf-8");
          res.write(body);
          res.end();
        }
      );
      break;
    }
    case "POST": {
      const contentType = req.headers["content-type"];
      if (contentType.indexOf("application/x-www-form-urlencoded") >= 0) {
        request(
          {
            url: `${URI}${req.url}`,
            method: req.method,
            body: qs.stringify(req.body),
            headers: {
              "client-type": req.headers["client-type"],
              Authorization: req.headers["authorization"],
              "content-type": contentType,
              "WWW-Authenticate": req.headers["www-authenticate"]
              // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          },
          (error, response, body) => {
            res.statusCode = response.statusCode;
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            res.write(body);
            res.end();
          }
        );
      } else {
        fs.writeFileSync(path.join(__dirname, req.files.file.name), req.files.file.data);
        const postFile = request.post(
          {
            url: `${URI}${req.url}`,
            formData: {
              file: fs.createReadStream(path.join(__dirname, req.files.file.name))
            },
            headers: {
              "client-type": req.headers["client-type"],
              Authorization: req.headers["authorization"],
              "WWW-Authenticate": req.headers["www-authenticate"],
              "content-type": "multipart/form-data"
            }
          },
          (error, response, body) => {
            fs.unlink(path.join(__dirname, req.files.file.name), err => {
              // console.info('删除成功');
            });
            res.statusCode = response.statusCode;
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            res.write(body);
            res.end();
          }
        );
      }
      break;
    }
    case "DELETE": {
      request(
        {
          url: `${URI}${req.url}`,
          method: req.method,
          body: qs.stringify(req.body),
          headers: {
            "client-type": req.headers["client-type"],
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: req.headers["authorization"],
            "WWW-Authenticate": req.headers["www-authenticate"]
          }
        },
        (error, response, body) => {
          res.statusCode = response.statusCode;
          res.setHeader("Content-Type", "application/json;charset=utf-8");
          res.write(body);
          res.end();
        }
      );
      break;
    }
    case "PUT": {
      request(
        {
          url: `${URI}${req.url}`,
          method: req.method,
          body: qs.stringify(req.body),
          headers: {
            "client-type": req.headers["client-type"],
            Authorization: req.headers["authorization"],
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "WWW-Authenticate": req.headers["www-authenticate"]
            // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        },
        (error, response, body) => {
          res.statusCode = response.statusCode;
          res.setHeader("Content-Type", "application/json;charset=utf-8");
          res.write(body);
          res.end();
        }
      );
      break;
    }
    case "PATCH": {
      request(
        {
          url: `${URI}${req.url}`,
          method: req.method,
          body: qs.stringify(req.body),
          headers: {
            "client-type": req.headers["client-type"],
            Authorization: req.headers["authorization"],
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "WWW-Authenticate": req.headers["www-authenticate"]
            // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        },
        (error, response, body) => {
          res.statusCode = response.statusCode;
          res.setHeader("Content-Type", "application/json;charset=utf-8");
          res.write(body);
          res.end();
        }
      );
      break;
    }
  }
});

// 这个方法和下边注释的方法作用一样，就是设置访问静态文件的路径
app.use("*", function (req, res, next) {
  var filename = path.join(complier.outputPath, "index.html");
  complier.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      return next(err);
    }
    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

httpServer.listen(PORT, function () {
  // open("http://localhost:" + PORT);
  console.log("成功启动：localhost:" + PORT);
});
