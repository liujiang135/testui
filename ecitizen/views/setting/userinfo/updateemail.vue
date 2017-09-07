<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/userconfig" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
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
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../assets/js/utils/common-utils';

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
			var email = localStorage.getItem('email');
			if(email){
				that.nowemail = email.replace(/^(\w{2})\w{3}(.*)$/, '$1***$2');
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
				$loading.show('发送中...');
				httpUtils.getRequest("/userinfo/getemailcode", {email: that.email}, function(data) {
					$loading.hide();
					var data = data.data;
					//console.log(data)
					if(data.statusCode == 200 && data.result == true) {
						that.$router.push({
							path: '/emailcode',
							query: {
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
		margin-top: 10px;
		margin-left: 15px;
	}
	
	.btn {
		width: 95%;
		margin: auto;
		margin-top: 20px;
		border-radius: 25px;
		background: linear-gradient(90deg,#1acbe9, #37BAF3,#1F99D1); /* 标准的语法 */
		border:0;
		font-size: 16px;
	}
	
	.mt10 {
		margin-top: 10px;
	}
</style>