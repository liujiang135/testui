<template>
  <label class="item item-icon-left w-radio-label">
    <input class="w-radio-input" type="radio" :checked="value == val" @change="radioChange"/>
    <i class="icon ion-ios-checkmark" :class="value == val ? color : 'royal'"></i>
    <span>{{text}}</span>
  </label>
</template>

<script>
  export default {
    name: 'w-radio',
    props: {
      value: {
        type: [Number, String]
      },
      val: {
        type: [Number, String]
      },
      text: {
        type: String
      },
      color: {
        type: String,
        default: 'positive'
      }
    },
    methods: {
      radioChange(event){
        this.$emit('input', this.val);
        this.$emit('change');
      }
    }
  }
</script>