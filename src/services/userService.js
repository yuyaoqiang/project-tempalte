import { request } from "@/utils";
import * as methods from "../utils/requestMethod";

export const login = function(params) {
  const url = "/auth/login";
  return request(methods.createFormDataPostRequest(url, params));
};

export const logout = function(params) {
  const url = "/auth/logout";
  console.log("logout userService called");
  return request(methods.createFormDataPostRequest(url, params));
};

export const register = function(params) {
  const url = "/member/registration";
  return request(methods.createFormDataPostRequest(url, params));
};

export const handleMemberInfo = function(params) {
  const url = "/member/memberInfo";
  return request(methods.createGetRequestByQuery(url, params));
};

export const checkUserNameAvailability = function(params) {
  const url = "/isUsernameExist";
  return request(methods.createFormDataPostRequest(url, params));
};

export const checkEmailAvailability = function(params) {
  const url = "/isEmailExist";
  return request(methods.createFormDataPostRequest(url, params));
};

export const uploadProfileImage = function(params) {
  const url = "/member/uploadImg";
  return request(methods.createFormDataImagePostRequest(url, params));
};

export const uploadCoverPhoto = function(params) {
  const url = "/member/uploadCover";
  return request(methods.createFormDataImagePostRequest(url, params));
};

export const updateDisplayName = function(params) {
  const url = "/member/udp/displayName";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updateIntroduction = function(params) {
  const url = "/member/udp/description";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updatePrimaryJob = function(params) {
  const url = "/member/udp/primaryJob";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updateSecondaryJob = function(params) {
  const url = "/member/udp/secondaryJob";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updateCompany = function(params) {
  const url = "/member/udp/company";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updateEducation = function(params) {
  const url = "/member/udp/education";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updateSchool = function(params) {
  const url = "/member/udp/school";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updateWebsite = function(params) {
  const url = "/member/udp/website";
  return request(methods.createFormDataPostRequest(url, params));
};

export const updateCurrentCity = function(params) {
  const url = "/member/udp/currentCity";
  return request(methods.createFormDataPostRequest(url, params));
};

export const getUserProfileInfo = function(params) {
  const url = "/member/profile";
  return request(methods.createGetRequestByQuery(url, params));
};
