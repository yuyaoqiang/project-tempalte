import { combineEpics } from "redux-observable";
import * as userEpic from "./userEpics";
import * as postEpic from "./postEpics";

// 解构
function deconstruction(obj) {
  return Object.keys(obj).map(item => {
    return obj[item];
  });
}
const rootEpic = combineEpics(...deconstruction(userEpic), ...deconstruction(postEpic));

export default rootEpic;
