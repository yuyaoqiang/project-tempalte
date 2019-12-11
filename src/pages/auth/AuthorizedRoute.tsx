import React, { Component, PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "@/pages/login/login";
import NotFound from "@/pages/notFound/notFound";
import { routerConfig } from "@/routers";
import { connectionProps, connectionState } from "@/connectionTypes";

export default class Auth extends PureComponent<connectionProps, connectionState> {
  constructor(props) {
    super(props);
  }
  render() {
    const { location } = this.props;
    const { pathname } = location;
    const isLogin = localStorage.getItem("t");
    // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
    const targetRouterConfig = routerConfig.find(v => v.path === pathname);
    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
      const { component } = targetRouterConfig;
      return <Route exact path={pathname} component={component} />;
    }
    if (isLogin) {
      // 如果是登陆状态，想要跳转到登陆
      if (pathname === "/login") {
        return <Route exact path="/login" component={Login} />;
      } else {
        // 如果路由合法，就跳转到相应的路由
        if (targetRouterConfig && pathname !== "/404") {
          //这里用app包裹组件是因为app里有除登录页和404页的其他页面公用的头部组件和侧边菜单组件
          return <Route path={pathname} component={targetRouterConfig.component} />;
        } else if (pathname === "/404") {
          return <Route exact path="/404" component={NotFound} />;
        } else {
          // 如果路由不合法，重定向到 404 页面
          return <Redirect to="/404" />;
        }
      }
    } else {
      // 非登陆状态下，重定向到登陆页
      return <Redirect to="/login" />;
    }
  }
}
