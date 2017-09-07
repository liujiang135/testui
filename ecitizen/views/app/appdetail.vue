<template>
  <transition name="slide">
    <div>
      <w-header color="blue-bg">
        <!--<router-link :to="beforeRoute" class="button button-icon icon ion-ios-arrow-back header-left-icon" slot="left"></router-link>-->
        <a class="button button-icon icon ion-ios-arrow-left header-left-icon" slot="left" @click="routeback"></a>
        <div slot="title">应用详情</div>
        <!--<button class="button button-icon ion-navicon" slot="right"></button>-->
      </w-header>
      <div class="w-content w-content-no-bottom">
        <div class="app-head">
          <table class="app-head-table">
            <tr>
              <td style="width: 80px;">
                <div class="app-head-img">
                  <img v-if="icon !=''" class="loadappimg" height="74" width="74" :src="icon"/>
                </div>
              </td>
              <td style="vertical-align: top; position: relative;">
                <div class="app-head-content">
                  <div class="app-head-title">
                    <div class="app-name">{{title}}</div>
                  </div>
                  <div class="app-vender">{{appVender}}</div>
                  <div class="app-version">{{appVersion}}</div>
                  <div class="app-sub-times">{{subTimes}}</div>
                  <div class="oper-btn">
                    <!--<div v-html="subButton"></div>-->
                    <button v-if="subStatus && sessionStatus" class="app-sub-cancel" @click="openApp">
                      打开
                    </button>
                    <button v-if="sessionStatus && !subStatus" class="app-sub-cancel" @click="subscribe">
                      <!--<w-icon type="plus-round"></w-icon>-->
                      订阅
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="app-pics">
          <div class="swiper-container">
            <div class="swiper-scrollbar"></div>
            <div class="swiper-wrapper">
              <div id="pics-swiper-slide" class="swiper-slide">
                <ul id="app-pics-ul" class="app-pics-ul">
                  <li v-for="item in pics">
                    <img :src="item"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="app-detail-info">
          <div v-html="funcDescr"></div>
          <!--<div class="app-func-title">功能描述</div>
          <div class="app-func-descr">{{funcDescr}}</div>-->
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

  import Swiper from '../../lib/swipper-master/idangerous.swiper';
  import {$$, openApp,getLocalStorage} from '../../assets/js/utils/common-utils';
  import httpUtils from '../../assets/js/utils/http-utils';
  import config from '../../assets/js/config';
  import silenceRequest from '../../assets/js/utils/silence-request';

  let methods = {
    /*后退*/
    routeback(){
      this.$router.go(-1);
    },
    /*订阅*/
    subscribe(){
      var that = this;
      var appId = this.appId;
      var appName = this.title;
      //第一步：先进行应用授权
      httpUtils.getRequest('/appstore/queryuserappauthinfo?appId=' + appId, function(data){
          if(data && data.data && data.data.result){
              var authorizedModelList = data.data.response;
              if(authorizedModelList != null && authorizedModelList != ""){
                  that.$router.push({ path: 'appauthorization', query: { appId: appId,appName:appName,opsPage:"appdetail"}})
              }else{
                  //订阅
                  httpUtils.postRequest('/appstore/subapp', {appId: appId}, function(data){
                      if(data && data.data && data.data.result){
                          $toast.show('订阅成功', 1500);
                          that.subStatus = true;
                          //重新加载本地缓存
                          silenceRequest.intervalSubcribleApps();
                      }else {
                          $toast.show(data.data.error, 2000);
                      }
                  });
              }
          }
      });
    },
    /*打开应用*/
    openApp(){
      $loading.show('请稍等...');
      var appId = this.appId;
      httpUtils.getRequest('/appstore/appdetail?appId=' + appId, function(data){
        var result = data.data || {};
        var appInfo = result.response || {};
        if(appInfo){
          var appUrl = appInfo.appUrl;
          var subStatus = appInfo.subStatus;
          if(subStatus){
            openApp(appUrl);
          }else{
            $loading.hide();
          }
        }else{
          $loading.hide();
        }
      });
    },
      //从缓存读取应用数据
    getappinfofromcache:function (appId) {
        var categoryApps = JSON.parse(getLocalStorage("categoryApps"));
        for(var category in  categoryApps){
            var catagroyApp = categoryApps[category];
            if(catagroyApp.length > 0){
                for(var  index = 0; index < catagroyApp.length; index ++){
                    if(appId == catagroyApp[index].appId){
                        return catagroyApp[index];
                    }
                }
            }
        }
    },
    /*查询app详情*/
    appDetail(){
       $loading.show('数据加载中');
       var appId = this.$route.query.appId;
       var that = this;
        var categoryApps = JSON.parse(getLocalStorage('categoryApps'));
       if(categoryApps){
           var appInfo = this.getappinfofromcache(appId);
           that.appId = appInfo.appId;
           that.title = appInfo.appName_cn;
           that.icon = appInfo.appIcon;
           that.funcDescr = '<div class="app-func-title">功能描述</div><div class="app-func-descr">'+appInfo.app_Description+'</div>';
           that.appVender = '开发商：' + appInfo.vendor_Name;
           that.appVersion = '版本号：' + appInfo.appVersion;
           that.subStatus = appInfo.subStatus;
           that.subTimes = '订阅数：';
       }
       httpUtils.getRequest('/appstore/appdetail?appId=' + appId, function(data){
        var result = data.data || {};
        var appInfo = result.response || {};
        if(appInfo){
          that.appId = appInfo.appId;
          that.title = appInfo.appName_cn;
          that.icon = appInfo.appIcon;
          that.funcDescr = '<div class="app-func-title">功能描述</div><div class="app-func-descr">'+appInfo.app_Description+'</div>';
          that.appVender = '开发商：' + appInfo.vendor_Name;
          that.appVersion = '版本号：' + appInfo.appVersion;
          that.subStatus = appInfo.subStatus;
          that.subTimes = '订阅数：'+appInfo.subCount+'次';
         /* if(that.subStatus){
              that.subButton = '<button class="app-sub-cancel" @click="openApp">打开 </button>';
          }else{
              that.subButton = '<button class="app-sub-cancel" @click="subscribe">订阅 </button>';
          }*/
        }
      });
      //获取应用详情轮播图片
      httpUtils.getRequest('/appstore/appdetailimage?appId=' + appId, function(data) {
         var result = data.data.response || [];
         for(var i in result){
             that.pics.push(result[i].demoImageContent);
         }
        /*计算slider的宽度*/
          $$('pics-swiper-slide').style.width = (that.pics.length * 196 + 10) + 'px';
          setTimeout(function(){
              var mySwiper = new Swiper('.swiper-container',{
                  scrollContainer: true,
                  scrollbar: {
                      container: '.swiper-scrollbar'
                  }
              });
          });
          $loading.hide();
      });
    }
  };
  export default {
    data() {
      return {
        sessionStatus:false,
        appId: '',
        icon: '',
        title: '',
        subStatus: false,
        pics: [],
        funcDescr: '',
        appVersion: '',
        appVender: '',
        subTimes:'',
//        subButton:''
      }
    },
    methods: methods,
    mounted(){
        var that = this;
        httpUtils.getRequest('/common/checkSessionindex', function(data) {
            if(data && data.data.result =='success') {
                that.sessionStatus = true;
            } else {
                that.sessionStatus = false;
            }
            that.appDetail();
        });
    },
    beforeRouteEnter(to, from, next){
      var appId = to.query.appId;
        httpUtils.getRequest('/appstore/appdetail?appId=' + appId, function(data){
        var result = data.data || {};
        var appInfo = result.response || {};
        if(appInfo){
          var appUrl = appInfo.appUrl;
          var subStatus = appInfo.subStatus;
          if(subStatus){
            openApp(appUrl);
            return;
          }else{
            next();
          }
        }
      });
    }
  }
</script>
<style scoped>
  @import "../../lib/swipper-master/idangerous.swiper.css";

  .w-content{background-color: #fff}
  .app-head{padding: 10px;}
  .app-head-table{width: 100%;}
  /*.app-head-table tr td{text-align: center}*/
  .app-head-img{float: left;}
  .app-head-content{padding-left: 6px;}
 /* .app-head-title{height: 30px;}*/
  .app-name{font-size: 16px;}
  .app-version{font-size: 12px; color: #909090; white-space: nowrap;}
  .oper-btn{position: absolute;bottom: 2px;left: 78%}
  .app-vender{font-size: 11px; color: #909090; white-space: nowrap;}
  .app-sub-times{font-size: 11px; color: #909090;white-space: nowrap;}
  .app-sub-cancel{background-color: #fff; border: 1px solid #37baf3; height: 26px; color: #37baf3; border-radius: 13px; font-size: 12px; padding: 0px 10px;}
  .app-cancel-sub-btn{background-color: #b5b5b5;}


  /*图片*/
  .app-pics{height: 322px;}

  .swiper-slide{padding: 0;}
  .app-pics-ul li{float: left; margin: 0 5px 0px 0px;}
  .app-pics-ul li img{width: 186px; height: 322px;}

  /*应用详情*/
  .app-detail-info{padding: 15px;}
  .app-func-title{font-size: 16px; line-height: 38px;}
  .app-func-descr{font-size: 12px; line-height: 22px; color: #3f3f3f;}
  .app-serve-content{height: 22px; overflow: hidden;}
  .app-func-sub-title{font-size: 12px; line-height: 26px; margin-top: 22px; color: #3f3f3f;}
  .app-func-more{font-size: 12px;}

  /*自定义content定位*/
  .w-content-no-bottom{bottom: 0;}

  /*slider*/
  .swiper-container {text-align: center;}
  .swiper-slide {width: 1588px; padding-left: 15px;}
  .swiper-scrollbar {width: 100%; position: absolute; left: 0; z-index: 1;}

/*  .slide-enter-active, .slide-leave-active{position: absolute; top: 0; left: 100%; right: 0; bottom: 0; transition: left .1s}
  .slide-enter, .slide-leave-to{left: 0}*/
  .slide-enter-active { position: absolute; top: 0; left: 0; right: 0; bottom: 0; transition: left .1s}
  .slide-enter {left: 100%;}


</style>