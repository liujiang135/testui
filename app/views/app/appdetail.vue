<template>
  <transition name="slide">
    <div>
      <w-header>
        <!--<router-link :to="beforeRoute" class="button button-icon icon ion-ios-arrow-back header-left-icon" slot="left"></router-link>-->
        <a class="button button-icon icon ion-ios-arrow-back header-left-icon" slot="left" @click="routeback"></a>
        <div slot="title">应用详情</div>
        <!--<button class="button button-icon ion-navicon" slot="right"></button>-->
      </w-header>
      <div class="w-content w-content-no-bottom">
        <div class="app-head">
          <table class="app-head-table">
            <tr>
              <td style="width: 80px;">
                <div class="app-head-img">
                  <img v-if="icon !=''" class="loadappimg" height="74" width="74" src="assets/images/app-blank.png" :appicon="icon" onload="loadimg(this)"/>
                </div>
              </td>
              <td style="vertical-align: top; position: relative;">
                <div class="app-head-content">
                  <div class="app-head-title">
                    <div class="app-name">{{title}}</div>
                    <div class="oper-btn">
                      <button v-if="subStatus" class="app-sub-cancel" @click="openApp">
                        打开
                      </button>
                      <button v-else class="app-sub-cancel" @click="subscribe">
                        <w-icon type="plus-round"></w-icon>
                        订阅
                      </button>
                    </div>
                  </div>
                  <div v-html="appVersion"></div>
                  <div class="app-vender">{{appVender}}</div>
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
          <div class="app-func-title">应用描述</div>
          <div class="app-func-descr">{{funcDescr}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

  import Swiper from '../../lib/swipper-master/idangerous.swiper';
  import {$$, openApp} from '../../js/utils/common-utils';
  import httpUtils from '../../js/utils/http-utils';
  import silenceRequest from '../../js/utils/silence-request';
  let methods = {
    /*后退*/
    routeback(){
      this.$router.go(-1);
    },
    /*订阅*/
    subscribe(){
      var that = this;
      var appId = this.appId;
      httpUtils.postRequest('/appstore/subapp', {uId: this.uId, appId: appId}, function(data){
        if(data && data.data && data.data.result){
          $toast.show('订阅成功', 1500);
          that.subStatus = true;
          //重新加载本地缓存
          silenceRequest.intervalAppStore();
        }
      });
    },
    /*打开应用*/
    openApp(){
      $loading.show('请稍等...');
      var appId = this.appId;
      httpUtils.getRequest('/appstore/appdetail?uId=' + this.uId + '&appId=' + appId, function(data){
        var result = data.data || {};
        var appInfo = result.response || {};
        if(appInfo){
          var appEntrance = appInfo.appEntrance;
          var subStatus = appInfo.subStatus;
          if(subStatus){
            openApp(appEntrance);
          }else{
            $loading.hide();
          }
        }else{
          $loading.hide();
        }
      });
    },
    /*查询app详情*/
    appDetail(){
      $loading.show('数据加载中');
      var appId = this.$route.query.appId;
      var that = this;
      httpUtils.getRequest('/appstore/appdetail?uId=' + this.uId + '&appId=' + appId, function(data){
        var result = data.data || {};
        var appInfo = result.response || {};
        if(appInfo){
          that.appId = appInfo.appVersionId;
          that.title = appInfo.appName;
          that.icon = appInfo.appIcon;
          that.pics = appInfo.pcitures || [];
          that.funcDescr = appInfo.appDesc;
          that.appVender = '开发商：' + appInfo.appOwner;
          that.appVersion = '<div class="app-version">' + appInfo.appVersion + '</div>';
          that.subStatus = appInfo.subStatus;
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
        uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
        appId: '',
        icon: '',
        title: '',
        subStatus: false,
        pics: [],
        funcDescr: '',
        appVersion: '',
        appVender: ''
      }
    },
    methods: methods,
    mounted(){
      this.appDetail();
    },
    beforeRouteEnter(to, from, next){
      var appId = to.query.appId;
      var uId = localStorage.getItem('userid');
      httpUtils.getRequest('/appstore/appdetail?uId=' + uId + '&appId=' + appId, function(data){
        var result = data.data || {};
        var appInfo = result.response || {};
        if(appInfo){
          var appEntrance = appInfo.appEntrance;
          var subStatus = appInfo.subStatus;
          if(subStatus){
            openApp(appEntrance);
            return;
          }else{
            next();
          }
        }
      });
    }
  }
</script>
<style>
  @import "../../lib/swipper-master/idangerous.swiper.css";

  .button.header-left-icon{color: #1895ff;}

  .app-head{height: 112px; background-color: #fff; padding: 15px;}
  .app-head-table{width: 100%;}
  .app-head-img{float: left;}
  .app-head-content{padding-left: 19px;}
  .app-head-title{height: 30px;}
  .app-name{font-size: 16px; float: left; white-space: nowrap;}
  .app-version{font-size: 11px; color: #232323; display: inline-block; white-space: nowrap; margin-bottom: 5px; border: 1px solid #232323; border-radius: 5px; padding: 0 5px;}
  .app-vender{font-size: 11px; color: #232323; white-space: nowrap;}
  .app-sub-cancel{background-color: #00bc0d; border: none; height: 26px; color: #fff; border-radius: 13px; font-size: 12px; padding: 0px 10px; float: right;}
  .app-cancel-sub-btn{background-color: #b5b5b5;}


  /*图片*/
  .app-pics{background-color: #fff; height: 322px;}

  .swiper-slide{padding: 0;}
  .app-pics-ul li{float: left; margin: 0 5px;}
  .app-pics-ul li img{border: 1px solid #cfcfcf; width: 186px; height: 322px;}

  /*应用详情*/
  .app-detail-info{padding: 15px; background-color: #fff;}
  .app-func-title{font-size: 16px; line-height: 38px;}
  .app-func-descr{font-size: 12px; line-height: 22px; color: #3f3f3f;}
  .app-serve-content{height: 22px; overflow: hidden;}
  .app-func-sub-title{font-size: 12px; line-height: 26px; margin-top: 22px; color: #3f3f3f;}
  .app-func-more{font-size: 12px;}

  /*自定义content定位*/
  .w-content-no-bottom{bottom: 0;}

  /*slider*/
  .swiper-container {text-align: center;}
  .swiper-slide {width: 1588px; padding-left: 10px;}
  .swiper-scrollbar {width: 100%; position: absolute; left: 0; z-index: 1;}

/*  .slide-enter-active, .slide-leave-active{position: absolute; top: 0; left: 100%; right: 0; bottom: 0; transition: left .1s}
  .slide-enter, .slide-leave-to{left: 0}*/
  .slide-enter-active { position: absolute; top: 0; left: 0; right: 0; bottom: 0; transition: left .1s}
  .slide-enter {left: 100%;}


</style>