import { ofType } from "redux-observable";
import { mergeMap, map, mapTo, tap } from "rxjs/operators/";
import { userApi } from "../services";
import { helpers, ls } from "../utils";

export const userEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/user/userLogin"),
    mergeMap(action => {
      return userApi.login(action.payload).pipe(
        map(res => {
          if (res.status === true) {
            ls.set("t", res.data.accessToken);
            //第三步 如果请求成功 就会根据下面type去对应的reducer做更新   action={type:user/userLogin,payload:{}}
            return helpers.createdAction("reducer/user/userLogin", {
              memberInfo: res.data.memberInfo,
              loggedIn: true
            });

            //第四步 当reducer更新完毕后  对应的视图就会监听到变化,重新渲染页面
          } else if (res.respondCode === "ac_0001") {
            return helpers.createdAction("reducer/emptyFieldAlert");
          } else if (res.respondCode === "ac_0002") {
            return helpers.createdAction("reducer/invalidIdOrPasswordAlert");
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userLogoutEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/auth/logout"),
    mergeMap(action => {
      return userApi.logout(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res) {
            ls.remove("t");
            return helpers.createdAction("reducer/user/userLogout", {});
          } else return helpers.createdAction("null");
        })
      );
    })
  );
};

export const userInfoEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/memberInfo"),
    mergeMap(action => {
      return userApi.handleMemberInfo(action.payload).pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else {
            return helpers.createdAction("reducer/forceLogout");
          }
        })
      );
    })
  );
};

export const userRegisterEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/user/userRegister"),
    mergeMap(action => {
      console.log(action.payload);
      return userApi.register(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
            console.log("REGISTERED");
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userCheckUserNameAvailabilityEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/user/register/isUsernameExist"),
    mergeMap(action => {
      return userApi.checkUserNameAvailability(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
            return helpers.createdAction("reducer/userNameAvailable", {});
          } else if (res.status === false) {
            return helpers.createdAction("reducer/userNameNotAvailable", {});
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userCheckEmailAvailabilityEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/user/register/isEmailExist"),
    mergeMap(action => {
      return userApi.checkEmailAvailability(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
            return helpers.createdAction("reducer/emailAvailable", {});
          } else if (res.status === false) {
            return helpers.createdAction("reducer/emailNotAvailable", {});
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUploadProfileImageEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/uploadImg"),
    mergeMap(action => {
      return userApi.uploadProfileImage(action.payload).pipe(
        map(res => {
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUploadCoverPhotoEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/uploadCover"),
    mergeMap(action => {
      return userApi.uploadCoverPhoto(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateDisplayNameEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/displayName"),
    mergeMap(action => {
      return userApi.updateDisplayName(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateIntroductionEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/description"),
    mergeMap(action => {
      return userApi.updateIntroduction(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdatePrimaryJobEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/primaryJob"),
    mergeMap(action => {
      return userApi.updatePrimaryJob(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateSecondaryJobEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/secondaryJob"),
    mergeMap(action => {
      return userApi.updateSecondaryJob(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateCompanyEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/company"),
    mergeMap(action => {
      return userApi.updateCompany(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateEducationLevelEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/education"),
    mergeMap(action => {
      return userApi.updateEducation(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateSchoolEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/school"),
    mergeMap(action => {
      return userApi.updateSchool(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateWebsiteEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/website"),
    mergeMap(action => {
      return userApi.updateWebsite(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

export const userUpdateCurrentCityEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/member/upd/currentCity"),
    mergeMap(action => {
      return userApi.updateCurrentCity(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
          } else if (res.status === false) {
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    }),
    mergeMap(() => {
      return userApi.handleMemberInfo().pipe(
        map(res => {
          if (res.status === true) {
            return helpers.createdAction("reducer/member/memberInfo", {
              memberDetail: res.data.memberDetail,
              memberInfo: res.data.memberInfo
            });
          } else return helpers.createdAction("reducer/forceLogout");
        })
      );
    })
  );
};

// OTHER USER CALL STARTS FROM HERE //

export const userGetProfileInfoEpic = action$ => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/user/getUserProfileInfo"),
    mergeMap(action => {
      return userApi.getUserProfileInfo(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
            //第三步 如果请求成功 就会根据下面type去对应的reducer做更新   action={type:user/userLogin,payload:{}}
            //第四步 当reducer更新完毕后  对应的视图就会监听到变化,重新渲染页面
          } else if (res.respondCode === "ac_0001") {
            return helpers.createdAction("reducer/emptyFieldAlert");
          } else if (res.respondCode === "ac_0002") {
            return helpers.createdAction("reducer/invalidIdOrPasswordAlert");
          } else {
            console.log("none of the if condition found");
          }
          // return helpers.createdAction("reducer/forceLogout")
        })
      );
    })
  );
};
