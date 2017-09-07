<template>
  <div class="popup-container"
       :class="{'popup-showing active': state == 1, 'popup-showing popup-hidden': state == 2}">
    <div class="popup ios">
      <div class="popup-head">
        <div class="popup-title" v-html="title"></div>
        <div v-if="content" class="popup-sub-title" v-html="content"></div>
        <div class="hairline-bottom"></div>
      </div>

      <div class="popup-buttons">
        <button class="button button-block button-positive button-outline button-cancel"
          @click="onCancel()"
          v-html="getCancelHtml()"
        >
        </button>
        <button class="button button-block button-positive button-outline button-ok"
          @click="onOk()"
          v-html="okButton.text"
        >
        </button>
      </div>
    </div>
  </div>
</template>
<style>
  .hairline-bottom:after {
    content: '';
    position: absolute;
    left: 0;
    top: auto;
    bottom: 0;
    right: auto;
    height: 1px;
    width: 100%;
    background-color: #ddd;
    display: block;
    z-index: 15;
    transform-origin: 50% 100%;
    -webkit-transform-origin: 50% 100%;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }
  .hairline-right:after{
    content: '';
    position: absolute;
    background-color: #ddd;
    display: block;
    left: auto;
    top: 0;
    bottom: auto;
    right: 0;
    height: 100%;
    width: 1px;
    transform-origin: 100% 50%;
    -webkit-transform-origin: 100% 50%;
    transform: scaleX(0.5);
    -webkit-transform: scaleX(0.5);
  }
  .popup.ios {
    width: 280px;
    height: auto;
    border-radius: 10px;
  }
  .popup.ios .popup-head {
    padding: 20px 0 22px 0;
    border-bottom: none;
    position: relative;
  }
  .popup-title, .popup-sub-title, .button-ok, .button-cancel {
    font-family: sans-serif;
    color: #000;
  }

  .popup.ios .popup-title {
    -webkit-font-smoothing: subpixel-antialiased !important;
    font-weight: 300;

    font-size: 17px;
    line-height: 17px;
    font-weight: bold;
  }
  .popup.ios .popup-sub-title {
    margin-top: 8px;
    font-size: 13px;
    line-height: 13px;
    -webkit-font-smoothing: antialiased !important;
    font-weight: normal;
  }
  .popup.ios .popup-buttons {
    padding: 0;
    height: 45px;
    min-height: 45px;
  }

  .popup.ios .button {
    margin-right: 0;
  }

  .popup.ios .button-ok, .popup.ios .button-cancel {
    -webkit-font-smoothing: subpixel-antialiased !important;

    background-color: transparent;
    border: none;
    margin-top: 0;
    font-size: 17px;
    line-height: 45px;
    min-height: 45px;
    height: 45px;
    padding: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

  }
  .popup.ios .button-ok:active, .popup.ios .button-cancel:active {
    background-color: rgba(0,0,0,0.10);
  }

  .popup.ios .button-ok {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 10px;
  }

  .popup.ios .button-cancel {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 0;

  }
</style>
<script>
  import mixin from './mixin'

  const extend = (target, source) => {
    for (let key in source) {
      target[key] = source[key]
    }

    return target
  }

  export default {
    mixins: [mixin],

    data() {
      return {
        title: '提示',
        content: '',
        okButton: {
          text: '确定',
          callback: function(){
            return true;
          }
        },
        cancelButton: {
          text: '取消',
          callback: function(){
            return true;
          }
        },
        okTheme: 'assertive',
        state: 0 // 0: hidden, 1: showing, 2: active
      }
    },

    methods: {
      show(options) {
        extend(this, options)

        window.$backdrop.show()
        this.state = 1

        this.promise = new Promise((resolve, reject) => {
          this.$on('ConfirmOkEvent', (callback) => {
            if(callback != undefined){
              let returnValue = callback();
              if((typeof returnValue).toLowerCase() != 'boolean'){
                console.error('the function "callback" belongs to "okButton" must return Boolean type !');
                return;
              }else if(returnValue != true){
                console.warn('the function "callback" belongs to "okButton" must return true, but return false !');
                return;
              }
            }
            this.hide();
            resolve(true);
          });

          this.$on('ConfirmCancelEvent', (callback) => {
            if(callback != undefined){
              let returnValue = callback();
              if((typeof returnValue).toLowerCase() != 'boolean'){
                console.error('the function "callback" belongs to "cancelButton" must return Boolean type !');
                return;
              }else if(returnValue != true){
                console.warn('the function "callback" belongs to "cancelButton" must return true, but return false !');
                return;
              }
            }
            this.hide();
            resolve(false);
          });
        });

        document.body.classList.add('popup-open')

        return this.promise
      },

      onOk() {
        let callback = this.okButton.callback;
        if(callback != undefined && (typeof callback).toLowerCase() != 'function'){
          console.error('the attribute "callback" belongs to "okButton" must be a function !');
          return;
        }
        this.$emit('ConfirmOkEvent', callback);
      },

      onCancel() {
        let callback = this.cancelButton.callback;
        if(callback != undefined && (typeof callback).toLowerCase() != 'function'){
          console.error('the attribute "callback" belongs to "cancelButton" must be a function !');
          return;
        }
        this.$emit('ConfirmCancelEvent', callback);
      },

      getCancelHtml() {
        return this.cancelButton.text + '<div class="hairline-right"></div>'
      }
    }
  }
</script>
