import * as React from "react";
import "./app.less";
import "@/assets/style/common.css";
import logo from "@/assets/img/logo.png";
export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidCatch = () => {};
  render() {
    return (
      <div>
        <div className="flexContainer ignore">
          <div className="aspectratio w-375-224">
            <div className="aspectratio-content ">
              <img src="//gw.alicdn.com/mt/TB1HsjfSXXXXXcFXpXXXXXXXXXX-375-224.png"></img>
            </div>
          </div>
          <div className="aspectratio w-375-224">
            <div className="aspectratio-content ">
              <img src="//gw.alicdn.com/mt/TB1HsjfSXXXXXcFXpXXXXXXXXXX-375-224.png"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
