<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<div slot="title">修改手机号码</div>
		</w-header>
		<div class="w-content">
			<w-icon type="checkmark-circled" class='sucess_icon'></w-icon>
			<p class="sucess_tip">修改手机号码成功</p>
			<p class='phone'>当前手机号码:<span>{{phone}}</span></p>
			<w-button class='btn' @click.native="submit" color="positive" block="true">完成</w-button>
		</div>
	</div>
</template>

<script>
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../js/utils/common-utils';
	export default {
		data() {
			return {
				phone: this.$route.query.mobile,
			}
		},
		methods: {
			submit: function() {
				this.$router.push('/userinfo');
			}
		}
	}
</script>

<style scoped>
	.w-content {
		background-color: white;
	}
	
	.sucess_icon {
		font-size: 58px;
		text-align: center;
		margin: auto;
		display: block;
		margin-top: 50px;
		color: #0f8ee8;
	}
	
	.sucess_tip {
		text-align: center;
		font-size: 13px;
		margin: 0px;
	}
	
	.phone {
		text-align: center;
		margin: 0px;
		font-size: 11px;
	}
	
	.phone span {
		color: #0f8ee8;
	}
	
	.btn {
		width: 95%;
		margin: auto;
		margin-top: 30px;
		clear: both;
		border-radius: 10px;
		background: #25a5ff;
		font-size: 17px;
	}
</style>