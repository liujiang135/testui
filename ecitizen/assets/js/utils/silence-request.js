import httpUtils from './http-utils';
import {setLocalStorage,setSessionStorage} from './common-utils';
const uId = localStorage.getItem('userid');
var silenceRequest = {
  /*后台初始化app store页面数据*/
  intervalAppStore(){
    httpUtils.silenceGetRequest('/appstore/applist', function(data){
      if(data && data.data){
        // console.log(data.data);
        setLocalStorage('recommendApps', JSON.stringify(data.data.recommendApps));
        setLocalStorage('subsApps', JSON.stringify(data.data.subsApps));
        setLocalStorage('categoryApps', JSON.stringify(data.data.categoryApps));
      }
    });
  },
/*后台初始化用户订阅应用页面数据*/
  intervalSubcribleApps(){
    httpUtils.silenceGetRequest('/appstore/myapplist', function(data){
        if(data && data.data){
            setLocalStorage('subsApps', JSON.stringify(data.data.response));
        }
    });
   },
  /*后台初始化message数据*/
  intervalMessage(){
      var uId = localStorage.getItem('userid') ? localStorage.getItem('userid') : 0;
      httpUtils.silenceGetRequest("/message/getallmessage?userid=" + uId, function(data) {
          if(data && data.data){
              setLocalStorage("messagelist", JSON.stringify(data.data.response));
          }
      })
  },
    /*后台初始化用户数据*/
  intervalUserinfo(){
      var uId = localStorage.getItem('userid') ? localStorage.getItem('userid') : 0;
      httpUtils.silenceGetRequest("/userinfo/ajaxgetuserinfo", { userid: uId }, function (data) {
          if(data && data.data){
              setSessionStorage("userinfocontent", JSON.stringify(data.data.data));
          }
      })
  },
    initMessageUnreadCount( callback){
        httpUtils.getRequest("/message/getallmessage?userid=" + localStorage.getItem('userid'), function(data) {
            var unreadCount = data.data.unReadCount || 0;
            callback(unreadCount);
        });

    },
};
export default silenceRequest;