<template>
	<div class="w-body">
		<w-header color="blue-bg">
	      <router-link to="/userconfig" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">设备锁</div>
	    </w-header>
	    <div class="w-content">
		    <w-list class="mylist mt10">
		          <w-list-item class="item-icon-right lh">
		            	密码锁
	            	 <w-toggle  class='toggle' v-model="status" color="balanced"></w-toggle>
		          </w-list-item>
	      	</w-list>
	      	<p class='point'>开启设备锁,在未验证的设备登录账户，需要密码手机短信验证。</p>
	      	<w-list class="mylist mt10">
	      		<router-link to="/changephone">
		          <w-list-item class="item-icon-right">
		            	密保手机
	            	 <span class="item-note">198***1992</span>
		          </w-list-item>
		         </router-link> 
	      	</w-list>
	      	<p class='point'>通过登录验证的设备</p>
	      	<w-list class="mylist">
		        <w-list-item class="item-icon-right">
		            	<div>本机</div>
		            	<div class="a-color">iphone9.1</div>
		            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
		        </w-list-item>
		        <w-list-item class="item-icon-right">
		            	<div>JUIME-PC</div>
		            	<div class="a-color">电脑</div>
		            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
		        </w-list-item>
		    </w-list>
      	</div>
	</div> 	
</template>

<script>
	 export default {
	 	data() {
	      return {
	        status: 'on',
	      }
    	}
	 }
</script>

<style scoped>
	.w-content{bottom: 0;}
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
  .mylist .item-icon-right{padding:12px 15px;}
  .point{color: #999;font-size: 12px;margin-left:5px;margin-top: 5px;margin-bottom: 5px;}
  .toggle{float: right;}
   .a-color{
    	color: #AAAAAA;
    }
    .lh{
    	line-height: 34px;
    }
</style>