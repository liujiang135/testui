<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/userconfig" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">修改密码</div>
		</w-header>
		<div class="w-content">
			<div class="editpwd">
				<w-input label="旧密码:" :type="type" v-model="oldPassword" placeholder="若包含字母,请注意区分大小写" ref='oldPassword'></w-input>
				<p class='tip'>{{oldPasswordtip}}</p>
				<w-input label="新密码:" :type="type" class='newPassword' v-model="newPassword" placeholder="6-12位,数字或字母" ref='newPassword'></w-input>
				<p class='tip'>{{newPasswordtip}}</p>
				<div class="button-area">
					<w-button color="positive" block="true" @click.native="submit">确认</w-button>
					<div class='showbtn' @click='toggle'>
						<w-icon v-show='type=="text"' class='show_icon' type='ios-checkmark'></w-icon>
						<w-icon v-show='type=="password"' class='hidden_icon' type='ios-circle-outline'></w-icon>
						<span>显示密码</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import httpUtils from 'http-utils';
	import $ from '../../../lib/jquery';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';

	export default {
		data() {
			return {
				newPassword: '',
				oldPassword: '',
				type: 'password',
				newPasswordtip: '',
				oldPasswordtip: '',
				userid: '',
				userKey: '',
			}
		},
		mounted: function() {
			var obj = JSON.parse(getSessionStorage("userinfocontent"));
			this.userid = obj.user_id;
			this.userKey = obj.user_name;

			var that = this;
			var newpasswordel = $(that.$refs.newPassword.$el).find("input");
			newpasswordel.on("blur", function() {
				if(that.newPassword.length < 6) {
					that.newPasswordtip = "密码长度不能小于6位";
				} else if(that.newPassword.length > 12) {
					that.newPasswordtip = "密码长度不能超过12位";
				}
			})
			var oldPasswordel = $(that.$refs.oldPassword.$el).find("input");
			oldPasswordel.on("focus", function() {
				that.oldPasswordtip = '';
			})
		},
		methods: {
			submit: function() {
				var that = this;
				if(that.oldPassword == '') {
					that.oldPasswordtip = '您还未输入旧密码';
					return false;
				}
				if(that.newPassword == '') {
					that.newPasswordtip = "密码长度不能小于6位";
					return false;
				}
				if(that.newPasswordtip != '') {
					return false;
				}
				if(that.oldPasswordtip != '') {
					return false;
				}
				$loading.show('数据加载中');
				httpUtils.getRequest("/userinfo/ajaxvalidatepassword", {
					password: that.oldPassword,
					userKey: that.userKey
				}, function(data) {
					
					var data = data.data;
					if(data.statusCode == 200) {
						var response = data.data;
						if(!!response.userId) {
							that.editpassword();
						} else {
							$loading.hide();
							that.oldPasswordtip = '旧密码错误,请重试';
						}
					}
				})
			},
			toggle: function() {
				if(this.type == "text") {

					this.type = "password";

				} else {

					this.type = "text";

				}
			},
			editpassword: function() {
				var that = this;
				httpUtils.postRequest("/userinfo/ajaxeditpassword", {
					password: that.newPassword,
					userid: that.userid
				}, function(data) {
					$loading.hide();
					
					var data = data.data;
					if(data.statusCode == 200) {
						setTimeout(function() {
							$toast.show("密码修改成功!", 1500).then(function() {
								that.$router.push("/userconfig");
							})
						}, 500)

					}
				})
			}
		},
		watch: {
			newPassword: function() {
				var that = this;
				var Regx = /^[A-Za-z0-9]*$/;
				if(Regx.test(that.newPassword)) {
					that.newPasswordtip = '';
				} else {
					that.newPasswordtip = "密码只能是数字或字母!"
				}

			}
		}
	}
</script>
<style scoped>
	.w-content {
		background: #ffffff;
		bottom: 0;
	}
	
	.editpwd {
		margin: 0;
		padding-top: 20px;
		font-size: 16px;
	}
	
	.button-area {
		padding: 50px 15px;
		padding-top: 8px;
		position: relative;
		top: 17px;
	}
	
	.button-area .button {
		margin: 0;
		border-radius: 10px;
		background: #25a5ff;
		font-size: 17px;
	}
	
	.newPassword {
		margin-top: 8px;
		font-size: 14px
	}
	
	.showbtn {
		width: 100px;
		line-height: 22px;
		padding-top: 5px;
	}
	
	.show_icon {
		font-size: 20px;
		position: relative;
		top: 3px;
		left: 3px;
		color: #25a5ff;
	}
	
	.hidden_icon {
		font-size: 20px;
		position: relative;
		top: 3px;
		left: 3px;
		color: #484746;
	}
	
	.showbtn span {
		font-size: 12px;
		color: #484746;
	}
	
	.tip {
		/*position: absolute;*/
		margin-left: 15px;
		font-size: 13px;
		margin-top: 3px;
		color: #f93b3b;
	}
</style>