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
        <div className="border-1px">
          <div className="test aspectratio w-188-246">
            <div className="aspectratio-content ">
              <img src={logo}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
