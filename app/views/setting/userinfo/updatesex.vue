<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/userinfo" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">修改性别</div>
		</w-header>
		<div class="w-content">
			<!--<w-cascade :fields="sex" :data="types" :value="value" :on-change="onChange" class="mt10"></w-cascade>-->
			<w-list-item class="item-icon-right mt10" @click.native="popupVisible = true">
				性别
				<span class="item-note">{{value}}</span>
				<i class="icon ion-ios-arrow-right royal"></i>
			</w-list-item>
			<w-button class='btn' @click.native="submit" color="positive" block="true">保存</w-button>

			<w-popup v-model="popupVisible" position="bottom" class="w-popup">
				<w-picker :slots="dataSlots" @change="onDataChange" :visible-item-count="3" :show-toolbar="true">
					<div class='popup_title'>性别</div>
				</w-picker>
			</w-popup>
		</div>
	</div>
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';
	export default {
		data() {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				sexarray: ['男', '女'],
				value: this.$route.query.sex,
				dataSlots: [{
					flex: 1,
					values: ['男', '女'],
					className: 'slot1',
					textAlign: 'center',
					defaultIndex: 0
				}],
				popupVisible: false,
				indexflg: 0,
			}
		},
		methods: {
			submit: function() {
				var that = this;
				if(that.value == '') {
					$toast.show("内容不能为空");
					return false;
				}
				$loading.show('加载中...');
				httpUtils.postRequest('/userinfo/ajaxupdatainfo/' + this.uId, {
					sex: that.value
				}, function(data) {
					$loading.hide();
					var data = data.data;
					if(data.statusCode == 200) {
						var obj = JSON.parse(getSessionStorage("userinfocontent"));
						obj.sex = that.value;
						obj = JSON.stringify(obj);
						setSessionStorage("userinfocontent", obj);

						that.$router.go(-1);
					} else {

						$toast.show(data.message);
					}
				})
			},
			onDataChange: function(picker, values) {
				var that = this;
				if(that.indexflg == 0) {
					that.indexflg++;
					if(that.value != '') {
						setTimeout(function() {
							picker.setSlotValue(0, that.value);
						}, 100)
					}
					return false;
				}
				this.value = values[0];
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
	
	.item-icon-right {
		border-width: 0px;
		margin-left: 0px;
		margin-right: 0px;
	}
	
	.w-popup {
		width: 100%;
	}
	
	.popup_title {
		height: 30px;
		width: 100%;
		line-height: 30px;
		text-align: center;
		position: relative;
		background-color: #f5f5f5;
	}
	
	.popup_title:after {
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