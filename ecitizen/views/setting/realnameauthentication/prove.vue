<template>
	<div class="w-body">
	    <div class="w-content">
	    	<div class="headerflg">
	    		<router-link to="/setting" class="button button-icon icon ion-ios-arrow-left back_btn" slot="left" ></router-link>
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
		        		性别
		        		<span class="item-note">{{sex}}</span>
		        	</div>
	        	</w-list-item>
	        	<w-list-item class="item-icon-right">
	            	<div class="item-note-left">
		        		证件类型
		        		<span class="item-note">{{idType}}</span>
		        	</div>
	        	</w-list-item>
	        	<w-list-item class="item-icon-right">
	            	<div class="item-note-left">
		        		证件号码
		        		<span class="item-note">{{idcard}}</span>
		        	</div>
	        	</w-list-item>
	        	<w-list-item class="item-icon-right">
	            	<div class="item-note-left">
		        		出生日期
		        		<span class="item-note">{{birthDate}}</span>
		        	</div>
	        	</w-list-item>
	        	<w-list-item class="item-icon-right">
	            	<div class="item-note-left">
		        		工作单位
		        		<span class="item-note">{{company}}</span>
		        	</div>
	        	</w-list-item>
	        	<w-list-item class="item-icon-right">
	        		<router-link  :to="{ path: '/updatecommunity',query: { community: community } }" class="updateitem" >
		            	<div class="item-note-left">
			        		所在小区
			        		<span class="item-note">{{community}}</span>
			        	</div>
			        	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
		        	</router-link>
	        	</w-list-item>
	        	<w-list-item class="item-icon-right">
	        		<router-link  :to="{ path: '/updateabode',query: { abode: abode } }" class="updateitem" >
	            	<div class="item-note-left">
		        		居住地
		        		<span class="item-note">{{abode}}</span>
		        	</div>
		        	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
		        	</router-link>
	        	</w-list-item>
	    	</w-list>
	    </div>	
	</div>	
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../assets/js/utils/common-utils';
	export default{
		data: function () {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				name:'',
				idcard:'',
				sex:'',
				idType:'',
				birthDate:'',
				company:'',
				community:'',
				abode:'',
				}
		},
		mounted:function () {
	   		
	   		if(!!getSessionStorage("provecontent"))
	   		{
	   			var UserInfo=JSON.parse(getSessionStorage("provecontent"));
	   			var that=this;
	   			if(!!UserInfo.name)
   	 			{
   	 				that.name="*"+UserInfo.name.substr(1);
   	 			}
   	 			if(!!UserInfo.sex)
   	 			{
   	 				that.sex=UserInfo.sex;
   	 			}
   	 			if(!!UserInfo.idType)
   	 			{
   	 				that.idType=UserInfo.idType;
   	 			}
   	 			if(!!UserInfo.idNumber)
   	 			{
   	 				that.idcard=UserInfo.idNumber.replace(/^(\w{7})\w{5}(.*)$/, '$1*****$2');
   	 			}
   	 			if(!!UserInfo.birthDate)
   	 			{
   	 				that.birthDate=UserInfo.birthDate;
   	 			}
   	 			if(!!UserInfo.company)
   	 			{
   	 				that.company=UserInfo.company;
   	 			}
   	 			if(!!UserInfo.abode)
   	 			{
   	 				that.abode=UserInfo.abode;
   	 			}
   	 			if(UserInfo.community)
   	 			{
   	 				that.community=UserInfo.community;
   	 			}
	   		}else{
	   			this.userinfo();
	   		}
	    },
	    methods: {
    		userinfo: function() {
    			 $loading.show('数据加载中');
    			var that = this;
           	 	httpUtils.getRequest("/userinfo/ajaxgetpersoninfo",function(data){
           	 		console.log(data);
           	 		$loading.hide();
           	 		if(data.status == 200)
           	 		{
           	 			var data=data.data;
           	 			var UserInfo=data.response.UserInfo;
           	 			setSessionStorage("provecontent",JSON.stringify(UserInfo));
           	 			
           	 			if(!!UserInfo.name)
           	 			{
           	 				that.name="*"+UserInfo.name.substr(1);
           	 			}
           	 			if(!!UserInfo.sex)
           	 			{
           	 				that.sex=UserInfo.sex;
           	 			}
           	 			if(!!UserInfo.idType)
           	 			{
           	 				that.idType=UserInfo.idType;
           	 			}
           	 			if(!!UserInfo.idNumber)
           	 			{
           	 				that.idcard=UserInfo.idNumber.replace(/^(\w{7})\w{5}(.*)$/, '$1*****$2');
           	 			}
           	 			if(!!UserInfo.birthDate)
           	 			{
           	 				that.birthDate=UserInfo.birthDate;
           	 			}
           	 			if(!!UserInfo.company)
           	 			{
           	 				that.company=UserInfo.company;
           	 			}
           	 			if(!!UserInfo.abode)
           	 			{
           	 				that.abode=UserInfo.abode;
           	 			}
           	 			if(UserInfo.community)
           	 			{
           	 				that.community=UserInfo.community;
           	 			}
           	 			
           	 		}else{
           	 			
           	 		}
           	 	})
    		}
	    }
		
	}
</script>

<style scoped>
	.w-content{
		top:0px;
		bottom: 0px;
	}
	.back_btn{
		position: fixed;
		top: 20px;
		left: 10px;
		color: white;
	}
	.headerflg{
		width: 100%;
		background: linear-gradient(90deg,#1acbe9, #37BAF3,#1F99D1);
		text-align: center;
		padding-top: 64px;
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
	.mylist .item-icon-right{padding:14px 15px;}
	.item-note{
		    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 225px;
	}
	.updateitem{
		color:#444444 ;
	}
	.updateitem .item-note{
		padding-right: 28px;
	}
</style>