import * as _ from "lodash"
const initState = {
    memberDetail: {},
    memberInfo: {},
    userInfo: {},
    loggedIn: false,
    emptyFieldAlert: false,
    invalidIdOrPasswordAlert: false,
    userNameAvailable: false,
    userNameNotAvailable: false,
    displayNameChangeSuccess: false,
};
export default function userReducer(state = initState, action) {
    try {
        switch (action.type) {
            case "reducer/member/memberInfo":
                let updatedState = { ...state };
                updatedState.loggedIn = true;
                updatedState.recallMemberInfo = false;
                updatedState.memberInfo = action.payload.memberInfo;
                updatedState.memberDetail = action.payload.memberDetail;
                return _.assign({}, updatedState);

            case "reducer/user/userLogin":
                updatedState = { ...state };
                updatedState.loggedIn = true;
                updatedState.memberInfo = action.payload.memberInfo;
                return _.assign({}, updatedState);

            case "reducer/forceLogout":
                updatedState = { ...state };
                updatedState.loggedIn = false;
                return _.assign({}, updatedState);

            case "reducer/user/userLogout":
                return _.assign({}, initState);

            case "reducer/emptyFieldAlert":
                updatedState = { ...state };
                updatedState.emptyFieldAlert = true;
                updatedState.invalidIdOrPasswordAlert = false;
                return _.assign({}, updatedState);

            case "reducer/invalidIdOrPasswordAlert":
                updatedState = { ...state };
                updatedState.emptyFieldAlert = false;
                updatedState.invalidIdOrPasswordAlert = true;
                return _.assign({}, updatedState);

            case "reducer/userNameAvailable":
                updatedState = { ...state };
                updatedState.userNameAvailable = true;
                updatedState.userNameNotAvailable = false;
                return _.assign({}, updatedState);

            case "reducer/userNameNotAvailable":
                updatedState = { ...state };
                updatedState.userNameAvailable = false;
                updatedState.userNameNotAvailable = true;
                return _.assign({}, updatedState);

            case "reducer/emailAvailable":
                updatedState = { ...state };
                updatedState.emailAvailable = true;
                updatedState.emailNotAvailable = false;
                return _.assign({}, updatedState); 

            case "reducer/emailNotAvailable":
                updatedState = { ...state };
                updatedState.emailAvailable = false;
                updatedState.emailNotAvailable = true;
                return _.assign({}, updatedState);

            default:
                return state;
        }
    } catch (e) {
        return state;
    }
};
