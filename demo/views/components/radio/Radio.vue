<template>
  <w-frame title="单选按钮">
    <!--Radio-->
    <div id="radio" class="component-body">
      <h3>属性</h3>
      <h4>val</h4>
      <p class="p-sub-item">radio的值</p>
      <h4>text</h4>
      <p class="p-sub-item">显示的文本</p>
      <w-radio text="文本" color="positive"></w-radio>
      <h4>color</h4>
      <p class="p-sub-item">可选值：【*positive, balanced, assertive, energized, calm, dark, royal】</p>
      <w-radio text="单选"></w-radio>
      <w-radio text="单选" color="balanced"></w-radio>
      <w-radio text="单选" color="assertive"></w-radio>
      <w-radio text="单选" color="energized"></w-radio>
      <w-radio text="单选" color="calm"></w-radio>
      <w-radio text="单选" color="dark"></w-radio>
      <w-radio text="单选" color="royal"></w-radio>
      <h3>事件</h3>
      <p>change事件</p>
      <w-radio text="单选1" color="balanced" v-model="value" val="1" @change="change"></w-radio>
      <w-radio text="单选2" color="balanced" v-model="value" val="2" @change="change"></w-radio>
      <div>
        <a href="javascript:void(0)" @click="getRadioStatus()">获取选中的值</a>
      </div>
    </div>
  </w-frame>
</template>

<script>
  import Frame from '../Frame'
  export default {
    data() {
      return {
        value: '1'
      }
    },
    methods: {
      change(){
        alert('值：' + this.value);
      },
      getRadioStatus(){
        alert(this.value);
      }
    },
    components: {
      'w-frame': Frame
    }
  }

</script>
