<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/userinfo" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title" v-if='nowemail!="未绑定邮箱"'>修改邮箱</div>
			<div slot="title" v-if='nowemail=="未绑定邮箱"'>绑定邮箱</div>
		</w-header>
		<div class="w-content">
			<p class='nowemail' v-if='nowemail!="未绑定邮箱"'>当前邮箱:{{nowemail}}</p>
			<w-input class='mt10' v-model='email' type="email" label="邮箱" placeholder="请输入邮箱地址"></w-input>
			<w-button class='btn' @click.native="submit" color="positive" block="true">下一步</w-button>
		</div>
	</div>
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';

	export default {
		data() {
			return {
				nowemail: '',
				email: '',
				code: '',
			}
		},
		mounted: function() {
			var that = this;
			var obj = JSON.parse(getSessionStorage("userinfocontent"));
			if(obj.email_id != '' && obj.email_id != null) {
				that.nowemail = obj.email_id.replace(/^(\w{2})\w{3}(.*)$/, '$1***$2');
			} else {
				that.nowemail = '未绑定邮箱'
			}
		},
		methods: {
			submit: function() {
				var that = this;
				var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(!myreg.test(that.email)) {
					that.hint("请输入正确邮箱格式");
					return false;
				}
				that.code = '';
				for(var i = 0; i < 5; i++) {
					that.code += Math.floor(Math.random() * 10);
				}
				var title = "云坤科技有限公司";
				var content = "您好，欢迎您使用云坤科技AAS客户端，您正在使用邮箱验证服务，您的邮箱验证码为:" + that.code;
				that.$router.push({
					path: '/emailcode',
					query: {
						code: that.code,
						email: that.email,
						nowemail: that.nowemail
					}
				})
				$loading.show('发送邮箱验证码...');
				httpUtils.postRequest("/userinfo/ajaxgetemail", {
					toAddress: that.email,
					title: title,
					content: content
				}, function(data) {
					$loading.hide();
					var data = data.data;
					//console.log(data)
					if(data.statusCode == 200) {
						that.$router.push({
							path: '/emailcode',
							query: {
								code: that.code,
								email: that.email,
							}
						})
					} else {
						that.hint(data.message);
					}
				})
			},
			hint: function(message) {
				$toast.show(message, 1500).then(function() {

				});
			}
		}
	}
</script>

<style scoped>
	.nowemail {
		margin: 6px;
		margin-left: 15px;
	}
	
	.btn {
		width: 95%;
		margin: auto;
		margin-top: 20px;
		border-radius: 10px;
		background: #25a5ff;
		font-size: 17px;
	}
	
	.mt10 {
		margin-top: 10px;
	}
</style>