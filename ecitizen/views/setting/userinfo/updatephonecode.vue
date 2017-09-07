<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link :to="{ path: '/updatephone' }" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">安全校验</div>
		</w-header>
		<div class="w-content">
			<p class="title_tip">已发送验证码到您的手机</p>
			<p class="tophone">{{mobile}}</p>
			<div class="code_box mt10">
				<w-input v-model='inputcode' type="text" label="验证码" placeholder="请输入短信验证码"></w-input>
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
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../assets/js/utils/common-utils';
	import $ from '../../../lib/jquery';
	export default {
		data() {
			return {
				mobile: this.$route.query.mobile,
				time: 5,
				num: 120,
				countstr: "(120)秒后重发",
				countnumflg: '',
				inputcode: '',
				timeout: '', //定时器清除code
			}

		},
		mounted: function() {
			var that = this;
			this.countdown();
			this.timeout = setTimeout(function() {
				that.code = '';
			}, 300000)
		},
		methods: {
			sendcodefn: function() {
				var that = this;
				that.code = '';
				for(var i = 0; i < 5; i++) {
					that.code += Math.floor(Math.random() * 10);
				}
				$loading.show('加载中...');
				httpUtils.getRequest("/userinfo/getpohonecode", {
					phone: that.mobile
				}, function(data) {
					$loading.hide();
					var data = data.data;
					if(data.statusCode == 200 && data.result == true) {
						$(".sendcode").hide();
						$(".countdown").show();
						that.num = 120;
						that.countstr = "("+that.num+")秒后重发";
						that.countdown();
						clearTimeout(that.timeout);
						that.timeout = setTimeout(function() {
							that.code = '';
						}, 300000)

					} else {
                        that.hint("短信发送失败，请重试 !");
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
						$(".countdown").hide();
						$(".sendcode").show();
					}
				}, 1000);
			},
			submit: function() {
				var that = this;
				$loading.show('数据处理中...');
				httpUtils.postRequest('/userinfo/updatephone', {
                    phone: that.mobile,
					smsCode: that.inputcode
				}, function(data) {
					var data = data.data;
					if(data.statusCode == 200 && data.result == true) {
                        $loading.hide();
						localStorage.setItem('phone',that.mobile);
						that.$router.push({
							path: '/updatephonesuccess',
							query: {
								mobile: that.mobile
							}
						})
					} else {
                        $toast.show(data.response);
					}
				})
			}
		},
		beforeRouteLeave(to, from, next) {
			clearInterval(this.countnumflg);
			clearTimeout(this.timeout);
			next();
		}
	}
</script>

<style scoped>
	.title_tip {
		text-align: center;
		margin-top: 10px;
		font-size: 13px;
		margin-bottom: 5px;
	}
	
	.tophone {
		text-align: center;
		color: #0f8ee8;
		margin: 0 ;
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
		display: none;
		width: 25%;
		float: left;
		background: #F76B4F;
		color: #fff;
		height: 50px;
		text-align: center;
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
		padding: 0px;
		font-size: 14px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	
	.btn {
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