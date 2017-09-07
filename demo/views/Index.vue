<template>
    <div class="page has-navbar">
        <div class="page-content">
            <div class="logo">
                <img src="assets/img/logo.png">
            </div>
            <div class="text-center code-name">WUI</div>
            <div class="text-center code-desc">基于Vue.js 和 ionic CSS 的移动端UI组件</div>
            <div class="list">
                <router-link tag="div" class="item item-icon-left item-icon-right" to="/home">
                    <i class="icon ion-ios-book positive"></i> <span class="item-note">示例</span> <i class="icon ion-ios-arrow-right"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
      methods :{
        todemo() {
            this.$router.forward({path: '/home'});
        }
      }
  }
</script>
