<template>
	<div class="w-body">
		<w-header color="blue-bg">
	      <router-link  :to="{ path: '/updateemail' }" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">安全校验</div>
	    </w-header>
	    <div class="w-content">
	    	<p class="title_tip">已发送验证码到您邮箱</p>
	    	<p class="tophone">{{email}}</p>
	    	<div class="code_box mt10">
	    		<w-input   v-model='inputcode'  type="number" label="验证码"   placeholder="请输入邮箱验证码"></w-input>
	    	</div>
	    	<div class="countdown mt10">
	    		{{countstr}}
	    	</div>
	    	<div class="sendcode mt10">
	    		<div class="sendcode_btn" @click="sendcodefn">
	    			<span>重新获取</span>
	    		</div>
	    	</div>
	    	<w-button class='btn' @click.native="submit" color="positive" block="true">下一步</w-button>
	    </div> 	
	</div>    
</template>

<script>
	import httpUtils from 'http-utils';
	import {openApp, getLocalStorage, setLocalStorage,setSessionStorage,getSessionStorage} from '../../../js/utils/common-utils';
	import $ from '../../../lib/jquery';
	export default{
		data(){
			return{
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				email:this.$route.query.email,
				code:this.$route.query.code,
				inputcode:'',
				countstr:"(60)秒后重发",
				countnumflg:'',
				num:60,
			}
		},
		mounted:function(){
			this.countdown();
		},
		methods:{
			sendcodefn:function(){
				var that=this;
				that.code='';
				for(var i=0;i<5;i++) 
				{ 
				 that.code+=Math.floor(Math.random()*10); 
				}
				var title="【AAS】邮箱绑定验证";
				var content="您好，欢迎您使用云坤科技AAS客户端，您正在使用邮箱验证服务，您的邮箱验证码为:"+that.code;
				$loading.show('发送邮箱验证码...');
				httpUtils.postRequest("/userinfo/ajaxgetemail",{toAddress:that.email,title:title,content:content},function(data){
					$loading.hide();
					var data=data.data;
					console.log(data)
					if(data.statusCode==200)
					{
						$(".sendcode").hide();
						$(".countdown").show();
						that.num=60;
						that.countstr="(60)秒后重发";
						that.countdown();
					}else{
						that.hint(data.message);
					}
				})
			},
			countdown:function(){
				var that=this;
				this.countnumflg=setInterval(function(){
					that.num--;
					that.countstr="("+that.num+")秒后重发";
					if(that.num==0)
					{
						clearInterval(that.countnumflg);
						$(".countdown").hide();
						$(".sendcode").show();
					}
				},1000);
			},
			submit:function(){
				var that=this;
				if(that.inputcode!=that.code)
				{
					that.hint("您输入的验证码不正确!");
					return false;
				}
				$loading.show('加载中...');
				httpUtils.postRequest('/userinfo/ajaxupdatainfo/'+this.uId,{email_id:that.email},function(data){
					$loading.hide();
					var data=data.data;
					if(data.statusCode==200)
					{
						clearInterval(that.countnumflg);
//						var email=that.email.replace(/^(\w{2})\w{3}(.*)$/, '$1***$2');
						var obj=JSON.parse(getSessionStorage("userinfocontent"));
						obj.email_id=that.email;
						obj=JSON.stringify(obj);
		   				setSessionStorage("userinfocontent",obj);
						
						that.$router.push({ path: '/emailcodesuccess', query: {email:that.email}})
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
		beforeRouteLeave(to, from, next){
			clearInterval(this.countnumflg);
			next();
		}
	}
</script>

<style scoped>
	.title_tip{
		text-align: center;
		margin-top: 5px;
    	font-size: 13px;
    	margin-bottom: 5px;
	}
	.tophone{
		text-align: center;
		color: #0f8ee8;
	}
	.code_box{
		width: 75%;
		float: left;
		height: 50px;
	}
	.countdown{
		width: 25%;
		float: left;
		background-color: #dddddd;
		height: 50px;
	    text-align: center;
    	line-height: 50px;
    	color: white;
	}
	.sendcode{
		display: none;
		width: 25%;
		float: left;
		background-color: #FFFFFF;
		height: 50px;
	    text-align: center;
    	color:#0f8ee8 ;
    	position: relative;
	}
	.sendcode:after{content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
	    transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
	.sendcode_btn{
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: auto;
		margin-top: 5px;
		border: 1px solid #0f8ee8;
		border-radius: 4px;
	}
	.btn{
		width: 95%;
		margin: auto;
		margin-top: 100px;
		clear: both;
		border-radius: 10px;
	    background: #25a5ff;
	    font-size: 17px;
	}
</style>