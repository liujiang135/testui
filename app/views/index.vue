
<template>
  <div>
    <w-tabbar :menus="menus" @click="click">
    </w-tabbar>
  </div>
</template>
<script>
  import silenceRequest from '../js/utils/silence-request';
  import {checkSessionIndex} from '../js/utils/common-utils';
  export default {
    data(){
      return {
        menus: [
          {
            link: '/home',
            icon: 'index',
            text: '首页',
            color: 'bottom-tab-active',
            messageCount: ''
          },
          {
            link: '/appstore',
            icon: 'app',
            text: '应用',
            color: 'bottom-tab-active',
            messageCount: ""
          },
          {
            link: '/message',
            icon: 'message',
            text: '消息',
            color: 'bottom-tab-active',
            messageCount: ""
          },
          {
            link: '/setting',
            icon: 'setting',
            text: '我的',
            color: 'bottom-tab-active',
            messageCount: ""
          }
        ]
      }
    },
    methods: {
      click(index){
        this.menus[index].messageCount = 0;
      }
    },
    mounted(){
      checkSessionIndex();
      silenceRequest.intervalAppStore();
//      silenceRequest.intervalMessage();
//      silenceRequest.intervalUserinfo();
    }
  }
</script>
<style >
 @import "../assets/css/common.css";
</style>