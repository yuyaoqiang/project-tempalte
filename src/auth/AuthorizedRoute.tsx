import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";

class AuthorizedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const isLogged = localStorage.getItem("token") ? true : false; //根据浏览器中判断是否存在token来判断处于什么状态
    return (
      <Route
        {...this.props}
        render={props => {
          return isLogged ? <Component {...props} /> : <Redirect to="/login" />;
        }}
      />
    );
  }
}

export default AuthorizedRoute;
