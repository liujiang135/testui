<template>
  <w-frame title="页头">
    <!--Header-->
    <div id="button" class="component-body">
      <h3>属性</h3>
      <h4>color</h4>
      <p class="p-sub-item">可选值：【assertive, positive, balanced, energized, calm, royal, dark, light】</p>
      <h4>title-align</h4>
      <p class="p-sub-item">title对齐方式【left, right, *center】</p>

      <div style="position: relative;">
        <w-header color="positive">
          <router-link to="/home" class="button button-icon icon ion-ios-arrow-back" slot="left"></router-link>
          <div slot="title">标题</div>
          <button class="button button-icon ion-navicon" slot="right"></button>
        </w-header>
      </div>
    </div>
  </w-frame>
</template>

<style scoped>
  button.button{margin-bottom: 5px;}
</style>
<script>
  import Frame from '../Frame'
  export default {
    components: {
      'w-frame': Frame
    }
  }
</script>
