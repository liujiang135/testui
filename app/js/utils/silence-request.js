import httpUtils from './http-utils';
import {setLocalStorage,setSessionStorage} from './common-utils';
const uId = localStorage.getItem('userid');
var silenceRequest = {
  /*后台初始化app store页面数据*/
  intervalAppStore(){
    var uId = localStorage.getItem('userid') ? localStorage.getItem('userid') : 0;
    httpUtils.silenceGetRequest('/appstore/applist', {uId: uId}, function(data){
      if(data && data.data){
        // console.log(data.data)
        setLocalStorage('recommendApps', JSON.stringify(data.data.recommendApps));
        setLocalStorage('favoriteApps', JSON.stringify(data.data.favoriteApps));
        setLocalStorage('categoryApps', JSON.stringify(data.data.categoryApps || []));
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
};
export default silenceRequest;