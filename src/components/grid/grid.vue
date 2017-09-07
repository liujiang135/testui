<template>
  <div class="grids">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'w-grid',
    props: {
      cols: String,
      required: true
    }
  }
</script>
<style scoped>
  .grids {
    position: relative;
    overflow: hidden;
  }
  .grids:before {
    content: " ";
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    border: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scale(0.5);
  }
</style>