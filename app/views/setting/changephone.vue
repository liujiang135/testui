<template>
	<div class="w-body">
		<w-header color="blue-bg">
	      <router-link to="/devicelock" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">换绑手机</div>
	    </w-header>
	    <div class="w-content">
	    	<w-list class="mylist mt10">
		        <w-list-item class="item-icon-right">
		           <w-input type="tel" v-model="newPassword" placeholder="输入新手机号码"></w-input>
		        </w-list-item>
		         <w-list-item class="item-icon-right">
		           <input class="code" type="text" placeholder="输入验证码"/>
		           <router-link to="/getcode">
		           		<span class="code-btn">发送验证码</span>
		           </router-link>
		        </w-list-item>
	      	</w-list>
	      	<w-button class="submit-btn" color="positive" block="true">确认</w-button>
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
	.w-content{
		bottom: 0px;
		background-color: white;
	}
 .mylist{margin-bottom: 0;}
  .item-icon-right{
    position: relative;
    margin: 0;
    border:0;
    padding:25px 15px 25px 90px;
    font-size: 16px;
  }
  .item-icon-right:after{content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
    transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
  .mylist .item-icon-right{
  	padding: 0px;
    padding-bottom: 1px;
    }
  .tel{width: 100%;}
  .code{
  	width: 65%;
  	line-height: 50px;
  	height: 50px;
  	padding-left: 15px;
  	padding-right: 15px;
  	box-sizing: border-box;
  	float: left;
  }
  .code-btn{
  	line-height: 50px;
  	font-size: 14px;
  	color: #0f8ee8;
  }
  .submit-btn{
  	width: 90%;
  	margin: auto;
  	margin-top: 40px;
    border-radius: 10px;
    background: #25a5ff;
    font-size: 17px;
  }
</style>