<template>
<div class="von-cascade-panel" :class="{'active': state == 1}">
    <div class="title" v-text="title"></div>

    <div class="list list-borderless options">
      <div class="item" v-for="(option, index) in options"
        @click="optionClicked(index)">
        <span v-text="option"></span>
      </div>
    </div>
  </div>
</template>
<style scoped>

  .von-cascade-panel {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 30px 0 0 0;
    background-color: #f5f5f5;
    z-index: 12;
    box-sizing: border-box;
    pointer-events: auto !important;

    transition: transform .2s ease-in-out;
    -webkit-transition: -webkit-transform .2s ease-in-out;

    transform: translate(0, 100%);
    -webkit-transform: translate(0, 100%);
    }

 	 .active {
      transform: translate(0, 0);
      -webkit-transform: translate(0, 0);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

      transition: transform .3s cubic-bezier(0.4, 0, 0, 1);
      -webkit-transition: -webkit-transform .3s cubic-bezier(0.4, 0, 0, 1);
    }
 .von-cascade-panel  .title {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 30px;
      z-index: 1000;

      font-size: 14px;
      line-height: 30px;
      text-align: center;
    }
  .von-cascade-panel .options {
      max-height: 215px;
      overflow-x: hidden;
      overflow-y: overflow;
      -webkit-overflow-scrolling: touch;  
      }
  .von-cascade-panel .item {
        min-height: 44px;
        height: 44px;
        padding: 15px 12px;
        text-align: center;
        margin: 0px;
      }
    .von-cascade-panel .item:after{
    	content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
     transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);
    }
  .von-cascade-panel  .active {
          background-color: #eee;
        }
</style>
<script>
 import Vue from 'vue'

   const animation_duration = 300
  let bus = new Vue();

  export default {
    data() {
      return {
        title: '',
        options: [],

        state: 0, // 0: hide, 1: show
      }
    },

    destroyed() {
      document.body.removeChild(this.$el)
    },

    methods: {
      reset() {
        this.title = ''
        this.options = []
        this.state = 0
      },

      show(title, options) {
        this.reset()
        Vue.nextTick(() => {
          this.title = title
          this.options = options
          this.state = 1
        })

        $backdrop.show().then(() => {
          let backdrop = document.querySelector('[attr-backdrop]')
       
          backdrop.onclick = () => {
            bus.$emit('optionClickedEvent', {optionIndex: -1})
            backdrop.onclick = null
          }
        })

        document.body.classList.add('popup-open')

        return new Promise((resolve) => {
          bus.$on('optionClickedEvent', (data) => {
            resolve(data.optionIndex)
            this._hide()
          })
        })
      },

      _hide() {
        this.state = 0
        $backdrop.hide()

        document.body.classList.remove('popup-open')

        setTimeout(() => {
          this.$destroy()
        }, animation_duration)
      },

      hide() {
        bus.$emit('optionClickedEvent', {optionIndex: -1})
      },

      optionClicked(index) {
        bus.$emit('optionClickedEvent', {optionIndex: index})
      },

      getState() {
        return this.state
      }
    }
  }
</script>
