<template>
	<div class="w-body">
		<w-header color="blue-bg">
	      <router-link to="/changephone" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">填写验证码</div>
	    </w-header>
	    <div class="w-content">
	    	<div class="tip-phone">
	    		<span class="tip">验证码已发送到手机</span>
	    		<span class="phone">+15050122516</span>
	    	</div>
			<div class="input-box">
				<input class='code' id="code1" @keyup="code1($event)"  type="text" maxlength="1"/>
				<input class='code' id="code2" @keyup="code2($event)" type="text" maxlength="1"/>
				<input class='code' id="code3" @keyup="code3($event)" type="text" maxlength="1"/>
				<input class='code' id="code4" type="text" maxlength="1"/>
			</div>
			<w-button class="submit-btn" color="positive" block="true">下一步</w-button>
			<p class="getagain">重新获取验证码(<span>25s</span>)</p>
	    </div>	
	</div>	
</template>

<script>
	import $ from 'jquery'
	export default{
		mounted:function(){
			$(".code").on("focus",function(){
				$(".code").css("borderColor","#ccc");
				$(this).css("borderColor","#25a5ff");
			})
			$(".code").on("blur",function(){
				$(".code").css("borderColor","#ccc");
			})
		},
		methods:{
			code1:function(el){
				if($(el.target).val()!='')
				{
					$("#code2").focus();
				}
			},
			code2:function(el){
				if($(el.target).val()!='')
				{
					$("#code3").focus();
				}
				
			},
			code3:function(el){
				if($(el.target).val()!='')
				{
					$("#code4").focus();
				}
				
			},
		}
	}
</script>

<style scoped>
	.w-content{
		bottom: 0px;
		background-color: white;
	}
	.tip-phone{
		text-align: center;
		margin-top: 20px;
	}
	.tip{
		color: #999;
	}
	.phone{
		font-size: 17px;
	}
	.input-box{
		text-align: center;
    width: 288px;
    height: 50px;
    margin: auto;
    margin-top: 20px;
	}
	.input-box input{
		width: 50px;
		height: 50px;
		float: left;
		margin-left: 20px;
		border: 1px solid #CCCCCC;
		font-size: 18px;
		text-align: center;
		border-radius: 5px;
		background-color: #f7f7f7;
	}
	.submit-btn{
  	width: 90%;
  	margin: auto;
  	margin-top: 40px;
    border-radius: 10px;
    background: #25a5ff;
    font-size: 17px;
  }
  .getagain{
  	text-align: center;
    margin-top: 10px;
    color: #999999;
  }
</style>