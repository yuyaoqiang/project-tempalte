import React, { PureComponent } from "react";
import { history } from "@/utils";
import { connectionProps, connectionState } from "@/connectionTypes";
export class login extends PureComponent<connectionProps, connectionState> {
  constructor(props) {
    super(props);
  }
  public togoIndex = () => {
    history.goBack();
  };
  render() {
    return (
      <div>
        <div className="flexContainer ignore">
          <div className="aspectratio w-375-224">
            <div className="aspectratio-content">
              <img src="//gw.alicdn.com/mt/TB1HsjfSXXXXXcFXpXXXXXXXXXX-375-224.png"></img>
            </div>
          </div>

          <div className="aspectratio w-375-224">
            <div className="aspectratio-content ">
              <img src="//gw.alicdn.com/mt/TB1HsjfSXXXXXcFXpXXXXXXXXXX-375-224.png"></img>
            </div>
          </div>
        </div>
        <div onClick={this.togoIndex}>登录</div>
      </div>
    );
  }
}

export default login;
