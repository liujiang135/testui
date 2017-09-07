<template>
	<div class="w-body">
		<w-header >
	      <router-link to="/userinfo" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">实名认证</div>
	    </w-header>
	    <div class="w-content">
	    	<div class="headerflg">
	    		<img src="assets/images/prove.png" alt="" />
	    		<p>您已通过实名认证</p>
	    	</div>
	    	<w-list class="mylist">
	    		<w-list-item class="item-icon-right">
	            	<div class="item-note-left">
		        		真实姓名
		        		<span class="item-note">{{name}}</span>
		        	</div>
	        	</w-list-item>
	        	<w-list-item class="item-icon-right">
	            	<div class="item-note-left">
		        		身份证号
		        		<span class="item-note">{{idcard}}</span>
		        	</div>
	        	</w-list-item>
	    	</w-list>
	    	<div class="foot_tip">AAS将依法保护你的隐私安全</div>
	    </div>	
	</div>	
</template>

<script>
	import httpUtils from 'http-utils';

	export default{
		data: function () {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				name:'',
				idcard:''
				}
		},
		mounted:function () {
	   		var that=this;
	   		$loading.show('数据加载中');
	   		httpUtils.getRequest("/userinfo/ajaxgetuserinfo",{userid:this.uId},function(data){
	   			//console.log(data.data);
	   			$loading.hide();
	   			var data=data.data;
	   			if(data.statusCode==200)
	   			{
	   				var response=data.data;
	   				var name=response.full_name;
	   				var id=response.id_card;
	   				that.name="*"+name.substr(1);
	   				that.idcard=id.replace(/^(\w{7})\w{5}(.*)$/, '$1*****$2');
	   			}else{
	   				that.hint(data.message);
	   			}
	   		})
	    },
		
	}
</script>

<style scoped>
	.bar-header{
		background-color: white;
		color: red;
	}
	.button{
		color: #444;
	}
	.headerflg{
		width: 100%;
		background-color: #077eed;
		text-align: center;
		padding-top: 30px;
		position: relative;
	}
	.headerflg img{
		width: 260px;
	}
	.headerflg p{
		position: absolute;
	    bottom: 6px;
	    font-size: 20px;
	    color: white;
	    letter-spacing: 1px;
	    left: 50%;
	    margin-left: -84px;
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
	.mylist .item-icon-right{padding:18px 15px;}
	.foot_tip{
		color: #9f9f9f;
	    position: fixed;
	    bottom: 30px;
	    text-align: center;
	    width: 100%;
	    font-size: 13px;
	    letter-spacing: 1px;
    }
</style>