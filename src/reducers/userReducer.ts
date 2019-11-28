import * as _ from "lodash";
import { Payload } from "@/connectionTypes";
const initState = {
  userInfo: {},
  lotteryTradition: []
};
export default function userReducer(state = initState, action: Payload) {
  switch (action.type) {
    case "reducer/user/userInfo":
      return _.assign({}, state, { lotteryTradition: action.payload });
    default:
      return state;
  }
}
