import { combineEpics } from "redux-observable";
import * as userEpic from "./userEpics";

function deconstruction(obj) {
  return Object.keys(obj).map(item => {
    return obj[item];
  });
}
const rootEpic = combineEpics(...deconstruction(userEpic));

export default rootEpic;
