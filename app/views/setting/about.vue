<template>
  <div class="w-body">
    <w-header color="blue-bg">
      <router-link to="/setting" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
      <div slot="title">关于我们</div>
    </w-header>
    <div class="w-content">
  		  <div class="icon-box">
  		   	<img src="assets/images/icon_aas.png"/>
  		  </div>
  		  <w-list class="mylist">
  		  	<w-list-item class="item-icon-right">
          	<span class="mes-title">当前版本</span>
          	 <span class="item-note">1.2.1</span>
        	</w-list-item>
        	<w-list-item class="item-icon-right">
          	<span class="mes-title">版本更新</span>
          	 <span class="item-note">无版本更新</span>
        	</w-list-item>
  		  </w-list>
  		  <w-list class="mylist mt10">
  		  		<w-list-item class="item-icon-right">
	          	<span class="mes-title">微博</span>
	          	 <span class="item-note">苏州云坤信息科技有限公司</span>
        		</w-list-item>
        		<w-list-item class="item-icon-right">
	          	<span class="mes-title">邮箱</span>
	          	 <span class="item-note">service@wingconn.com</span>
        		</w-list-item>
        		<w-list-item class="item-icon-right">
	          	<span class="mes-title">公众号</span>
	          	 <span class="item-note">苏州云坤信息科技有限公司</span>
        		</w-list-item>
  		  </w-list>
  		  <!--<w-list class="mylist mt10">
  		  	<w-list-item class="item-icon-right">
	          	<span class="mes-title">意见反馈</span>
	          	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
        	</w-list-item>
  		  </w-list>	-->
    </div>
  </div>
</template>
<style scoped>
 .mylist{margin-bottom: 0;}
  .item-icon-right{
    position: relative;
    margin: 0;
    border:0;
    padding:25px 15px 25px 90px;
  }
  .item-icon-right:after{content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
       transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
	.mylist .item-icon-right{padding:4px 15px;}
  .mylist .item-icon-right .uicon{width:40px;padding-right: 15px;vertical-align: middle}
  .mylist .item-icon-right .mes-title{font-size:16px;line-height: 39px;vertical-align: middle}
  .mylist .item-note{line-height: 39px;}
  .icon-box{
  	width: 100%;
  	height: 180px;
  	text-align: center;
  	box-sizing: border-box;
  	overflow: hidden;
  	padding-top: 33px;
  	position: relative;
  }
  .icon-box:after{content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
     transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
  	
  .icon-box img{
  	text-align: center;
  	width: 78px;
  }
</style>