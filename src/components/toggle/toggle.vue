<template>
  <div v-if="text" class="item item-toggle von-toggle">
    <span>{{text}}</span>
    <label class="toggle" :class="[
        color ? 'toggle-' + color : ''
      ]"
           @click="onToggle">
      <input :id="toggleId" type="checkbox" :checked="checked" @change="toggleStatus"/>
      <div class="track">
        <div class="handle"></div>
      </div>
    </label>
  </div>
  <label v-else class="toggle" :class="[
        color ? 'toggle-' + color : ''
      ]"
         @click="onToggle">
    <input :id="toggleId" type="checkbox" :checked="checked" @change="toggleStatus"/>
    <div class="track">
      <div class="handle"></div>
    </div>
  </label>
</template>

<script>
  export default {
    name: 'w-toggle',
    props: {
      value: {
        type: String,
        default: 'off'
      },
      color: {
        type: String,
        default: 'positive'
      },
      text: {
        type: String
      }
    },
    computed: {
      checked(){
        return this.value == 'on' ? true : false;
      }
    },
    data(){
      return {
        toggleId: 'w-toggle-' + Math.random().toString(36).substring(2, 10)
      }
    },
    methods: {
      onToggle(){
        let el = document.getElementById(this.toggleId);
        el.checked = !el.checked;
      },
      toggleStatus(){
        let el = document.getElementById(this.toggleId);
        let status;
        if(el.checked){
          status = 'on';
        }else{
          status = 'off';
        }
        this.$emit('input', status);
        this.$emit('change');
      }
    }
  }
</script>
