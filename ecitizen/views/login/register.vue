<template>
	<div class="w-body">
		<div class="header">
			<router-link class='back_btn' to='/login'>
				<w-icon class='back' type="ios-arrow-left"></w-icon>
			</router-link>
			<p>注册</p>
		</div>
		<div class="w-content">
			<div class="content_box">
				<div class='input_item'>
					<w-input type="text" placeholder="请输入手机号"></w-input>
				</div>
				<div class='input_item mt10 code_box'>
					<w-input type="tel" placeholder="请输入验证码"></w-input>
					<div class='code'>
						<!--<p>获取验证码</p>-->
						<span>60s</span>
					</div>
				</div>
				<router-link to='/password' class='helf'>
					<w-button class='login_btn'>下一步</w-button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.w-content {
		bottom: 0px;
		top: 40px;
		background-color: #1aa7dd;
	}
	
	.header {
		width: 100%;
		height: 40px;
		background-color: #1aa7dd;
		position: relative;
	}
	
	.header p {
		line-height: 40px;
		color: white;
		text-align: center;
		font-size: 16px;
	}
	
	.back_btn {
		display: block;
		width: 40px;
		height: 40px;
		padding-left: 13px;
		padding-top: 5px;
		position: absolute;
	}
	
	.back {
		color: white;
		font-size: 33px;
	}
	
	.content_box {
		width: 100%;
		padding: 0px 50px;
		margin-top: 80px;
	}
	
	.input_item {
		width: 100%;
		margin: auto;
		border-radius: 5px;
		overflow: hidden;
		border-radius: 14px;
		padding: 5px;
		background-color: white;
		position: relative;
	}
	
	.input_item .w-input {
		height: 40px;
	}
	
	.input_item .w-input:after {
		height: 0px;
	}
	
	.mt10 {
		margin-top: 10px;
	}
	
	.code_box {
		padding-right: 90px;
		position: relative;
	}
	
	.code {
		position: absolute;
		width: 75px;
		top: 0px;
		height: 50px;
		right: 0px;
		line-height: 50px;
	}
	
	.code p {
		color: #ffb504;
	}
	
	.code span {
		display: block;
		text-align: center;
		font-size: 16px;
		letter-spacing: 1px;
		color: #aaa;
		margin-right: 16px;
	}
	
	.code:before {
		content: "";
		position: absolute;
		background-color: #383838;
		display: block;
		left: -10px;
		bottom: 17px;
		right: auto;
		height: 15px;
		width: 1px;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleX(0.5);
		-webkit-transform: scaleX(0.5);
		z-index: 10;
	}
	
	.helf {
		display: block;
		position: relative;
		top: 30px;
	}
	
	.login_btn {
		width: 100%;
		border-radius: 20px;
		background-color: #383838;
		color: white;
		letter-spacing: 1px;
	}
</style>