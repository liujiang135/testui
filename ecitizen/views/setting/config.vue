<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/setting" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">账户安全</div>
		</w-header>
		<div class="w-content">
			<div class="tips">账户</div>
			<w-list class="mylist">
				<router-link  :to="{ path: '/updatephone' }">
					<w-list-item class="item-icon-right">手机号码
						<span class="item-note">{{phone}}</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
				<router-link :to="{ path: '/updateemail' }">
					<w-list-item class="item-icon-right">邮箱
						<span class="item-note">{{email}}</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
			</w-list>
			<div class="tips">安全</div>
			<w-list class="mylist">
				<router-link to="/editpassword">
					<w-list-item class="item-icon-right">
						修改密码
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
			</w-list>
		</div>
		<div class="w-footer">
			<w-button color="positive" block="true" @click="logout">退出当前账号</w-button>
		</div>
		<w-popup v-model="popupVisible" position="right" class="mint-popup-2" :modal="false">
			<iframe style="width: 100%;height: 100%;" :src="logouturl"></iframe>
		</w-popup>
	</div>
</template>
<script>
	import config from '../../assets/js/config'
	import httpUtils from '../../assets/js/utils/http-utils'
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../assets/js/utils/common-utils';
    var websocket;
	export default {
		data() {
			return {
				phone:localStorage.getItem("phone") ? localStorage.getItem("phone"):"未绑定",
				email : localStorage.getItem("email") ? localStorage.getItem("email"):"未绑定",
                popupVisible:true,
                logouturl:""
			}
		},
		mounted: function() {
            var that = this;
            httpUtils.getRequest('/common/checkSessionindex',function(data) {
                if(data && data.data.result !='success') {
                    that.$router.push({path:'/setting'});
                }
            });
		},
		methods: {
			logout() {
				var that = this;
				httpUtils.getRequest('/common/checkSessionindex', function(data) {
					if(data && data.data.result =='success') {
						that.initWebsocket();
					} else {
                        localStorage.removeItem('userid');
                        localStorage.removeItem('username');
                        localStorage.removeItem('sessionIndex');
                        localStorage.removeItem('userinfo');
                        localStorage.removeItem('favoriteApps');
                        localStorage.removeItem('messagelist');
                        sessionStorage.removeItem('userinfocontent');
                        that.$router.push({path:'/setting'});
					}
				});
			},
			initWebsocket() {
			    var that = this;
				var ThemeableBrowser;
				var uuid = device.uuid;
				if(!window.WebSocket) {
                    $toast.show('This browser is not support websocket!');
					return false;
				}
				var wsurl = config.aas_websocket_host + "/?id="+ uuid;
                websocket = new WebSocket(wsurl);
				//监听消息
                websocket.onmessage = function(event) {
					var jsonData = JSON.parse(event.data);
					if(jsonData.path =='logout') {
					    if(jsonData.result && jsonData.relayState == uuid){
                            localStorage.removeItem('userid');
                            localStorage.removeItem('username');
                            localStorage.removeItem('sessionIndex');
                            localStorage.removeItem('userinfo');
                            localStorage.removeItem('favoriteApps');
                            sessionStorage.removeItem('userinfocontent');
                            $toast.show('登出成功 :)');
                            that.$router.push({path:'/setting'});
                            that.logouturl = '';
                            websocket.close();
                        }else {
                            that.logouturl = '';
                            websocket.close()
                            $toast.show('登出失败，请重试 :(');
                        }
					} else {
						that.logouturl = '';
                        websocket.close()
					}
				};
				// 关闭WebSocket
                websocket.onclose = function(event) {
					//WebSocket Status:: Socket Closed
				};
				// 打开WebSocket
                websocket.onopen = function(event) {
                    $loading.show('数据处理中',10000);
					that.logouturl = config.is_sso_host + '/login/ssologout?sessionIndex=' + localStorage.getItem('sessionIndex') + '&username=' + localStorage.getItem('username') + '&uuid='+ uuid;
//					ThemeableBrowser = cordova.ThemeableBrowser.open(logouturl, config.browser_target, config.browser_options);
				};
                websocket.onerror = function() {
					$toast.show('websocket error!');
				};
			},
		}
	}
</script>
<style scoped>
	.tips{font-size: 13px;padding: 8px 15px;color:#666666;}
	.mylist {
		margin-bottom: 0;
	}
	.item-note{margin-right: 33px;}
	.item-icon-right {
		position: relative;
		margin: 0;
		border: 0;
		padding: 25px 15px 25px 90px;
		font-size: 16px;
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

	.mylist .item-icon-right {
		padding: 12px 15px;
	}
	
	.w-footer .button {
		margin: 0;
		border-radius: 0;
		background: linear-gradient(90deg,#1acbe9, #37BAF3,#1F99D1); /* 标准的语法 */
		font-size: 16px;
		border:0;
	}
	.mint-popup-2 {
		width: 0;
		height: 0;
		background-color: #fff;
	}
</style>