import { request } from "@/utils";
import * as methods from "../utils/requestMethod";

export const commonSerivce = (method, url, params) => {
  switch (method) {
    case "get":
      return request(methods.createGetRequestByQuery(url, params));
    case "post":
      return request(methods.createFormDataPostRequest(url, params));
    case "dele":
      return request(methods.createDelRequestByQuery(url, params));
    case "put":
      return request(methods.createFormDataPutRequest(url, params));
  }
};
