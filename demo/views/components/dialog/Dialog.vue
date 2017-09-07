<template>
  <w-frame title="对话框">
    <div class="component-body">
      <h3>提示框</h3>
      <w-button color="positive" block="true" @click="alert">提示框</w-button>
      <h3>对话框</h3>
      <w-button color="positive" block="true" @click="comfirm">对话框</w-button>
      <p style="color: red; font-size: 12px; margin-top: 20px;">注意：<br>&nbsp;&nbsp;&nbsp;&nbsp;按钮上如果有回调函数，必须保证回调函数返回值为true，否则视为回调不成功</p>
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
      alert(){
        $dialog.alert({
          title: '提示',
          content: '提示信息内容',
          okButton: {
            text: '确定'
          }
        });
      },
      comfirm(){
        var p = {};
        p.name = "张三";
        $dialog.confirm({
          title: '提示',
          content: '对话框内容',
          okButton: {
            text: '确定',
            callback: function(){
              alert('回调函数');
              return true;
            }
          },
          cancelButton: {
            text: '取消'
          },
          okTheme: 'assertive'
        });
      }
    }
  }
</script>