<template>
  <div class="grid" :style="'width: ' + dWidth">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'w-grid-item',
    props: {
      width: {
        type: String
      }
    },
    computed: {
      dWidth(){
        var that = this;
        if(that.width){
          return that.width;
        }else{
          if(that.$parent && that.$parent.cols){
            let cols = parseInt(that.$parent.cols);
            return 100/cols + '%';
          }else{
            return '25%';
          }
        }
      }
    }
  }
</script>
<style scoped>
  .grid {
    position: relative;
    float: left;
    padding: 20px 10px;
    box-sizing: border-box;
    text-decoration: none;
  }
  .grid:before {
    content: " ";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-right: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }
  .grid:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .grid:active {
    background-color: #E4E4E4;
  }
</style>