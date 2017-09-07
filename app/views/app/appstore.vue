<template>
    <div class="app-store-page">
      <w-header color="blue-bg">
        <div class="header-search-nav" slot="title" @click="searchClick">
          <w-search v-model="keywords" placeholder="搜索应用"></w-search>
        </div>
        <span id="header-edit-btn" class="header-btn" :style="isEditStatus ? 'display: none;' : 'display: block;'" slot="right" @click="edit">编辑</span>
        <span id="header-complete-btn" class="header-btn" :style="isEditStatus ? 'display: block;' : 'display: none;'" slot="right" @click="complete">完成</span>
      </w-header>
      <div class="w-content">
        <w-scroll :on-refresh="onRefresh" :offset="offset">
          <div class="w-app-category-text my-app"><span class="w-app-category-text-vline"></span>我的应用</div>
          <div class="w-cells bottom-line-cells">
            <div class="row" v-if="index % 4 == 0" v-for="(item, index) in myApps">
              <div class="col" v-for="n in 4">
                <div>
                  <router-link v-if="myApps[index]" :to="'/appdetail?appId=' + myApps[index].applicationId + '&beforeRoute=/appstore'">
                    <div class="cell-item" :class="isEditStatus ? 'cell-item-select' : ''" @mousedown="mousedown" @mouseup="mouseup">
                      <i :data-appid="myApps[index].applicationId" :index="index" class="icon ion-android-remove-circle cell-item-top-right-icon royal" @click="unfavorite($event.target)"></i>
                      <img class="cell-item-img loadappimg" src="assets/images/app-blank.png" :appicon="myApps[index].appIcon" onload="loadimg(this)"/>
                      <div class="cell-item-text">{{myApps[index ++ ].appName}}</div>
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
                  <router-link v-if="recommendApps[index]" :to="'/appdetail?appId=' + recommendApps[index].applicationId + '&beforeRoute=/appstore'">
                    <div class="cell-item" :class="isEditStatus ? 'cell-item-select' : ''" @mousedown="mousedown" @mouseup="mouseup">
                      <i :data-appid="recommendApps[index].applicationId" :favoriteStatus="recommendApps[index].favoriteStatus" :index="index" class="icon cell-item-top-right-icon" :class="recommendApps[index].favoriteStatus ? 'ion-checkmark-circled royal' : 'ion-android-add-circle balanced'" @click="favorite($event.target, 'recommendType')"></i>
                      <img class="cell-item-img loadappimg" src="assets/images/app-blank.png" :appicon="recommendApps[index].appIcon" onload="loadimg(this)"/>
                      <div class="cell-item-text">{{recommendApps[index ++ ].appName}}</div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-for="category in appCategories">
            <div class="w-app-category-text"><span class="w-app-category-text-vline"></span>{{category}}</div>
            <div class="w-cells bottom-line-cells">
              <div class="row" v-if="index % 4 == 0" v-for="(item, index) in appData[category]">
                <div class="col" v-for="n in 4">
                  <div>
                    <router-link v-if="appData[category][index]" :to="'/appdetail?appId=' + appData[category][index].applicationId + '&beforeRoute=/appstore'">
                      <div class="cell-item" :class="isEditStatus ? 'cell-item-select' : ''" @mousedown="mousedown" @mouseup="mouseup">
                        <i :data-appid="appData[category][index].applicationId" :favoriteStatus="appData[category][index].favoriteStatus" :category="category" :index="index" class="icon cell-item-top-right-icon" :class="appData[category][index].favoriteStatus ? 'ion-checkmark-circled royal' : 'ion-android-add-circle balanced'" @click="favorite($event.target, 'categoryType')"></i>
                        <img class="cell-item-img loadappimg" src="assets/images/app-blank.png" :appicon="appData[category][index].appIcon" onload="loadimg(this)"/>
                        <div class="cell-item-text">{{appData[category][index ++ ].appName}}</div>
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

  import httpUtils from '../../js/utils/http-utils';
  import {$$, setLocalStorage, getLocalStorage} from '../../js/utils/common-utils';
  import config from '../../js/config';
  var currentpath = '/appstore';
  let methods = {
    edit(){
      this.isEditStatus = true;
    },
    complete(){
      var favoriteAppIds = [];
      var that = this;
      for(var i in that.myApps){
        favoriteAppIds.push(that.myApps[i].applicationId);
      }

      httpUtils.postRequest('/appstore/updatefavoriteapps', {uId: this.uId, ids: favoriteAppIds.join(',')}, function(data){
        if(!data.data.result){
          $toast.show(data.data.message, 1500);
        }
      });

      that.isEditStatus = false;
      sessionStorage.setItem(currentpath,document.querySelector('.w-scroll').scrollTop);
      setLocalStorage('recommendApps', JSON.stringify(that.recommendApps));
      setLocalStorage('favoriteApps', JSON.stringify(that.myApps));
      setLocalStorage('categoryApps', JSON.stringify(that.appData));
    },
    mousedown(){
      let that = this;
      if(that.timer){
        clearTimeout(that.timer);
      }
      that.timer = setTimeout(function(){
        that.edit();
      });
    },
    mouseup(){
      clearTimeout(this.timer);
    },
    /*收藏app*/
    favorite(target, type){
      var that = this;
      var appId = target.getAttribute('data-appid');
      var index = target.getAttribute('index');
      var favoriteStatus = target.getAttribute('favoriteStatus');
      if(favoriteStatus){
        return;
      }
      if(type == 'recommendType'){
        that.myApps.push(that.recommendApps[index]);
      }else{
        var category = target.getAttribute('category');
        that.myApps.push(that.appData[category][index]);
      }
      that.changeFavoriteDisplayStatus(appId);
    },
    /*取消收藏app*/
    unfavorite(target){
      var appId = target.getAttribute('data-appid');
      var that = this;

      var index = target.getAttribute('index');
      that.myApps.splice(index, 1);
      that.changeFavoriteDisplayStatus(appId);
    },
    /*改变app是否收藏的显示状态*/
    changeFavoriteDisplayStatus(appId){
      var that = this;
      /*更改分类应用的显示状态*/
      var categories = that.appCategories;
      var appData = that.appData;
      for(let i in categories){
        var category = categories[i];
        for(let j in appData[category]){
          if(appData[category][j].applicationId == appId){
            appData[category][j].favoriteStatus = !appData[category][j].favoriteStatus;
          }
        }
      }
      /*更改推荐应用的显示状态*/
      var recommendApps = that.recommendApps;
      for(let i in recommendApps){
        if(recommendApps[i].applicationId == appId){
          recommendApps[i].favoriteStatus = !recommendApps[i].favoriteStatus;
        }
      }
    },
    searchClick(){
      this.$router.push('appsearch');
    },
    loadData(fn){
      if(!fn){
        $loading.show('数据加载中');
      }
      var that = this;
      httpUtils.getRequest('/appstore/applist', {uId: this.uId}, function(data){
        if(data && data.data){
          $loading.hide();
          //推荐的应用
          that.recommendApps = data.data.recommendApps;

          //收藏的应用
          var myApps = data.data.favoriteApps;
          that.myApps = myApps;

          //分类的应用
          that.appCategories = Object.keys(data.data.categoryApps) || [];
          that.appData = data.data.categoryApps || [];

          setLocalStorage('recommendApps', JSON.stringify(that.recommendApps));
          setLocalStorage('favoriteApps', JSON.stringify(that.myApps));
          setLocalStorage('categoryApps', JSON.stringify(that.appData));
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
        uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
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
        var favoriteApps = JSON.parse(getLocalStorage('favoriteApps', config.app_cache_time));
        var categoryApps = JSON.parse(getLocalStorage('categoryApps', config.app_cache_time));
        if(that.uId){
            if(recommendApps && favoriteApps.length > 0 && categoryApps){
                //推荐的应用
                that.recommendApps = recommendApps;

                //收藏的应用
                that.myApps = favoriteApps;

                //分类的应用
                that.appCategories = Object.keys(categoryApps) || [];
                that.appData = categoryApps || [];
            }else{
                that.loadData();
            }
        }else{
            if(recommendApps &&  categoryApps){
                //推荐的应用
                that.recommendApps = recommendApps;

                //收藏的应用
                that.myApps = [];
                //分类的应用
                that.appCategories = Object.keys(categoryApps) || [];
                that.appData = categoryApps || [];
            }else{
                that.loadData();
            }
        }
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
  .bottom-line-cells{margin-bottom: 0px; margin-top: 0;}
  .bottom-line-cells:after{content: ""; position: absolute; background-color: #ddd; display: block; left: 0; bottom: 0px; right: auto; height: 1px; width: 100%; transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; transform: scaleY(0.5); -webkit-transform: scaleY(0.5);}
  .header-btn{line-height: 34px; font-size: 16px; padding: 0 10px; color: #fff;}
  .header-search-nav .bar.item-input-inset .item-input-wrapper{margin-right: 36px;background-color: white;}

  .w-app-category-text{font-size: 14px; padding: 22px 0 12px 15px; background-color: #fff; line-height: 16px;}
  .w-app-category-text:not(.my-app){color: #999;}

  .app-store-page .w-scroll .scroll-inner{top: -40px;}
  .bar.item-input-inset .item-input-wrapper input[type='search']{height: 30px; padding-top: 1px;}
  .bar.item-input-inset .item-input-wrapper input{line-height: 30px; padding-top: 1px;}
  .w-app-category-text-vline{display: block; height: 16px; width: 3px; background-color: #0f8eeb; float: left; border-radius: 2px; margin-right: 3px;}
  .header-search-nav .placeholder-icon{font-size: 20px; padding-top: 2px;}
</style>