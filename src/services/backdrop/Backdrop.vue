<template>
  <div attr-backdrop class="backdrop visible" :class="{'active': state == 1}"></div>
</template>
<style>
  .backdrop {
    pointer-events: auto;
  }
</style>
<script>
  import {timeout, removeElement} from '../utils'

  // transition duration
  const duration = 200;

  export default {
    data() {
      return {
        state: 0
      }
    },

    destroyed() {
      console.log('[Wingconn] Backdrop _vm destroyed.')
      removeElement('[attr-backdrop]')
    },

    methods: {
      show() {
        this.state = 1;
      },

      hide() {
        this.state = 0;
        return timeout(duration);
      },

      getState() {
        return this.state;
      }
    }
  }
</script>
