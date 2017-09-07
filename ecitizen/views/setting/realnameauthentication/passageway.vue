<template>
	<!--认证通道-->
	<div class="w-body realnameauth">
		<w-header color="blue-bg">
	      <a @click="back" class="button button-icon icon ion-ios-arrow-left" slot="left"></a>
	      <div slot="title">实名认证</div>
	    </w-header>
	  	<div class="w-content">
			<iframe style="width: 100%;height: 100%;" :src="authurl"></iframe>
	  	</div>	
	</div>	
</template>

<script>
import config from '../../../assets/js/config';
import httpUtils from 'http-utils';
import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../../assets/js/utils/common-utils';
var authWs;
export default{
	 data: function () {
	     return {
             authurl:''
	    }
	},
	mounted:function () {
		var authflag = getSessionStorage('authenticationflage');
		if(authflag == 'YES'){
		    this.$router.push({path:'/prove'});
		}else{
		    this.toauth();
		}
	},
	methods:{
        back:function () {
			this.authurl = '';
			if(typeof authWs == 'object'){
			    authWs.close();
			}
			this.$router.push({path:'/setting'});
        },
        toauth:function () {
            var authTB;
            var  uuid = device.uuid;
            var that = this;
            if(!window.WebSocket){
                $toast.show('This browser is not support websocket!');
            }
            var wsurl = config.aas_websocket_host + "/?id="+ uuid;
            authWs=new WebSocket(wsurl);
            //监听消息
            authWs.onmessage = function(event) {
                var jsonData = JSON.parse(event.data);
                console.log(jsonData)
                if(jsonData.path =='auth'){
                    if(jsonData.result = 'Y' && jsonData.fromApp == uuid){
                        $toast.show('实名认证成功 :)');
                        setSessionStorage("authenticationflage","YES");
//                        that.getauthstate();
//                        authTB.close();
                        that.authurl = '';
                        authWs.close();
                        setTimeout(function () {
                            that.$router.push({path:'/prove'});
                        },1000);
                    }else{
                        setSessionStorage("authenticationflage","NO");
//                        authTB.close();
                        $toast.show('实名认证失败，请重试 :(');
                        that.back();
                    }
                }else{
                    setSessionStorage("authenticationflage","NO");
					that.back();
                }
            };
            // 关闭WebSocket
            authWs.onclose = function(event) {
                //WebSocket Status:: Socket Closed
            };
            // 打开WebSocket
            authWs.onopen = function(event) {
                var authurl = config.aas_backend_host + '/realname/auth?uuid=' + uuid;
                that.authurl = authurl;
//                authTB = cordova.ThemeableBrowser.open(authurl, config.browser_target, config.browser_options).addEventListener('exit',function(){
//                    authWs.close();
//                });
            };
            authWs.onerror =function(){
                $toast.show('websocket error!');
            };
        }
	}
  }
</script>

<style scoped>
	.realnameauth .w-content{bottom: 0;}
</style>