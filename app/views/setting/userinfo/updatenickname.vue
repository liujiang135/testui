<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/userinfo" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">修改昵称</div>
		</w-header>
		<div class="w-content">
			<w-input class='mt10' v-model='nickname' type="text" label="昵称" placeholder="请输入昵称" ref='input'></w-input>
			<w-button class='btn' @click.native="submit" color="positive" block="true">保存</w-button>
		</div>
	</div>
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';
	import $ from '../../../lib/jquery';
	export default {
		data() {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				nickname: this.$route.query.nick_name
			}
		},
		mounted: function() {
			$(this.$refs.input.$el).find("input").focus();
		},
		methods: {
			submit: function() {
				var that = this;
				if(this.nickname == '') {
					this.hint("昵称不能为空!");
					return false;
				}
				$loading.show('加载中...');
				httpUtils.postRequest('/userinfo/ajaxupdatainfo/' + this.uId, {
					nick_name: that.nickname
				}, function(data) {
					$loading.hide();
					var data = data.data;
					if(data.statusCode == 200) {
						var obj = JSON.parse(getSessionStorage("userinfocontent"));
						obj.nick_name = that.nickname;
						obj = JSON.stringify(obj);
						setSessionStorage("userinfocontent", obj);

						that.$router.go(-1);
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