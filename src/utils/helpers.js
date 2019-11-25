export const isJudge = function (flag) {
    return function (first, second) {
        if (flag) {
            return first
        } else {
            return second
        }
    }
}
export const createdAction = function (type, payload) {
    return {
        type,
        payload: payload || {}
    }
}