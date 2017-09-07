<template>
	<div class="w-body">
		<w-header color="blue-bg">
	      <router-link to="/userconfig" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">最近登录记录</div>
	    </w-header>
	    <div class="w-content">
	    	<w-list class="mylist mt10">
		          <w-list-item class="item-icon-right" @click.native="showseet('手机2')">
		            <div>我的iphone</div>
            		<div style="color: #aaa;">ip:1:1:1</div>
		            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
		          </w-list-item>
		           <w-list-item class="item-icon-right">
		            <div>我的iphone</div>
            		<div style="color: #aaa;">ip:1:1:1</div>
		            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
		          </w-list-item>
		           <w-list-item class="item-icon-right">
		            <div>我的iphone</div>
            		<div style="color: #aaa;">ip:1:1:1</div>
		            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
		          </w-list-item>
		     </w-list>
	    </div>	
	</div>	
</template>

<script>
	export default{
		methods:{
			showseet:function(item){
				$actionSheet.show({
		          title: '删除后'+item+"需要重新设置",
		          buttons:[{text: '按钮1', color: '#E31FD7', callback: function(){
							alert('按钮1');
						}},{text: '按钮2', color: 'blue', callback: function(){
							alert('按钮2');
					}}],
		          cancelText:"取消"
		        })
			}
		},
		 beforeRouteLeave (to, from, next) {
			 $actionSheet.hide();//离开页面时隐藏actionSheet
			 next();
			 } 
	}
</script>

<style scoped>
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
  .mylist .item-icon-right{padding:6px 15px;}
  .item-note{margin-right: 33px;}
</style>