<template>
  <w-frame title="提示">
    <div class="component-body">
      <h3>提示</h3>
        <w-button color="positive" block="true" @click="hint">提示</w-button>
      <h3>加载中...</h3>
        <w-button color="positive" block="true" @click="loading">加载中...</w-button>
    </div>
  </w-frame>
</template>

<script>
  import Frame from '../Frame'

  export default {
    components: {
      'w-frame': Frame
    },
    methods: {
      hint(){
        $toast.show('<i class="icon ion-checkmark assertive"></i><br/>正确', 1500).then(function(){
          alert('消失回调！');
        });
      },
      loading(){
        //用法一
        $loading.show('加载中...').then(function(){
          setTimeout(function(){
            $loading.hide();
          }, 1500);
        });
        //用法二
//        $loading.show('加载中...');
//        setTimeout(function(){
//          $loading.hide();
//        }, 1500);
      }
    }
  }
</script>
