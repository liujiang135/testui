<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/userinfo" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">修改民族</div>
		</w-header>
		<div class="w-content">
			<!--<w-cascade :fields="sex" :data="types" :value="value" :on-change="onChange" class="mt10"></w-cascade>-->
			<w-list-item class="item-icon-right mt10" @click.native="popupVisible = true">
				民族
				<span class="item-note">{{value}}</span>
				<i class="icon ion-ios-arrow-right royal"></i>
			</w-list-item>
			<w-button class='btn' @click.native="submit" color="positive" block="true">保存</w-button>

			<w-popup v-model="popupVisible" position="bottom" class="w-popup">
				<w-picker :slots="dataSlots" @change="onDataChange" :visible-item-count="5" :show-toolbar="true">
					<div class='popup_title'>民族</div>
				</w-picker>
			</w-popup>
		</div>
	</div>
</template>

<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';
	var nationarray = ['汉族', '阿昌族', '白族', '保安族', '布朗族', '布依族', '朝鲜族', '达斡尔族', '傣族', '德昂族', '东乡族', '侗族',
		'独龙族', '俄罗斯族', '鄂伦春族', '仫佬族', '鄂温克族', '高山族', '仡佬族', '苗族', '哈尼族', '哈萨克族', '赫哲族', '蒙古族', '回族',
		'基诺族', '京族', '景颇族', '柯尔克孜族', '拉祜族', '黎族', '门巴族', '傈僳族', '珞巴族', '满族', '毛南族', '纳西族', '怒族', '普米族', '羌族', '撒拉族',
		'畲族', '水族', '塔吉克族', '塔塔尔族', '土家族', '土族', '佤族', '维吾尔族', '乌孜别克族', '锡伯族', '瑶族', '彝族', '裕固族', '藏族', '壮族', '外国血统', '其他'
	];
	export default {
	    data(){
            return{
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0
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
					nation: that.value
				}, function(data) {
					$loading.hide();
					var data = data.data;
					if(data.statusCode == 200) {
						var obj = JSON.parse(getSessionStorage("userinfocontent"));
						obj.nation = that.value;
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
			}
		},
		data() {
			return {
				value: this.$route.query.nation,
				popupVisible: false,
				dataSlots: [{
					flex: 1,
					values: nationarray,
					className: 'slot1',
					textAlign: 'center',
					defaultIndex: 0
				}],
				indexflg: 0,
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