import * as React from "react";
import * as redux from "redux";
import * as ReactDOM from "react-dom";
import * as reactRedux from "react-redux";
import rootReducer from "@/reducers";
import rootEpic from "@/epics";
import App from "@/app";
import { Router } from "react-router-dom";
import { history } from "@/utils";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import "antd-mobile/dist/antd-mobile.css";
const epicMiddleware = createEpicMiddleware();
const { createStore, applyMiddleware } = redux;
const { Provider } = reactRedux;

const applyCreateStore: any = applyMiddleware(epicMiddleware)(createStore);
const store = applyCreateStore(rootReducer, composeWithDevTools());

epicMiddleware.run(rootEpic);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
