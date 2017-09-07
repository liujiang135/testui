<template>
	<div class="w-content">
		<img class="logo" src="assets/images/login/logo.png" />
		<div class="content_box">
			<div class="input_item">
				<img class="phone" src="assets/images/login/phone.png" />
				<w-input type="text" placeholder="用户名/手机号"></w-input>
				<div class='line'></div>
				<img class="yaoshi" src="assets/images/login/yaoshi.png" />
				<w-input type="password" placeholder="请输入密码"></w-input>
			</div>
			<w-button class='login_btn'>登录</w-button>
			<router-link to='/register'>
				<div class='register'>注册</div>
			</router-link>
			<router-link to='/forgetpassword'>
				<div class="forgetpassword">忘记密码</div>
			</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.w-content {
		bottom: 0px;
		top: 0px;
		background-color: #1aa7dd
	}
	
	.logo {
		display: block;
		margin: auto;
		width: 85px;
		margin-top: 70px;
	}
	
	.content_box {
		width: 100%;
		padding: 0px 50px;
	}
	
	.input_item {
		width: 100%;
		margin: auto;
		border-radius: 5px;
		overflow: hidden;
		border-radius: 19px;
		padding: 5px;
		background-color: white;
		margin-top: 40px;
		position: relative;
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.input_item .w-input {
		padding-left: 40px;
	}
	
	.input_item .w-input:after {
		height: 0px;
	}
	
	.line {
		width: 93%;
		position: relative;
		height: 1px;
		margin: auto;
	}
	
	.line:after {
		content: "";
		position: absolute;
		background-color: #383838;
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
	
	.phone {
		position: absolute;
		top: 21px;
		z-index: 5;
		left: 35px;
		width: 15px;
	}
	
	.yaoshi {
		position: absolute;
		top: 74px;
		z-index: 5;
		left: 35px;
		width: 15px;
	}
	
	.login_btn {
		width: 100%;
		border-radius: 20px;
		margin-top: 30px;
		background-color: #383838;
		color: white;
		letter-spacing: 1px;
	}
	
	.register {
		color: white;
		float: left;
		margin-top: 20px;
		margin-left: 20px;
		letter-spacing: 1px;
	}
	
	.forgetpassword {
		color: white;
		float: right;
		margin-top: 20px;
		margin-right: 20px;
		letter-spacing: 1px;
	}
</style>