<template>
	<!--认证通道-->
	<div class="w-body">
		<w-header color="blue-bg">
	      <router-link to="/userinfo" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">认证通道</div>
	    </w-header>
	  	<div class="w-content">
	  		<!--尚未绑定手机号跳转绑定手机号-->
	  		<div class='bind_mobile' v-if='mobile == "未绑定手机号" '>
	  			<p>您尚未绑定手机号,请您先绑定手机号,获取验证码,进行实名认证!</p>
	  			<router-link to="/updatephone">
	  				<w-button class='btn'  color="positive" block="true">绑定手机号</w-button>
	  			</router-link>
	  		</div>
	  		<!--填写验证码-->
	  		<div class='validate_code' v-if='mobile != "未绑定手机号" && mobilecode == false'>
	  			<p class='validate_code_tip'>请填写正确的手机验证码,进行实名认证!</p>
	  			<div class="code_box mt10">
					<w-input v-model='inputcode' type="number" label="验证码" placeholder="请输入短信验证码"></w-input>
				</div>
				<div v-if='sendcodeflag == false' class="countdown mt10">
					{{countstr}}
				</div>
				<div class="sendcode mt10" v-if='sendcodeflag == true'>
					<div class="sendcode_btn" @click="sendcodefn">
						<span>获取验证码</span>
					</div>
				</div>
				<w-button class='btn mt10' @click.native="submit" color="positive" block="true">确认</w-button>
	  		</div>
	  		<!--选择实名认证方式选择-->
	  	 	<w-list class="mylist" v-if='mobilecode == true'>
	  	 		<router-link to="/phoneprove">
		  	 		<w-list-item class="item-icon-right">
		            	<w-icon class='iphone-icon' type="iphone" ></w-icon>
		            	<div class="item-note-left">
			        		手机号实名认证
			        	</div>
			        	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
		        	</w-list-item>
	        	</router-link>
	        	<router-link to="/unionpayprove">
		        	<w-list-item class="item-icon-right">
		            	<img class='unionpay' src="assets/images/UnionPay.png"/>
		            	<div class="item-note-left">
			        		银行卡实名认证
			        	</div>
			        	<w-icon type="ios-arrow-right" color="clrc"></w-icon>
		        	</w-list-item>
	        	</router-link>
	  	 	</w-list>	
	  	</div>	
	</div>	
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';
export default{
	 data: function () {
	     return {
	     	mobile:'',
	     	mobilecode:false,//验证码成功以后显示选择实名类型
	     	num:60,
	     	time: 5,
	     	inputcode:'',
	     	code:'',
	     	countstr: "(60)秒后重发",
	     	sendcodeflag:false,//是否重新发送的标识
	     	countnumflg:'',//倒计时60s定时器
	     	timeout:'',//验证码过期时间计时器
	    }
	},
	mounted:function () {
		var that=this;
		var obj = JSON.parse(getSessionStorage("userinfocontent"));
		if(obj.mobile_no != '' && obj.mobile_no != null) {
			that.mobile = obj.mobile_no;
//			that.sendcodefn();
			that.sendcodeflag = true;
		} else {
			that.mobile = '未绑定手机号';
		}
	},
	methods:{
		sendcodefn: function() {
			var that = this;
			that.sendcodeflag=false;
			that.code = '';
			
			for(var i = 0; i < 5; i++) {
				that.code += Math.floor(Math.random() * 10);
			}
			$loading.show('加载中...');
			httpUtils.postRequest("/userinfo/ajaxgetpohonecode", {
				mobile: that.mobile,
				code: that.code,
				time: that.time
			}, function(data) {
				$loading.hide();
				var data = data.data;
				if(data.statusCode == 200) {
					that.num = 60;
					that.countstr = "(60)秒后重发";
					that.countdown();
					clearTimeout(that.timeout);
					that.timeout = setTimeout(function() {
						that.code = '';
					}, 300000)

				} else {
					$toast.show("服务器异常!");
				}
			})
		},
		countdown: function() {
			var that = this;
			this.countnumflg = setInterval(function() {
				that.num--;
				that.countstr = "(" + that.num + ")秒后重发";
				if(that.num == 0) {
					clearInterval(that.countnumflg);
					that.sendcodeflag=true;
				}
			}, 1000);
		},
		submit:function(){
			var that = this;
			if(that.code == '') {
				$toast.show("验证码已过期!");
				return false;
			}
			if(that.inputcode != that.code) {
				$toast.show("您输入的验证码不正确!");
				return false;
			}
			that.mobilecode=true;
		}
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
	 .mylist .item-icon-right{padding:18px 15px;}
	 .item-note-left{padding-left: 35px;}
	.iphone-icon{
    	font-size: 36px;left: 10px;
    	color: #0f8ee8;
    }
    .unionpay{
    	float: left;
	    width: 30px;
	    margin-top: 2px;
    }
    .btn{
    	width: 95%;
	    margin: auto;
	    margin-top: 20px;
	    border-radius: 10px;
	    background: #25a5ff;
	    font-size: 17px;
    }
    .bind_mobile{
    	margin-top: 20px;
    }
    .bind_mobile p{
    	width: 95%;
    	margin: auto;
    }
    .code_box {
		width: 75%;
		float: left;
		height: 50px;
	}
	.countdown {
		width: 25%;
		float: left;
		background-color: #dddddd;
		height: 50px;
		text-align: center;
		line-height: 50px;
		color: white;
	}
	
	.sendcode {
		width: 25%;
		float: left;
		background-color: #FFFFFF;
		height: 50px;
		text-align: center;
		color: #0f8ee8;
		position: relative;
	}
	
	.sendcode:after {
		content: "";
		position: absolute;
		background-color: #ddd;
		display: block;
		left: 0;
		bottom: 0px;
		right: auto;
		height: 1px;
		width: 100%;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	
	.sendcode_btn {
		width: 90%;
		height: 40px;
		line-height: 40px;
		margin: auto;
		margin-top: 5px;
		border: 1px solid #0f8ee8;
		border-radius: 4px;
	}
	.validate_code_tip{
		width: 80%;
		padding: 10px 0 0 15px;
		text-align: left;
	}
	.validate_code .btn{
		margin-top: 85px;
	}
</style>