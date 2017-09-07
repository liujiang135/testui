
<template>
  <div>
    <w-tabbar :menus="menus" @click="click">
    </w-tabbar>
  </div>
</template>
<script>
  import silenceRequest from '../assets/js/utils/silence-request';
  import {checkSessionIndex} from '../assets/js/utils/common-utils';
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
//        this.menus[index].messageCount = 0;
      }
    },
    mounted(){
      checkSessionIndex();
//      silenceRequest.intervalAppStore();

      var that = this;
     silenceRequest.initMessageUnreadCount( function (unReadCount) {
//        console.log("unreadCount ==="+unReadCount);
         if(unReadCount > 0){
             that.menus[2].messageCount = unReadCount;
         }
     });

//      silenceRequest.intervalMessage();
//      silenceRequest.intervalUserinfo();
    }
  }
</script>