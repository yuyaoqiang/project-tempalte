import * as React from "react";
import * as redux from "redux";
import * as ReactDOM from "react-dom";
import * as reactRedux from "react-redux";
import rootReducer from "@/reducers";
import rootEpic from "@/epics";
import App from "@/home/home";
import { BrowserRouter } from "react-router-dom";
import { createEpicMiddleware } from "redux-observable";
import { connectionProps, connectionState } from "@/connectionTypes";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const epicMiddleware = createEpicMiddleware();
const { createStore, applyMiddleware } = redux;
const { Provider } = reactRedux;

const applyCreateStore: any = applyMiddleware(epicMiddleware)(createStore);
const store = applyCreateStore(rootReducer, composeWithDevTools());

epicMiddleware.run(rootEpic);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
