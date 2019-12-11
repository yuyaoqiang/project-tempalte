import React, { PureComponent } from "react";
import { history } from "@/utils";
import { connectionState, connectionProps } from "@/connectionTypes";
import "./home.less";
export class Home extends PureComponent<connectionProps, connectionState> {
  goLogin = () => {
    history.push("/login");
  };
  render() {
    return (
      <div>
        <p className="home-wrap" onClick={this.goLogin}>
          牛油果
        </p>
        <p className="ignore">牛油果</p>
        <span>woshi span</span>
      </div>
    );
  }
}

export default Home;
