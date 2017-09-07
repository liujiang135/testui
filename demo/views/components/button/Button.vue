<template>
    <w-frame title="按钮">
      <!--Button-->
      <div id="button" class="component-body">
        <h3>属性</h3>
        <h4>color</h4>
        <p class="p-sub-item">可选值：【assertive, positive, balanced, energized, calm, royal, dark, light】</p>
        <w-button color="assertive">按钮</w-button>
        <w-button color="positive">按钮</w-button>
        <w-button color="balanced">按钮</w-button>
        <w-button color="energized">按钮</w-button>
        <w-button color="calm">按钮</w-button>
        <w-button color="royal">按钮</w-button>
        <w-button color="dark">按钮</w-button>
        <w-button color="light">按钮</w-button>

        <h4>block</h4>
        <p class="p-sub-item">可选值：【true, *false】</p>
        <w-button color="positive" block="true">按钮</w-button>
        <w-button color="positive" block="false">按钮</w-button>

        <h4>size</h4>
        <p class="p-sub-item">可选值：【large, *(empty), small】</p>
        <w-button color="positive" block="false" size="large">按钮</w-button>
        <w-button color="positive" block="false">按钮</w-button>
        <w-button color="positive" block="false" size="small">按钮</w-button>

        <h4>plain</h4>
        <p class="p-sub-item">可选值：【true, *false】</p>
        <w-button color="positive" block="false" plain="true">按钮</w-button>
        <w-button color="positive" block="false" plain="false">按钮</w-button>

        <h4>clear</h4>
        <p class="p-sub-item">可选值：【true, *false】</p>
        <w-button color="positive" block="false" clear="true">按钮</w-button>
        <w-button color="positive" block="false" clear="false">按钮</w-button>

        <h4>disabled</h4>
        <p class="p-sub-item">可选值：【true, *false】</p>
        <w-button color="positive" block="false" disabled="true">按钮</w-button>
        <w-button color="positive" block="false" disabled="false">按钮</w-button>

        <h4>shape</h4>
        <p class="p-sub-item">可选值：【*(empty), oval】</p>
        <w-button color="positive">按钮</w-button>
        <w-button color="positive" shape="oval">这是椭圆</w-button>
        <w-button color="positive" shape="oval" style="width: 50px; height: 50px;">圆</w-button>

        <h4>icon</h4>
        <p class="p-sub-item">可选值：【checkmark, close, android-arrow-up, android-arrow-down, android-arrow-forward, android-arrow-back, home, android-share ...】</p>
        <w-button color="balanced" shape="oval" icon="checkmark" style="width: 50px; height: 50px;"></w-button>
        <w-button color="assertive" shape="oval" icon="close" style="width: 50px; height: 50px;"></w-button>
        <w-button color="positive" shape="oval" icon="android-arrow-up" style="width: 50px; height: 50px;"></w-button>
        <w-button color="positive" shape="oval" icon="android-arrow-down" style="width: 50px; height: 50px;"></w-button>
        <w-button color="positive" shape="oval" icon="android-arrow-forward" style="width: 50px; height: 50px;"></w-button>
        <w-button color="positive" shape="oval" icon="android-arrow-back" style="width: 50px; height: 50px;"></w-button>
        <w-button color="energized" shape="oval" icon="home" style="width: 50px; height: 50px;"></w-button>
        <w-button color="calm" shape="oval" icon="android-share" style="width: 50px; height: 50px;"></w-button>
        <!--<div>-->
          <!--<a href="http://ionicons.com/">更多图标</a>-->
        <!--</div>-->
        <h4>shadow</h4>
        <p class="p-sub-item">可选值：【true, *false】</p>
        <w-button shadow="true" color="positive">按钮</w-button>

        <h3>事件</h3>
        <h4>click</h4>
        <w-button color="positive" block="false" @click="showMsg">按钮</w-button>
      </div>
    </w-frame>
</template>

<style scoped>
  button.button{margin-bottom: 5px;}
</style>
<script>
  import Frame from '../Frame'
  export default {
    data() {
      return {}
    },
    methods: {
      showMsg(){
          alert('按钮被点击');
      }
    },
    components: {
      'w-frame': Frame
    }
  }
</script>
