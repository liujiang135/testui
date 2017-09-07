<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/userinfo" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">修改地址</div>
		</w-header>
		<div class="w-content">
<!--			<w-list-item class="item-icon-right">
				所在地区
				<a href="javascript:void(0)" @click='aa'>
					<span class="item-note">请选择</span>
					<i class="icon ion-ios-arrow-right royal"></i>
				</a>
			</w-list-item>-->
			<w-input label="详细地址" class='mt10' v-model='address' type="text" placeholder="请输入地址" style="margin-top: 10px;"></w-input>
			<w-button class='btn' @click.native="submit" color="positive" block="true">保存</w-button>
		</div>
		<w-popup v-model="popupVisible" position="bottom" class="w-popup" :modal="false">
			<!--<w-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false"></w-picker>-->
		</w-popup>
	</div>
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';
	import addressjson from '../../../js/cityjson'
	export default {
		data() {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				address: this.$route.query.address,
				popupVisible: false
				//				address:addressjson.address
			}
		},
		methods: {
			submit: function() {
				var that = this;
				$loading.show('加载中...');
				httpUtils.postRequest('/userinfo/ajaxupdatainfo/' + this.uId, {
					address: that.address
				}, function(data) {
					$loading.hide();
					var data = data.data;
					if(data.statusCode == 200) {
						var obj = JSON.parse(getSessionStorage("userinfocontent"));
						obj.address = that.address;
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
			},
			aa: function() {
				console.log("11");
				console.log(this.address);
			}
		},
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
	
	.item-icon-right {
		font-size: 14px;
		box-sizing: border-box;
		margin: 0px;
		height: 50px;
		border-width: 0px;
		margin-top: 10px;
	}
	
	.item-icon-right:after {
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
</style>