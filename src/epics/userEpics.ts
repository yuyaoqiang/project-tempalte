import { ofType, Epic } from "redux-observable";
import { map, exhaustMap } from "rxjs/operators/";
import {commonSerivce} from "@/services";
import { helpers } from "@/utils";
import { Payload } from "@/connectionTypes";
export const lotteryTraditionEpic: Epic<Payload> = action$ => {
  return action$.pipe(
    ofType("service/lottery/lotteryTradition"),
    exhaustMap(action => {
      return commonSerivce("post", "/api/gameType/index-list.mvc", action.payload).pipe(
        map(res => {
          if (res.code === 200) {
            return helpers.createdAction("reducer/user/userInfo", res.data);
          }
          return helpers.createdAction("no");
        })
      );
    })
  );
};
export const getUserInfo: Epic<Payload> = action$ => {
  return action$.pipe(
    ofType("service/user/getUserInfo"),
    exhaustMap(action => {
      return commonSerivce("post", "/api/userInfo/simple-info.mvc", action.payload).pipe(
        map(res => {
          if (res.code === 200) {
            return helpers.createdAction("reducer/user/userInfo", res.data);
          }
          return helpers.createdAction("no");
        })
      );
    })
  );
};