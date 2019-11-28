import React, { PureComponent } from "react";
import "./home.less";
export class Home extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div>
        <p className="home-wrap">牛油果</p>
        <p className="ignore">牛油果</p>
        <span>woshi span</span>
      </div>
    );
  }
}

export default Home;
