export const events = function () {

    const listeners = {};

    function subscribe(type, args) {
        //如果该消息没有注册，直接返回
        if (!listeners[type]) return;
        let events = {
            type: type,
            args: args || {}
        },
            i = 0,
            len = listeners[type].length;
        for (; i < len; i++) {
            listeners[type][i].call(this, events)
        }
    }
    function addListener(type, fn) {
        if (typeof listeners[type] === 'undefined') {
            listeners[type] = [fn];
        } else {
            listeners[type].push(fn);
        }
    }
    function removeListener(type, fn) {
        if (listeners[type] instanceof Array) {
            let i = listeners[type].length - 1;
            for (; i >= 0; i--) {
                listeners[type][i] === fn && listeners[type].splice(i, 1);
            }
        }
    }
    return {
        subscribe,
        addListener,
        removeListener
    }
}()