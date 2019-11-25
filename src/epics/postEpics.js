import { ofType } from "redux-observable";
import { mergeMap, map, mapTo, tap } from "rxjs/operators/";
import { postApi } from "../service";
import { helpers, ls } from "../utils";

export const postCreateEpic = (action$) => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/post/createPost"),
    mergeMap(action => {
      return postApi.createPost(action.payload).pipe(
        map(res => {
          if (res.status === true) {
            console.log(res)
            // ls.set('t', res.data.accessToken)
            // //第三步 如果请求成功 就会根据下面type去对应的reducer做更新   action={type:user/userLogin,payload:{}}
            // return helpers.createdAction("reducer/user/userLogin", {
            //   memberInfo: res.data.memberInfo,
            //   loggedIn: true,
            // })

            //第四步 当reducer更新完毕后  对应的视图就会监听到变化,重新渲染页面
          } else if (res.respondCode === "ac_0001") {
            console.log(res)
            return helpers.createdAction("reducer/emptyFieldAlert")
          } else if (res.respondCode === "ac_0002") {
            console.log(res)
            return helpers.createdAction("reducer/invalidIdOrPasswordAlert")
          } else {
            console.log(res)
            return helpers.createdAction("reducer/forceLogout")
          }
        })
      )
    })
  );
}

export const postUploadImageEpic = (action$) => {
  return action$.pipe(
    //第二步 会匹配到这里,触发我们的ajax请求
    ofType("action/subpost/uploadFile"),
    mergeMap(action => {
      console.log("postUploadImageEpic TRIGGERED")
      return postApi.uploadImage(action.payload).pipe(
        map(res => {
          console.log(res);
          if (res.status === true) {
            //第三步 如果请求成功 就会根据下面type去对应的reducer做更新   action={type:user/userLogin,payload:{}}

            return helpers.createdAction("reducer/post/uploadedImageURL", {
              uploadedImageURL: res.data.fileUrl,
            })

            //第四步 当reducer更新完毕后  对应的视图就会监听到变化,重新渲染页面
          } else if (res.respondCode === "ac_0001") {
            console.log(res)
            return helpers.createdAction("reducer/emptyFieldAlert")
          } else if (res.respondCode === "ac_0002") {
            console.log(res)
            return helpers.createdAction("reducer/invalidIdOrPasswordAlert")
          } else {
            return helpers.createdAction("reducer/forceLogout")
          }
        })
      )
    })
  );
}