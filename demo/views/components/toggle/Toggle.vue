<template>
  <w-frame title="开关">
    <!--Toggle-->
    <div id="toggle" class="component-body">
      <h3>属性</h3>

      <h4>color</h4>
      <p class="p-sub-item">可选值：【*positive, balanced, assertive, energized, calm, dark】</p>
      <w-toggle v-model="status1" color="positive"></w-toggle>
      <w-toggle v-model="status2" color="balanced"></w-toggle>
      <w-toggle v-model="status3" color="assertive"></w-toggle>
      <w-toggle v-model="status4" color="energized"></w-toggle>
      <w-toggle v-model="status5" color="calm"></w-toggle>
      <w-toggle v-model="status6" color="dark"></w-toggle>

      <h4>text</h4>
      <p class="p-sub-item">可选值：【*(empty)】</p>
      <w-toggle v-model="status7" text="文本信息"></w-toggle>

      <h3>事件</h3>
      <h4>change</h4>
      <w-toggle v-model="status8" @change="change()"></w-toggle>
      <div>
        <a href="javascript:void(0)" @click="showToggleStatus()">获取Toggle状态</a>
      </div>
    </div>
  </w-frame>
</template>

<script>
  import Frame from '../Frame'
  export default {
    data() {
      return {
        status1: 'on',
        status2: 'on',
        status3: 'on',
        status4: 'on',
        status5: 'on',
        status6: 'on',
        status7: 'on',
        status8: 'on'
      }
    },
    methods: {
      change(){
        alert(this.status8);
      },
      showToggleStatus(){
        alert(this.status8);
      }
    },
    components: {
      'w-frame': Frame
    }
  }

</script>
