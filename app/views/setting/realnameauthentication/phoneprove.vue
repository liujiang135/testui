<template>
	<div class="w-body">
		<w-header color="blue-bg">
	      <router-link to="/passageway" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">手机号实名认证</div>
	    </w-header>
	    <div class="w-content" id='prove'>
	    	<div class="edit">
	    		<w-input class='inputitem'  v-model="username" type="text" label="姓名"   placeholder="请输入姓名"></w-input>
	    		<w-input class='inputitem'  v-model="userphone" type="number" label="手机号"   placeholder="请输入手机号"></w-input>
	    		<w-input class='inputitem'  v-model="userid" type="text" label="身份证"   placeholder="请输入身份证号"></w-input>
	    		<w-button class='btn' @click.native='submit' color="positive" block="true">立即认证</w-button>
	    	</div>
	    	<!--认证成功-->
	    	<div class="success">
	    		<div class='tip'>
	    			<w-icon class='checkmark' type="ios-checkmark" ></w-icon>
	    			<span>实名认证成功！</span>
	    		</div>
	    		<div class="userinfo">
	    				<p>
		    				<span>真实姓名:</span>
		    				<span>{{successname}}</span>
		    			</p>
		    			<p>
		    				<span>身份证号:</span>
		    				<span>{{successid}}</span>
		    			</p>
	    		</div>
	    		<w-button v-on:click.native='finish()' class='btn' color="positive" block="true">完成</w-button>
	    	</div>
	    	<!--认证失败-->
	    	<div class="fail">
	    		<div class='tip'>
	    			<w-icon class='alert' type="android-alert" ></w-icon>
	    			<span>实名认证失败！</span>
	    		</div>
	    		<p class='fail_tip'>{{failmessage}}</p>
	    		<w-button v-on:click.native='back' class='btn' color="positive" block="true">返回修改</w-button>
	    	</div>
	    </div>
	</div>	
</template>

<script>
	import httpUtils from 'http-utils';
	import $ from '../../../lib/jquery'
	import {openApp, getLocalStorage, setLocalStorage,setSessionStorage,getSessionStorage} from '../../../js/utils/common-utils';

	export default{
		data(){
			return{
				username:'',
				userphone:'',
				userid:'',
				successname:'',
				successid:'',
				failmessage:''
			}
		},
		methods:{
			submit:function(){
				var that=this;
				if(that.username=='')
				{
					this.hint("用户名不能为空!");
					return false;
				}else if(that.userphone=='')
				{
					this.hint("手机号不能为空!");
					return false;
				}else if(that.userid=='')
				{
					this.hint("身份证号不能为空!");
					return false;
				}
				$loading.show('加载中...');
				httpUtils.getRequest('/realnameauthentication/ajaxphone',{userid:that.userid,username:that.username,userphone:that.userphone},function(data){
					var data=data.data;
					console.log(data);
					if(data.success==true)
					{
						that.gorealname();

					}else{
						$loading.hide();
						that.failmessage=data.message;
						$(".edit").hide();
						$(".fail").show();
					}
				})
			},
			hint:function(message){
				$toast.show(message, 1500).then(function(){
		         
		        });
			},
			back:function(){
				$(".fail").hide();
				$(".edit").show();
			},
			gorealname:function(){
				var authDate=new Date().getTime();
				var that=this;
				var obj={
					userId:localStorage.getItem('userid'),
					authProvider:"alibaba",
					authType:0,
					authStatus:2,
					authDate:authDate,
					authData:{
						name:that.username,
						idCard:that.userid,
						mobile:that.userphone
					}
				}
				httpUtils.postRequest("/userinfo/ajaxaddrealname",{obj},function(data){
					var data=data.data;
					$loading.hide();
					if(data.statusCode==200)
					{
						that.successname="*"+that.username.substr(1);
						that.successid=that.userid.replace(/^(\w{7})\w{5}(.*)$/, '$1*****$2');
						
						var obj=JSON.parse(getSessionStorage("userinfocontent"));
                        obj.auth_status= '2';
						obj=JSON.stringify(obj);
		   				setSessionStorage("userinfocontent",obj);
						
						$(".edit").hide();
						$(".success").show();
					}else{
						that.failmessage=data.message;
						$(".edit").hide();
						$(".fail").show();
					}
				})
				
			},
			finish:function(){
				this.$router.push('/prove');
			}
		}
	}
</script>

<style scoped>
	.w-content{background-color: white;bottom: 0px;}
	.edit{
		
	}
	.success{
		display: none;
	}
	.fail{
		display: none;
	}
	.btn{
		width: 95%;
	    margin: auto;
	    margin-top: 40px;
	    background-color: #1f86ed;
	}
	.checkmark{
		color: #00ca74;
		font-size: 28px;
		position: relative;
	    right: 10px;
	    top: 4px;
	}
	.alert{
		color: #ca1300;
		font-size: 28px;
		position: relative;
	    right: 10px;
	    top: 4px;
	}
	.tip{
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-top: 40px;
	}
	.tip span{
		font-size: 17px;
	}
	.userinfo{
		margin: auto;
		width: 234px;
    	margin-top: 30px;
	}
	.fail_tip{
		color: #666666;
		text-align: center;
		margin-top: 20px;
	}
</style>