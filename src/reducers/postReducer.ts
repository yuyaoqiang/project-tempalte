import * as _ from "lodash";

const initState = {
  uploadedImageURL: null
};

export default function postReducer(state = initState, action) {
  try {
    switch (action.type) {
      case "reducer/post/uploadedImageURL":
        let updatedState = { ...state };
        updatedState.uploadedImageURL = action.payload.uploadedImageURL;

        return _.assign({}, updatedState);
      default:
        return state;
    }
  } catch (e) {
    return state;
  }
}
