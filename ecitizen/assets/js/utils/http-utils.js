import axios from 'axios';
import config from '../config'
var axios_config = {

  baseURL: config.axios_baseURL,
  timeout: 20000,
  withCredentials: false,
  responseType: 'json',
  transformResponse: [function (data) {
    // console.log('【Response】: ' + JSON.stringify(data));
    return data;
  }]
};
function extend(target, source) {
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
}
function handleError(error) {
  var err = error || {};
  console.log(error)
  if (err.toString().match(/.*Error.*timeout.*/)) {
    $toast.show(':( 请求超时！', 1500);
  } else if (err.toString().match(/.*Error.*code.*404.*/)) {
    $toast.show(':( 数据源错误~', 1500);
  } else if (err.toString().match(/.*Error.*Network.*Error.*/)) {
    $toast.show(':( 网络异常！', 1500);
  } else if (err.toString().match(/.*500.*/)) {
      $toast.show(':( 服务器内部错误！', 1500);
  }else if (err.toString().match(/.*Cannot.*read.*property.*style.*null.*/)) {
    //当打开应用详情时，数据加载过程中立即点击返回，会提示这个错误
    //这里默默地吞掉这个错误，不弹框提示
    $loading.hide();
    console.log(err.toString());
  } else {
    console.log(err.toString());
    $toast.show(err, 1500);
  }
}
var httpUtils = {
  /**
   * 发起http get请求,共三个参数，第二个和第三个参数可以省略
   * @param url 请求地址
   * @param params 参数 [类型：Object]
   * @param callback 回调函数，有一个参数，为请求返回的response对象
   */
  getRequest(url, params, callback){
    try {
      if (arguments.length > 1 && (typeof params).toLowerCase() == 'function') {
        callback = params;
        params = {};
      }
      axios_config.headers = {'Authentication-Token': localStorage.getItem('sessionIndex')};
      let promise = axios(extend(axios_config, {
        method: 'get',
        url: url,
        params: params
      }));
      if (callback) {
        promise.then(callback).catch(function (error) {
          handleError(error);
          throw error;
        });
      }
    } catch (e) {
      handleError(e);
    }
  },
  /**
   * 发起http post请求,共三个参数，第二个和第三个参数可以省略
   * @param url 请求地址
   * @param params 参数 [类型：Object]
   * @param callback 回调函数，有一个参数，为请求返回的response对象
   */
  postRequest(url, params, callback){
    try {
      if (arguments.length > 1 && (typeof params).toLowerCase() == 'function') {
        callback = params;
        params = {};
      }
      axios_config.headers = {'Authentication-Token': localStorage.getItem('sessionIndex')};
      let promise = axios(extend(axios_config, {
        method: 'post',
        url: url,
        data: params
      }));
      if (callback) {
        promise.then(callback).catch(function (error) {
          handleError(error);
          throw error;
        });
      }
    } catch (e) {
      handleError(e);
    }
  },
  /**
   * 静默请求，遇到异常不弹框提示
   * 发起http get请求,共三个参数，第二个和第三个参数可以省略
   * @param url 请求地址
   * @param params 参数 [类型：Object]
   * @param callback 回调函数，有一个参数，为请求返回的response对象
   */
  silenceGetRequest(url, params, callback){
    try {
      if (arguments.length > 1 && (typeof params).toLowerCase() == 'function') {
        callback = params;
        params = {};
      }
      axios_config.headers = {'Authentication-Token': localStorage.getItem('sessionIndex')};
      let promise = axios(extend(axios_config, {
        method: 'get',
        url: url,
        params: params
      }));
      if (callback) {
        promise.then(callback).catch(function (error) {
          console.error(error);
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * 检测网络
   */
  checkNetwork(){
    if (typeof  navigator.connection != undefined) {
      var networkState = navigator.connection.type;
      if (networkState == 'none') {
        window.plugins.toast.show(':( 网络已断开，请重新开启您的网络！', 1000, 'center');
        return false;
      }
    }
  }
};
export default httpUtils;