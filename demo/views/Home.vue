<template>
  <div class="wc-app">
    <div class="bar bar-header blue-bg">
      <h1 class="title">UI Components</h1>
    </div>
    <div class="page has-navbar" style="overflow: auto;">
      <div class="page-content">
        <div class="list">
          <div class="item item-divider">基础</div>
          <router-link tag="div" class="item item-icon-right" to="/button">
            Button <span class="item-note">按钮</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/toggle">
            Toggle <span class="item-note">开关</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/radio">
            Radio <span class="item-note">单选按钮</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/icon">
            Icon <span class="item-note">图标</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/input">
            Input<span class="item-note">输入框</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/search">
            Search<span class="item-note">搜索框</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>

          <router-link tag="div" class="item item-icon-right" to="/badge">
            Badge<span class="item-note">徽章</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/checkbox">
            Checkbox<span class="item-note">复选框</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <div class="item item-divider">布局</div>
          <router-link tag="div" class="item item-icon-right" to="/grid">
            Grid<span class="item-note">九宫格</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/header">
            Header<span class="item-note">页头</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/nav">
            Nav<span class="item-note">顶部导航条</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/list">
            List<span class="item-note">列表</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/tab">
            Tab<span class="item-note">选项卡</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/tabbar">
            Tabbar<span class="item-note">选项菜单</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <div class="item item-divider">高级</div>
          <router-link tag="div" class="item item-icon-right" to="/swiper">
            Swiper<span class="item-note">图片轮播</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/dialog">
            Dialog<span class="item-note">对话框</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/loading">
            Loading<span class="item-note">提示</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/loadmore">
            Loadmore<span class="item-note">下拉刷新/上拉加载</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/scroll">
            Scroll<span class="item-note">下拉/滚动条上拉</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/actionsheet">
            Actionsheet<span class="item-note">操作列表</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/buttonbar">
            Buttonbar<span class="item-note">选项卡</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/picker">
            Picker<span class="item-note">选择器联动</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
           <router-link tag="div" class="item item-icon-right" to="/cascade">
            Cascade<span class="item-note">底部弹出选择器</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <router-link tag="div" class="item item-icon-right" to="/popup">
            Popup<span class="item-note">弹出框</span>
            <i class="icon ion-ios-arrow-right"></i>
          </router-link>
          <div class="item item-divider">工具类</div>
          <router-link tag="div" class="item item-icon-right" to="/color">
          color <span class="item-note">颜色</span>
          <i class="icon ion-ios-arrow-right"></i>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    mounted(){
        //设置滚动位置
        var path = '/home';
        console.log( sessionStorage.getItem(path))
        document.querySelector('.page').scrollTop = sessionStorage.getItem(path) != undefined ? sessionStorage.getItem(path) : 0;
    },
    beforeRouteLeave (to, from, next) {
        //存储滚动位置
        sessionStorage.setItem('/home',document.querySelector('.page').scrollTop)
        next()
    }
  }
</script>
