import { Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { events, history } from "@/utils";
import _ from "lodash";

function processResponse(res) {
  events.subscribe("toggleLoading", false);
  switch (res.status) {
    case 200:
      return res.response;
    case 210:
      return res.response;
    default:
      console.log(res.status);
      return null;
  }
}
/**
 * @param  {object} options
 * @returns Observable
 */
export default function request(options = { method: "GET", credentials: "include" }) {
  if (!options.url) {
    alert("request url not null");
  }
  events.subscribe("toggleLoading", true);
  return ajax({
    ...options,
    withCredentials: true,
    crossDomain: true
  }).pipe(
    map(processResponse),
    catchError(err => {
      debugger;
      let errorMessage = "interface error";
      if (!_.isEmpty(_.get(err.response, "message"))) {
        errorMessage = err.response.message;
      }
      // message.error(errorMessage);
      if (err.status === 401) {
        history.push("/login");
      }
      return of(null);
    })
  );
}
