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
	    		<w-input   v-model='inputcode'  type="text" label="验证码"   placeholder="请输入邮箱验证码"></w-input>
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
	import {openApp, getLocalStorage, setLocalStorage,setSessionStorage,getSessionStorage} from '../../../assets/js/utils/common-utils';
	import $ from '../../../lib/jquery';
	export default{
		data(){
			return{
				email:this.$route.query.email,
				inputcode:'',
                num: 120,
                countstr: "(120)秒后重发",
				countnumflg:'',
			}
		},
		mounted:function(){
			this.countdown();
		},
		methods:{
			sendcodefn:function(){
				var that=this;
				$loading.show('发送邮箱验证码...');
				httpUtils.getRequest("/userinfo/getemailcode",{email:that.email},function(data){
					var data=data.data;
					if(data.statusCode==200 && data.result == true)
					{
                        $loading.hide();
						$(".sendcode").hide();
						$(".countdown").show();
						that.num=120;
						that.countstr="("+that.num+")秒后重发";
						that.countdown();
					}else{
						$toast.show(data.response);
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
				if(that.inputcode =='' || that.inputcode == null){
					$toast.show('请输入验证码')
				}
				$loading.show('数据处理中...');
				httpUtils.postRequest('/userinfo/updateemail/',{email:that.email,emailCode:that.inputcode},function(data){
					var data=data.data;
					if(data.statusCode==200  && data.result == true)
					{
                        $loading.hide();
						clearInterval(that.countnumflg);
		   				localStorage.setItem("email",that.email);
						that.$router.push({ path: '/emailcodesuccess', query: {email:that.email}})
					}else{
                        $toast.show(data.response);
					}
				})
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
		margin-top: 10px;
    	font-size: 13px;
    	margin-bottom: 5px;
	}
	.tophone{
		text-align: center;
		color: #0f8ee8;
		margin: 0 ;
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
		background: #F76B4F;
		height: 50px;
	    text-align: center;
    	color:#ffffff ;
    	position: relative;
	}
	.sendcode:after{content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
	    transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
	.sendcode_btn{
		padding: 0px;
		font-size: 14px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.btn{
		width: 95%;
		margin: auto;
		margin-top: 100px;
		clear: both;
		border-radius: 25px;
		background: linear-gradient(90deg,#1acbe9, #37BAF3,#1F99D1); /* 标准的语法 */
		border:0;
		font-size: 16px;
	}
</style>