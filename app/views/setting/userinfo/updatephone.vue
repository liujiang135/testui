<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to='/userinfo' class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title" v-if='mobileNow!="未绑定手机号"'>修改手机号码</div>
			<div slot="title" v-if='mobileNow=="未绑定手机号"'>绑定手机号码</div>
		</w-header>
		<div class="w-content">
			<p class='nowphone' v-if='mobileNow!="未绑定手机号"'>当前手机号码:{{mobileNow}}</p>
			<w-input class='mt10' v-model='mobile' type="number" label="手机号码" placeholder="请输入手机号码"></w-input>
			<w-button class='btn' @click.native="submit" color="positive" block="true">下一步</w-button>
		</div>
	</div>
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';
    var mobilereg= /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	export default {
		data() {
			return {
				mobileNow: '',
				mobile: '',
				code: '',
				time: 5,
			}
		},
		mounted: function() {
			var that = this;
			var obj = JSON.parse(getSessionStorage("userinfocontent"));
			if(obj.mobile_no != '' && obj.mobile_no != null) {
				that.mobileNow = obj.mobile_no.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2');
			} else {
				that.mobileNow = '未绑定手机号';
			}
		},
		methods: {
			submit: function() {
				var that = this;
				if( mobilereg.test(this.mobile) == false) {
					that.hint("请输入正确的手机号!");
					return false;
				}
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
					console.log(data)
					if(data.statusCode == 200) {
						that.$router.push({
							path: '/updatephonecode',
							query: {
								code: that.code,
								mobile: that.mobile,
							}
						})
					} else {
						that.hint("短信发送失败，请重试 !");
					}
				})
			},
			hint: function(message) {
				$toast.show(message, 1500).then(function() {

				});
			},
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
	
	.nowphone {
		margin: 6px;
		margin-left: 15px;
		color: #444444;
	}
	
	.mt10 {
		margin-top: 10px;
	}
</style>