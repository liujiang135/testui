<template>
 <div class="w-body">
	<w-header color="blue-bg">
      <router-link to="/setting" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
      <div slot="title">账户资料</div>
    </w-header>
    <div class="w-content">
    	<w-list class="mylist mt10">
    		<router-link  :to="{ path: '/updatephone' }">
	         	<w-list-item class="item-icon-right">
	            	手机号码
            		<span class="item-note">{{mobile_no}}</span>
            	 <w-icon type="ios-arrow-right" color="clrc"></w-icon>
	        	</w-list-item>
	        </router-link> 
	        <router-link :to="auth_status ? (auth_status == '2' ? '/prove' : '/passageway') : ''">
		        <w-list-item class="item-icon-right">
		            	实名认证
	            	<span v-if='auth_status == "1"' class="item-note red">未实名认证</span>
	            	<span v-if='auth_status == "2"' class="item-note blue">实名用户</span>
		            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
		        </w-list-item>
	         </router-link>
       </w-list>
       
       <w-list class="mylist mt10">
       		<router-link  :to="{path:'/updatenickname',query:{nick_name:nick_name}}">
	          <w-list-item class="item-icon-right">
	            	昵称
            	<span class="item-note">{{nick_name}}</span>
            	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
	          </w-list-item>
	      	</router-link>
	      	<router-link :to="{path:'/updatesex',query:{sex:sex}}">
		        <w-list-item class="item-icon-right">
		            	性别
	            	<span class="item-note">{{sex}}</span>
	            	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
		         </w-list-item>
	         </router-link>
	         <router-link :to="{ path: '/updatenation',query: { nation: nation } }">
	        	 <w-list-item class="item-icon-right">
		            	民族
	            	<span class="item-note">{{nation}}</span>
		            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
		          </w-list-item>
	         </router-link> 
	        <router-link :to="{ path: '/updateemail' }">
	          <w-list-item class="item-icon-right">
	            	邮箱
            	<span class="item-note">{{email_id}}</span>
            	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
	          </w-list-item>
	        </router-link>
	        <router-link :to="{ path: '/updateaddress',query: { address: address } }">
	           <w-list-item class="item-icon-right">
	            	<span>地址</span>
	            <span class="item-note address">{{address}}</span>
	            <w-icon type="ios-arrow-right" color="clrc"></w-icon>
	          </w-list-item>
	        </router-link> 
       </w-list>
    </div>	
  </div>  
</template>
<script>
	import httpUtils from 'http-utils';
	import $ from '../../lib/jquery';
	import {openApp, getLocalStorage, setLocalStorage,setSessionStorage,getSessionStorage} from '../../js/utils/common-utils';
	export default{
      data: function () {
          return {
            uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
          	mobile_no:'',
          	nick_name:'',
          	email_id:'',
          	address:'',
          	sex:'',
          	nation:'',
          	auth_status:''
          }
      	},
      	beforeCreate(){
	    	
	    },
	   mounted:function () {
	   		var that=this;
	   		if(getSessionStorage("userinfocontent") != null)
	   		{

	   			var obj=JSON.parse(getSessionStorage("userinfocontent"));
	   			if(obj.mobile_no!='' && obj.mobile_no != null)
   				{
   					that.mobile_no=obj.mobile_no.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2');
   				}else{
   					that.mobile_no='未绑定手机号'
   				}
   				if(obj.email_id!='' && obj.email_id != null)
   				{
   					that.email_id=obj.email_id.replace(/^(\w{2})\w{3}(.*)$/, '$1***$2');
   				}else{
   					that.email_id='未绑定邮箱'
   				}
	   			that.nick_name=obj.nick_name;
	   			that.address=obj.address;
	   			that.sex=obj.sex;
	   			that.nation=obj.nation;
	   			if(obj.auth_status!=null)
	   			{
	   				that.auth_status=obj.auth_status;
	   			}else{
	   				that.auth_status='1';
	   			}
	   			
	   		}else{
	   			this.pageinit();
	   		}
	    },
	    methods:{
	    	pageinit:function(){
	    		var that=this;
		   		httpUtils.getRequest("/userinfo/ajaxgetuserinfo",{userid:this.uId},function(data){
//		   			console.log(data.data);
		   			var data=data.data;
		   			if(data.statusCode==200)
		   			{
		   				var response=data.data;
		   				var mobile_no=response.mobile_no;
		   				if(mobile_no!='' && mobile_no != null)
		   				{
		   					that.mobile_no=mobile_no.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2');
		   				}else{
		   					that.mobile_no='未绑定手机号'
		   				}
		   				
		   				that.nick_name=response.nick_name;
		   				var emailid=response.email_id;
		   				if(emailid!='' && emailid != null)
		   				{
		   					that.email_id=emailid.replace(/^(\w{2})\w{3}(.*)$/, '$1***$2');
		   				}else{
		   					that.email_id='未绑定邮箱'
		   				}
		   				
		   				that.address=response.address;
		   				that.sex=response.sex;
		   				that.nation=response.nation;
		   				if(response.auth_status=='2')
		   				{
		   					that.auth_status=response.auth_status;
		   				}else{
		   					that.auth_status='1';
		   				}
		   				
		   				var obj=response;
		   				obj=JSON.stringify(obj);
		   				setSessionStorage("userinfocontent",obj);
		   				
		   			}else{
		   				that.hint(data.message);
		   			}
		   		})
	    	},
	    	hint:function(message){
				$toast.show(message, 1500).then(function(){
		         
		        });
			}
	    },
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
  .item-note{margin-right: 33px;}
  .red{color: red;}
  .edit_btn{background-color: #0f8ee8;}
  .blue{color: #0f8ee8;}
  .address{
  	width:-moz-calc(100% - 90px); 
  	width:-webkit-calc(100% - 90px); 
  	width: calc(100% - 90px);
  	overflow: hidden;
  } 
</style>