import { request } from "@/utils";
import * as methods from "../utils/requestMethod";

export const createPost = function(params) {
  const url = "/post/add2";
  return request(methods.createFormDataPostRequest(url, params));
};

export const uploadImage = function(params) {
  const url = "/post/subpost/uploadFileArr";
  return request(methods.createFormDataImagePostRequest(url, params));
};
