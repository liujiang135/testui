<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/prove" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">修改所在小区</div>
		</w-header>
		<div class="w-content">
			<w-input class='mt10' v-model='community' type="text" label="所在小区" placeholder="请输入小区名称" ref='input'></w-input>
			<w-button class='btn' @click.native="submit" color="positive" block="true">保存</w-button>
		</div>
	</div>
</template>
<script>
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../assets/js/utils/common-utils';
	import $ from '../../../lib/jquery';
	export default{
		data(){
			return{
				community:this.$route.query.community,
			}
		},
		mounted: function() {
			$(this.$refs.input.$el).find("input").focus();
		},
		methods: {
			submit: function() {
				var that = this;
				$loading.show('加载中...');
				httpUtils.postRequest('/userinfo/ajaxupdatepersoninfo',{
					parameter:that.community,
					type:"community"
				}, function(data) {
					if(data.data.result == true)
					{
						$toast.show("修改成功", 1500);
						var UserInfo=JSON.parse(getSessionStorage("provecontent"));
						UserInfo.community=that.community;
						setSessionStorage("provecontent",JSON.stringify(UserInfo));
					}else{
						$toast.show(data.data.message, 1500);
					}
				})

			},
		
		}
	}
</script>
<style scoped>
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
