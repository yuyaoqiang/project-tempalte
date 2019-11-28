import { Payload } from "@/connectionTypes";
export const isJudge = function(flag) {
  return function(first, second) {
    if (flag) {
      return first;
    } else {
      return second;
    }
  };
};
export const createdAction = (type, payload) => {
  return {
    type,
    payload: payload || {}
  };
};
