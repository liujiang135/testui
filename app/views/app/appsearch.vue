<template>
  <transition name="slide">
    <div class="app-search">
      <w-header>
        <router-link to="/appstore" class="button button-icon icon ion-ios-arrow-back header-left-icon" slot="left"></router-link>
        <div slot="title">
          <w-search v-model="keywords" :on-search="search" placeholder="搜索应用"></w-search>
        </div>
      </w-header>
      <div class="w-content w-content-no-bottom">
        <div v-if="keywords">
          <!--<div class="title-text">结果[{{resultCount}}]</div>-->
          <router-link v-for="(item, index) in apps" :to="'/appdetail?appId=' + item.applicationId + '&beforeRoute=/appstore'">
            <div class="app-item-deliver"></div>
            <w-list-item class="item-icon-left">
              {{item.appName}}
              <w-icon>
                <img class="app-icon loadappimg" src="assets/images/app-blank.png" :appicon="item.appIcon" onload="loadimg(this)"/>
              </w-icon>
            </w-list-item>
          </router-link>
          <!--没有应用-->
          <div v-show='resultCount == 0' class="nothing nonthing_result">
            <p>
              <w-icon type="ios-information-outline" class='nonthing_result_icon'></w-icon><span>未找到相关应用</span></p>
            <div></div>
          </div>
        </div>
        <div v-else>
          <div class="title-text">热门应用</div>
          <router-link v-for="(item, index) in hotApps" :to="'/appdetail?appId=' + item.applicationId + '&beforeRoute=/appstore'">
            <div class="app-item-deliver"></div>
            <w-list-item class="item-icon-left">
              {{item.appName}}
              <w-icon>
                <img class="app-icon loadappimg" src="assets/images/app-blank.png" :appicon="item.appIcon" onload="loadimg(this)"/>
              </w-icon>
            </w-list-item>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import $ from '../../lib/jquery'
  import {getLocalStorage} from '../../js/utils/common-utils';
  import config from '../../js/config';
  let methods = {
    search(){
      var that = this;
      that.apps = [];
      var keywords = that.keywords;
      var categoryApps = JSON.parse(getLocalStorage('categoryApps') || '[]');
      var keys = Object.keys(categoryApps);
      if(keys){
        for(var i in keys){
          for(var j in categoryApps[keys[i]]){
            if(categoryApps[keys[i]][j].appName.indexOf(keywords) != -1){
              that.apps.push(categoryApps[keys[i]][j]);
            }
          }
        }
      }
      that.resultCount = that.apps.length;
    }
  };
  export default {
    data() {
      return {
        keywords: '',
        hotApps: [],
        apps: [],
        resultCount: 0
      }
    },
    methods: methods,
    mounted(){
      $('input[type="search"]').focus(); //搜索框获得焦点
      var that = this;
      var hotApps = JSON.parse(getLocalStorage('recommendApps', config.app_cache_time)) || '[]';
      that.hotApps = hotApps;
    },
    watch: {
      keywords: function(val, oldVal){
        this.search(val);
      }
    },
    beforeRouteLeave(to, from, next){
      if(to.path == '/appdetail'){
        $loading.show('请稍等...');
      }
      next();
    }
  }
</script>
<style>
  .app-search .w-header .blue-bg, .app-search .item-input-inset, .app-search .bar-header{background-color: #fff; border-bottom-color: #fff;}
  .app-search .bar.item-input-inset .item-input-wrapper{margin-left: 20px;}
  .app-search .button.header-left-icon{top: -2px;}
  .app-search .app-icon{width: 30px; height: 30px;}
  .app-search .item-icon-left .icon{left: 21px;}
  .app-search .item{border: none; padding-left: 64px; margin: 0;}
  .app-search .app-item-deliver{height: 1px; border: none;}
  .app-search .title-text{background: #fff; margin-bottom: -1px; font-size: 12px; line-height: 32px; padding-left: 12px; margin-top: 8px;}
  .app-search .placeholder-icon{font-size: 20px; padding-top: 2px;}
</style>