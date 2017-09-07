<template>
  <div class="w-body">
    <w-header color="blue-bg">
      <router-link to="/userconfig" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
      <div slot="title">修改密码</div>
    </w-header>
    <div class="w-content">
      <div id="editpwd">
        <w-input label="密码" type="password" v-model="newPassword" placeholder="请输入6~20位新密码"></w-input>
        <div class="button-area">
          <w-button color="positive" block="true">确认</w-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {newPassword:""}
    }
  }
</script>
<style scoped>
  .w-content{background: #ffffff;bottom: 0;}
  #editpwd{margin:0;padding-top: 40px;font-size:16px;}
  .button-area{padding: 50px 15px;}
  .button-area .button{margin:0;border-radius: 10px;background: #25a5ff;font-size: 17px;}
</style>