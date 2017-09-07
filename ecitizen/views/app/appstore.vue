<template>
    <div class="app-store-page">
      <w-header color="blue-bg">
        <div class="header-search-nav" slot="title" @click="searchClick">
          <w-search v-model="keywords" placeholder="搜索应用"></w-search>
        </div>
      </w-header>
      <div class="w-content">
        <w-scroll :on-refresh="onRefresh" :offset="offset">
          <div class="w-app-category-text my-app" v-if="myApps.length > 0"><span class="w-app-category-text-vline"></span>我的应用</div>
          <div class="w-cells bottom-line-cells" v-if="myApps.length > 0">
            <div class="row" v-if="index % 4 == 0" v-for="(item, index) in myApps">
              <div class="col" v-for="n in 4">
                <div>
                  <router-link v-if="myApps[index]" :to="'/appdetail?appId=' + myApps[index].appId + '&beforeRoute=/appstore'">
                    <div class="cell-item" :class="isEditStatus ? 'cell-item-select' : ''">
                      <i :data-appid="myApps[index].appId" :index="index" class="icon ion-android-remove-circle cell-item-top-right-icon royal" @click="unfavorite($event.target)"></i>
                      <img class="cell-item-img loadappimg" :src="myApps[index].appIcon"/>
                      <div class="cell-item-text">{{myApps[index ++ ].appName_cn}}</div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="w-app-category-text"><span class="w-app-category-text-vline"></span>为你推荐</div>
          <div class="w-cells bottom-line-cells">
            <div class="row" v-if="index % 4 == 0" v-for="(item, index) in recommendApps">
              <div class="col" v-for="n in 4">
                <div>
                  <router-link v-if="recommendApps[index]" :to="'/appdetail?appId=' + recommendApps[index].appId + '&beforeRoute=/appstore'">
                    <div class="cell-item" :class="isEditStatus ? 'cell-item-select' : ''">
                      <i :data-appid="recommendApps[index].appId" :favoriteStatus="recommendApps[index].favoriteStatus" :index="index" class="icon cell-item-top-right-icon" :class="recommendApps[index].favoriteStatus ? 'ion-checkmark-circled royal' : 'ion-android-add-circle balanced'" @click="favorite($event.target, 'recommendType')"></i>
                      <img class="cell-item-img loadappimg" :src="recommendApps[index].appIcon"/>
                      <div class="cell-item-text">{{recommendApps[index ++ ].appName_cn}}</div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-for="category in appCategories">
            <div class="w-app-category-text"   v-if="appData[category].length > 0"><span class="w-app-category-text-vline"></span>{{category}}</div>
            <div class="w-cells bottom-line-cells"   v-if="appData[category].length > 0">
              <div class="row" v-if="index % 4 == 0" v-for="(item, index) in appData[category]">
                <div class="col" v-for="n in 4">
                  <div>
                    <router-link v-if="appData[category][index]" :to="'/appdetail?appId=' + appData[category][index].appId + '&beforeRoute=/appstore'">
                      <div class="cell-item" :class="isEditStatus ? 'cell-item-select' : ''">
                        <i :data-appid="appData[category][index].appId" :favoriteStatus="appData[category][index].favoriteStatus" :category="category" :index="index" class="icon cell-item-top-right-icon" :class="appData[category][index].favoriteStatus ? 'ion-checkmark-circled royal' : 'ion-android-add-circle balanced'" @click="favorite($event.target, 'categoryType')"></i>
                        <img class="cell-item-img loadappimg" :src="appData[category][index].appIcon" />
                        <div class="cell-item-text">{{appData[category][index ++ ].appName_cn}}</div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </w-scroll>
      </div>
    </div>
</template>
<script>

  import httpUtils from '../../assets/js/utils/http-utils';
  import {$$, setLocalStorage, getLocalStorage} from '../../assets/js/utils/common-utils';
  import config from '../../assets/js/config';
  var currentpath = '/appstore';
  let methods = {
    edit(){
      this.isEditStatus = true;
    },
    complete(){
      var subsAppIds = [];
      var that = this;
      for(var i in that.myApps){
          subsAppIds.push(that.myApps[i].appId);
      }
      that.isEditStatus = false;
      sessionStorage.setItem(currentpath,document.querySelector('.w-scroll').scrollTop);
      setLocalStorage('recommendApps', JSON.stringify(that.recommendApps));
      setLocalStorage('subsApps', JSON.stringify(that.myApps));
      setLocalStorage('categoryApps', JSON.stringify(that.appData));
    },
//    mousedown(){
//      let that = this;
//      if(that.timer){
//        clearTimeout(that.timer);
//      }
//      that.timer = setTimeout(function(){
//        that.edit();
//      });
//    },
//    mouseup(){
//      clearTimeout(this.timer);
//    },
    searchClick(){
      this.$router.push('appsearch');
    },
    //初始化应用数据
    loadData(fn){
      if(!fn){
        $loading.show('数据加载中');
      }
      var that = this;
      httpUtils.getRequest('/appstore/applist', function(data){
        if(data && data.data){
          $loading.hide();
          //已订阅的应用
          var myApps = data.data.subsApps;
          that.myApps = myApps || [];

          //推荐的应用
          that.recommendApps = data.data.recommendApps;

          //分类的应用
          that.appCategories = Object.keys(data.data.categoryApps) || [];
          that.appData = data.data.categoryApps || [];

          setLocalStorage('recommendApps', JSON.stringify(that.recommendApps));
          setLocalStorage('subsApps', JSON.stringify(data.data.subsApps));
          setLocalStorage('categoryApps', JSON.stringify(data.data.categoryApps));
        }
      });
    },
    onRefresh(fn){
        var that = this;
        setTimeout(function() {
            that.loadData(fn);
            fn()
        }, 700)
    }
  };

  export default{
    data(){
      return{
        keywords: '',
        myApps: [],
        recommendApps: [],
        appCategories: [],
        appData: {},
        isEditStatus: false,
        offset: 44
      }
    },
    methods: methods,
    mounted(){
        var that = this;
        var recommendApps = JSON.parse(getLocalStorage('recommendApps', config.app_cache_time));
        var subsApps = JSON.parse(getLocalStorage('subsApps', config.app_cache_time));
        var categoryApps = JSON.parse(getLocalStorage('categoryApps', config.app_cache_time));
        if(recommendApps && categoryApps){
            //推荐的应用
            that.recommendApps = recommendApps;
            //已订阅的应用
            that.myApps = subsApps || [];
            //分类的应用
            that.appCategories = Object.keys(categoryApps) || [];
            that.appData = categoryApps || [];
        }else{
            that.loadData();
        }
        httpUtils.getRequest('/common/checkSessionindex', function(data) {
            if(data && data.data.result =='success') {
                var subsApps = JSON.parse(getLocalStorage('subsApps',config.app_cache_time))
                if(subsApps) {
                    that.myApps = subsApps;
                } else {
                    httpUtils.getRequest("/appstore/myapplist", function(data) {
                        if(data.data && data.data.response !=null) {
                            that.myApps = data.data.response;
                        }
                        setLocalStorage('subsApps', JSON.stringify(data.data.response));
                    });
                }
            }
        });
    },
    updated(){
        if(this.isEditStatus) sessionStorage.setItem(currentpath,document.querySelector('.w-scroll').scrollTop);
        //设置滚动位置
        var path = location.hash.replace('#','');
        document.querySelector('.w-scroll').scrollTop = sessionStorage.getItem(path) != undefined ? sessionStorage.getItem(path) : 0;
    },
    beforeRouteLeave(to, from, next){
      //存储滚动位置
      sessionStorage.setItem(from.path,document.querySelector('.w-scroll').scrollTop);
      if(this.isEditStatus && to.path == '/appdetail'){
        return;
      }
      if(to.path == '/appdetail'){
        $loading.show('请稍等...');
      }
      clearTimeout(this.timer);
      next();
    }
  }
</script>
<style>
  body{font-family: "黑体";}
  input, .cell-item-text, .w-app-category-text{font-family: "黑体";}
  .app-store-page .item-input-wrapper{background-color: #fff;}
  .app-store-page .w-content {background: #ffffff;}
  .bottom-line-cells{margin-bottom: 0px; margin-top: 0;}
  .bottom-line-cells:after{content: ""; position: absolute; background-color: #ddd; display: block; left: 0; bottom: 0px; right: auto; height: 1px; width: 100%; transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; transform: scaleY(0.5); -webkit-transform: scaleY(0.5);}
  .header-btn{line-height: 34px; font-size: 16px; padding: 0 10px; color: #fff;}
  .app-store-page .header-search-nav .bar.item-input-inset .item-input-wrapper{background-color: white;}

  .w-app-category-text{font-size: 14px; margin: 22px 0 14px 15px; background-color: #fff; height: 14px;line-height: 16px;}
  .w-app-category-text:not(.my-app){color: #999;}

  .app-store-page .w-scroll .scroll-inner{top: -40px;}
  .bar.item-input-inset .item-input-wrapper input[type='search']{height: 30px; padding-top: 1px;}
  .bar.item-input-inset .item-input-wrapper input{line-height: 30px; padding-top: 1px;}
  .w-app-category-text-vline{display: block; height: 14px; width: 3px; background-color: #0f8eeb; float: left; border-radius: 2px; margin-right: 3px;}
</style>