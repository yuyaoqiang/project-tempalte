import * as qs from "qs";
import * as _ from "lodash";
import { helpers, ls } from "@/utils";

// const wwwAuthenticate = `${process.env.appToken}`;

export function createFormDataPostRequest(url, params) {
  const path = helpers.isJudge(_.isEmpty(url))("/", url);
  return {
    url: path,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + ls.get("t")
    },
    credentials: "include",
    Authorization: "Bearer " + ls.get("t"),
    body: JSON.stringify(params)
  };
}

export function createFormDataImagePostRequest(url, params) {
  const path = helpers.isJudge(_.isEmpty(url))("/", url);
  return {
    url: path,
    method: "POST",
    headers: {
      Authorization: "Bearer " + ls.get("t")
    },
    credentials: "include",
    Authorization: "Bearer " + ls.get("t"),
    body: params.img
  };
}

export function createFormDataPutRequest(url, params) {
  const path = helpers.isJudge(_.isEmpty(url))("/", url);
  return {
    url: path,
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + ls.get("t")
    },
    credentials: "include",
    body: qs.stringify(params)
  };
}

export function createFormDataPatchRequest(url, params = {}) {
  const path = helpers.isJudge(_.isEmpty(url))("/", url);
  return {
    url: path,
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + ls.get("t")
    },
    credentials: "include",
    body: qs.stringify(params)
  };
}

export function createGetRequestByQuery(url, params = {}) {
  const path = helpers.isJudge(_.isEmpty(url))("/", url);
  console.log(`${path}?${qs.stringify(params)}`);
  return {
    url: `${path}?${qs.stringify(params)}`,
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + ls.get("t")
    },
    Authorization: "Bearer " + ls.get("t")
  };
}

export function createGetRequestByQueryForDownload(url, params = {}) {
  const path = helpers.isJudge(_.isEmpty(url))("/", url);
  // 请求不带参数的情况下，不对拼接参数以及末尾的问号
  const fetchUrl = Object.keys(params).length === 0 ? path : `${path}?${qs.stringify(params)}`;
  return {
    url: fetchUrl,
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + ls.get("t")
      // 'WWW-Authenticate': wwwAuthenticate,
    },
    responseType: "arraybuffer"
  };
}

export function createDelRequestByQuery(url, params = {}) {
  const path = helpers.isJudge(_.isEmpty(url))("/", url);
  return {
    url: `${path}?${qs.stringify(params)}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + ls.get("t")
    }
  };
}

/**
 * XHR的方式提交formData
 * @param {string} params.url 请求地址
 * @param {formDate} params.data formDate格式
 * @param {function} params.success 成功的回调
 */
export function createXHRPost(params) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      params.success(JSON.parse(xhr.responseText));
    } else {
      if (xhr.response !== "" && xhr.status !== 200) {
        // message.error(JSON.parse(xhr.responseText).message);
      }
    }
  };
  xhr.open("POST", params.url, true);
  xhr.setRequestHeader("client-type", "web");
  xhr.setRequestHeader("Authorization", "Bearer " + ls.get("t"));
  xhr.send(params.data);
}
