<template>
  <transition name="slide">
    <div>
      <w-header color="blue-bg">
        <a class="button button-icon icon ion-ios-arrow-back header-left-icon" slot="left" @click="routeback"></a>
        <div slot="title">应用授权</div>
      </w-header>
      <div class="w-content">
        <div class="app-auth-main">
          <div class="app-auth-head">
            <div class="app-head-icon">
              <img v-if="icon !=''" height="74" width="74" :src="icon"/>
            </div>
            <div class="app-head-appName">{{appName}}</div>
          </div>
          <div class="app-auth-content">
            <div class="app-auth-content-head">{{appName}}将获得以下权限：</div>
            <div class="app-auth-content-list">
              <div v-html="authInfoDescription"></div>
            </div>
            <!--<div class="app-auth-content-tip">授权后表明你已同意<a>《居民通授权协议》</a></div>-->
          </div>
        </div>
        <div  class="app-auth-confirm-button">
            <w-button class='confirm-auth-btn' @click="confirmAuth">确认授权</w-button>
        </div>
    </div>
    </div>
  </transition>
</template>
<script>
  import {$$, openApp,getLocalStorage, setLocalStorage} from '../../assets/js/utils/common-utils';
  import httpUtils from '../../assets/js/utils/http-utils';
  import silenceRequest from '../../assets/js/utils/silence-request';
  let methods = {
    /*后退*/
    routeback(){
      this.$router.go(-1);
    },
    getAPPiconAndAppName:function (appId) {
        var categoryApps = JSON.parse(getLocalStorage("categoryApps"));
        for(var category in  categoryApps){
            var catagroyApp = categoryApps[category];
            if(catagroyApp.length > 0){
                for(var  index = 0; index < catagroyApp.length; index ++){
                    if(appId == catagroyApp[index].appId){
                        return {"appName":catagroyApp[index].appName_cn,"appIcon":catagroyApp[index].appIcon};
                    }
                }
            }
        }
    },
    /*查询app应用数据授权项*/
    appAuthorizationData(){
      $loading.show('数据加载中');
      var appId = this.$route.query.appId;
      var appName = this.$route.query.appName;
      var opsPage = this.$route.query.opsPage;
      var that = this;
      that.appId = appId;
      that.appName = appName;
      that.opsPage = opsPage;
      //获取app图标
        var appinfo = that.getAPPiconAndAppName(appId);
        that.icon = appinfo.appIcon;
      //获取授权项信息
      httpUtils.getRequest('/appstore/appauthorizationdata?appId=' + appId, function(data){
          var result = data.data || {};
          var appAuthorizationDataInfo = result.response || {};
          if(appAuthorizationDataInfo.hasPreAuthorization != null){
              if(appAuthorizationDataInfo.hasPreAuthorization){
                  var authInfoDescriptionStr = "";
                  for(var i = 0; i < appAuthorizationDataInfo.authorizedModelList.length; i++){
                      var obj = appAuthorizationDataInfo.authorizedModelList[i];

                      if(obj.request == 0){
                          authInfoDescriptionStr = authInfoDescriptionStr + '<div><input class="mui-checkbox" type="checkbox" v-model="checkAuthorizedModelList" /><label class="checkboxName">'+ obj.groupDescription + '</label></div>';
                      }else if(obj.request == 1){
                          authInfoDescriptionStr = authInfoDescriptionStr + '<div><input class="mui-checkbox" type="checkbox" v-model="checkAuthorizedModelList" checked="checked"/><label class="checkboxName">'+ obj.groupDescription + '</label></div>';
                      }else {
                          authInfoDescriptionStr = authInfoDescriptionStr + '<div><input class="mui-checkbox" type="checkbox" v-model="checkAuthorizedModelList" disabled/><label class="checkboxName">'+ obj.groupDescription + '</label></div>';
                      }

                      if(obj.appResModelLists.length > 1){
                          for(var j = 0; j < obj.appResModelLists.length; j++){
                              that.appResModelList.push(obj.appResModelLists[j]);
                          }
                      }else{
                          that.appResModelList.push(obj.appResModelLists[0]);
                      }
                      if(obj.appViewModelLists.length > 1){
                          for(var k = 0; k < obj.appViewModelLists.length; k++){
                              that.appViewModelList.push(obj.appViewModelLists[k]);
                          }
                      }else{
                          that.appViewModelList.push(obj.appViewModelLists[0]);
                      }
                  }
                  that.authInfoDescription = authInfoDescriptionStr;
              }else{
                  $toast.show("没有授权项", 1500);
              }
          }else{
              $toast.show("应用状态不正常", 1500);
          }
          $loading.hide();
      });
    },
    /*确认授权*/
    confirmAuth(){
        var that = this;
        var appId = this.appId;
        var opsPage = this.opsPage;
        var appResModeStr = "";
        var appViewModelStr = "";
        for(var i = 0; i < that.appResModelList.length; i++){
            appResModeStr = appResModeStr + that.appResModelList[i];
        }
        for(var j = 0; j < that.appViewModelList.length; j++){
            appViewModelStr = appViewModelStr + that.appViewModelList[j];
        }
        $loading.show('应用订阅中...');
        //订阅并保存授权信息
        httpUtils.postRequest('/appstore/subapp', {appId: appId}, function(data){
            if(data && data.data && data.data.result){
                httpUtils.postRequest('/appstore/saveuserappauthinfo', {appId: appId,authorizeReadable:appResModeStr,authorizeWritable:appViewModelStr}, function(data){
                    $loading.show('应用授权中...');
                    if(data && data.data && data.data.result){
                        $toast.show('应用授权成功:)');
                        silenceRequest.intervalSubcribleApps(); //初始化用户订阅应用数据
                        setTimeout(function () {
                            that.$router.push({ path: 'subscribe'});
                        },1000);
                    }else {
                        $toast.show('应用授权失败，请重试');
                    }
                });
            }else {
                $toast.show(data.data.response, 2000);
            }
        });
    }
  };
  export default {
    data() {
      return {
        appId: '',
        appName:'',
        icon: '',
        opsPage:'',
        authInfoDescription:'',
        appResModelList:[],
        appViewModelList:[]
      }
    },
    methods: methods,
    mounted(){
      this.appAuthorizationData();
    }
  }
</script>
<style>
  /*返回按钮*/
  .button.header-left-icon{color: #fff;}

  /*主体部分*/
  .app-auth-main{width: 90%;min-height: 250px;margin-top: 20px;margin-left: auto;margin-right: auto;border: 1px solid #EEE;border-radius: 5px}

  /*主体头部*/
  .app-auth-head{height: 125px;background: #13B5EF;text-align: center;border-radius: 5px 5px 0 0}
  .app-head-icon{display: inline-block;margin-top: 15px}
  .app-head-appName{color: #fff;font-size: 14px}

  /*主体内容*/
  .app-auth-content{margin-top: 25px}
  .app-auth-content-head{margin-left: 20px;font-size: 14px}
  .app-auth-content-list{margin-left: 20px;margin-top: 10px;font-size: 12px}
  .app-auth-content-list ul{list-style: disc;margin-left: 16px;}
  .app-auth-content-list ul li{margin-top: 5px;color: #676767}
  .app-auth-content-tip{margin-left: 20px;margin-top: 10px;font-size: 14px}

  /*复选框*/
  .mui-checkbox{position: relative;width: 18px;height: 18px;top: 3px;margin-right: 10px;background-color: #FFFFFF;border: solid 1px #d9d9d9;border-radius: 20px;background-clip: padding-box;display: inline-block;-webkit-appearance: none;}
  .mui-checkbox:checked {background-color: #18b4ed!important;border: 1px solid transparent;top: 3px;}
  .mui-checkbox:checked:before {content: '';position: absolute;width: 6px;height: 10px;background: transparent;top: 2px;right: 5px;border: 2px solid #fff;border-top: none;  border-left: none;-webkit-transform: rotate(35deg);-moz-transform: rotate(35deg);-o-transform: rotate(35deg);-ms-transform: rotate(35deg);transform: rotate(35deg);}
  .mui-checkbox:disabled{background-color: #d9d9d9!important;border:1px solid transparent;top: 3px;}
  .mui-checkbox:disabled:before {content: '';position: absolute;width: 6px;height: 10px;background: transparent;top: 2px;right: 5px;border: 2px solid #fff;border-top: none;  border-left: none;-webkit-transform: rotate(35deg);-moz-transform: rotate(35deg);-o-transform: rotate(35deg);-ms-transform: rotate(35deg);transform: rotate(35deg);}
  .checkboxName{margin-left: 3px}

  /*按钮*/
  .app-auth-confirm-button{margin-top: 30px;text-align: center}
  .confirm-auth-btn,  .confirm-auth-btn:hover{width: 90%;		border-radius: 25px;
    background: linear-gradient(90deg,#1acbe9, #37BAF3,#1F99D1); /* 标准的语法 */
    border:0;
    font-size: 16px;color: white;letter-spacing: 1px;}
</style>