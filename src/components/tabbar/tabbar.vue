<template>
  <div>
    <router-view></router-view>
    <div class="tabs tabs-icon-top w-footer">
      <router-link :to="menu.link" class="tab-item" :active-class="menu.color" v-for="(menu, index) in menuArray" replace>
          <span class="icon" :class="menu.hasText ? '' : 'w-menu-icon-padding'" @click="menuClick(index)">
            <span class="w-bottom-tab-icon" :class="menu.icon ? 'ion-' + menu.icon : ''" style="display: inline-block;">
              <span :id="menu.icon + '_bottom_num'" v-show="(menu.messageCount > 0) & (menu.text === '消息')" class="w-bottm-tab-num ">{{menu.messageCount}}</span>
            </span>
          </span>
        {{menu.text}}
      </router-link>
    </div>
  </div>
</template>
<style>
  .w-footer{position: fixed; bottom: 0; left: 0; right: 0; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);}
  .w-bottom-tab-icon{position: relative;}
  .w-bottm-tab-num{
                    position: absolute;
                    display: block;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    border-radius: 9px;
                    top: -3px;
                    right: -10px;
                    background-color: red;
                    overflow: hidden;
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                    border: 1px solid #f5f5f5;
                }
  .w-menu-icon-padding{padding-top: 8px;}
</style>
<script>
  export default {
    name: 'w-tabbar',
    props: {
      menus: {
        type: Array,
        default: []
      }
    },
    computed: {
      menuArray(){
        let menuArr = [];
        let menus = this.menus;
        for(let i in menus){
          let menu = {};
          menu.hasText = true;
          menu.link = menus[i].link || '#';
          menu.icon = menus[i].icon || 'home';
          menu.text = menus[i].text || '';
          menu.color = menus[i].color || '';
          menu.messageCount = menus[i].messageCount || 0;
          if(!menu.text){
            menu.hasText = false;
          }
          menuArr.push(menu);
        }
        return menuArr;
      }
    },
    methods: {
      menuClick(index){
        this.$emit('click', index);
      }
    }
  }
</script>