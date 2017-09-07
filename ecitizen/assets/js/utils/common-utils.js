import config from '../config'
import httpUtils from './http-utils';
let $$ = function(domId){
    return document.getElementById(domId);
};
let openApp = function (url) {
    cordova.ThemeableBrowser.open(url,config.browser_target, config.browser_options).addEventListener('loadstart', function(e) {
        $toast.hide();
    }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        $toast.show(e.message);
    });
};
let setLocalStorage = function(key, jsonStrVal){
    let data = {};
    data.data = jsonStrVal || null;
    data.timeStamp = new Date().toString();
    localStorage.setItem(key, JSON.stringify(data));
};
/**
 *
 * @param key localStorage中的key值
 * @param offsetSeconds 当前时间与缓存中的数据时间戳之差大于该值时，缓存中的数据太旧，将被清空。（默认为365天）
 * @returns {*}
 */
let getLocalStorage = function(key, offsetSeconds){
    let item = JSON.parse(localStorage.getItem(key));
    if(item){
        let timeStamp = item.timeStamp;
        if(offsetTimeInSeconds(timeStamp) > (offsetSeconds || 365*24*3600)){
            localStorage.removeItem(key);
            return null;
        }else{
            return item.data;
        }
    }else{
        return null;
    }
};
/*设置sessionStorage*/
let setSessionStorage = function(key, jsonStrVal){
    let data = {};
    data.data = jsonStrVal || null;
    data.timeStamp = new Date().toString();
    sessionStorage.setItem(key, JSON.stringify(data));
};
let getSessionStorage = function(key, offsetSeconds){
    let item = JSON.parse(sessionStorage.getItem(key));
    if(item){
        let timeStamp = item.timeStamp;
        if(offsetTimeInSeconds(timeStamp) > (offsetSeconds || 365*24*3600)){
            sessionStorage.removeItem(key);
            return null;
        }else{
            return item.data;
        }
    }else{
        return null;
    }
};
/**
 * 当前时间与指定时间的偏离秒数
 * @param dateTimeStr 指定时间字符串
 * @returns {number}
 */
let offsetTimeInSeconds = function(dateTimeStr){
    let now = Date.parse(new Date().toString());
    let dateMillis = Date.parse(dateTimeStr);
    return (now - dateMillis)/1000;
};
let checkSessionIndex = function () {
    httpUtils.getRequest('/common/checkSessionindex', function(data) {
        if(data && data.data.result != 'success') {
            localStorage.removeItem('userid');
            localStorage.removeItem('sessionIndex');
            localStorage.removeItem('subsApps');
            localStorage.removeItem('messagelist');
        }
    });
};

//设置tabbar的消息未读数
let setTabbarMessageUnreadCount = function (unreadCount) {
    var  dom =  $$("message_bottom_num");
    if(unreadCount > 0){
        dom.innerHTML = unreadCount;
        dom.style.display = "block";
    }else {
        dom.style.display = "none";
    }
}
//更新tabbar的消息未读数
let updateTabbarMessageUnreadCount = function (readedCount) {
    let unreadCount = parseInt($$("message_bottom_num").innerText);
    console.log("+++++++++unreadCount ==== "+unreadCount);
    let newUnreadCount = unreadCount - readedCount;
    setTabbarMessageUnreadCount(newUnreadCount);
}
export {
    $$,
    openApp,
    setLocalStorage,
    getLocalStorage,
    setSessionStorage,
    getSessionStorage,
    offsetTimeInSeconds,
    checkSessionIndex,
    setTabbarMessageUnreadCount,
    updateTabbarMessageUnreadCount,
}
