import * as React from "react";
import { connect } from "react-redux";
import { Router, Switch } from "react-router-dom";
import { connectionProps, connectionState } from "@/connectionTypes";
import { history } from "@/utils";
import AuthorizedRoute from "@/pages/auth/AuthorizedRoute";
import { commonMuitl } from "@/decorator/commonMuitl";
import "@/assets/style/common.css";
import "./app.less";

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
    const AuthorizedRoutePage = commonMuitl(AuthorizedRoute);
    return (
      <Router history={history}>
        <Switch>
          <AuthorizedRoutePage />
        </Switch>
      </Router>
    );
  }
}
export default connect(state => ({ ...state }))(App);
