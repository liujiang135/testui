<template>
  <div>
    <w-nav title="Tabbar" left-link="/home"></w-nav>
    <w-tabbar :menus="menus" @click="click">
      <w-nav title="标题" left-link="/home" right-link="#" slot="header"></w-nav>
    </w-tabbar>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        menus: [
          {
            link: '/tabbar/button',
            icon: 'ios-home-outline',
            text: '首页',
            color: 'positive',
            messageCount: ''
          },
          {
            link: '/tabbar/toggle',
            icon: 'ios-cart-outline',
            text: '购物车',
            color: 'positive',
            messageCount: 3
          },
          {
            link: '/tabbar/radio',
            icon: 'ios-chatbubble-outline',
            text: '消息',
            color: 'positive',
            messageCount: 3
          },
          {
            link: '/tabbar/list',
            icon: 'ios-gear-outline',
            text: '我的',
            color: 'positive',
            messageCount: 3
          }
        ]
      }
    },
    methods: {
      click(index){
        this.menus[index].messageCount = 0;
      }
    }
  }
</script>