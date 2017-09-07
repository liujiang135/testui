<template>
  <button class="button"
         :class="[
          color ? 'button-' + color : '',
          size ? 'button-' + size : '',
          plain == 'true' ? 'button-outline' : '',
          block == 'true' ? 'button-block' : '',
          clear == 'true' ? 'button-clear' : '',
          disabled == 'true' ? 'is-disabled' : '',
          buttonShape,
          shadow == 'true' ? 'md-button' : ''
          ]"
          :disabled="disabled == 'true'"
          @click="handleClick"
  >
    <i v-if="icon" class="icon" :class="['ion-' + icon]"></i>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
  export default {
    name: 'w-button',
    props: {
      color: {
        type: String
      },
      size: {
        type: String
      },
      plain: {
        type: String,
        default: 'false'
      },
      block: {
        type: String,
        default: 'false'
      },
      clear: {
        type: String,
        default: 'false'
      },
      disabled: {
        type: String,
        default: 'false'
      },
      shape: {
        type: String
      },
      icon: {
        type: String
      },
      shadow: {
        type: String
      }
    },
    computed: {
      buttonShape(){
        if(this.shape == 'oval'){
          return 'button-fab';
        }else{
          return '';
        }
      }
    },
    methods: {
      handleClick(){
        this.$emit('click');
      }
    }
  };
</script>