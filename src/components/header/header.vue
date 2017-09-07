<template>
  <div class="bar bar-header"
       :class="color ? 'bar-' + color : ''"
  >

    <!-- left button -->
    <div class="buttons">
      <slot name="left"></slot>
    </div>

    <!-- title -->
    <h1 class="title">
      <slot name="title"></slot>
    </h1>

    <!-- right button -->
    <div class="buttons">
      <slot name="right"></slot>
    </div>

  </div>
</template>
<style>
  .bar.bar-header {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }
</style>
<script>
  export default {
    name: 'w-header',
    props: {
      titleAlign: {
        type: String,
        validator: function (position) {
          return position == 'left' || position == 'right' || position == 'center'
        },
        default: 'center'
      },
      color: {
        type: String,
        default: 'light'
      },
    }
  }
</script>
