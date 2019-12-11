import * as React from "react";
import { connect } from "react-redux";
import { Switch, withRouter, Route } from "react-router-dom";
import { connectionProps, connectionState } from "@/connectionTypes";
import { history, helpers } from "@/utils";
import { routerConfig } from "@/routers";
import AuthorizedRoute from "@/pages/auth/AuthorizedRoute";
import { commonMuitl } from "@/decorator/commonMuitl";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const DEFAULT_SCENE_CONFIG = {
  enter: "from-right",
  exit: "to-right"
};
import "@/assets/style/common.css";
import "@/assets/style/animation.css";
import "./app.less";
let oldLocation = null;
class App extends React.PureComponent<connectionProps, connectionState> {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.getUserInfo();
  };

  getUserInfo = () => {
    this.props.dispatch({
      type: "service/user/getUserInfo"
    });
  };

  getLottery = () => {
    this.props.dispatch({
      type: "service/lottery/lotteryTradition"
    });
  };

  render() {
    let classNames = "";
    let { location, action } = history;
    action === "PUSH"
      ? (classNames = "forward-" + DEFAULT_SCENE_CONFIG.enter)
      : (classNames = "back-" + DEFAULT_SCENE_CONFIG.exit);
    return (
      <TransitionGroup className={"router-wrapper"} childFactory={child => React.cloneElement(child, { classNames })}>
        <CSSTransition timeout={500} key={location.pathname}>
          <Switch location={location}>
            {routerConfig.map((config: any, index) => (
              <Route exact key={index} {...config} />
            ))}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(connect(store => store => ({ ...store }))(App));
