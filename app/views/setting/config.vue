<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/setting" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
			<div slot="title">账户设置</div>
		</w-header>
		<div class="w-content">
			<w-list class="mylist mt10">
				<router-link to="/editpassword">
					<w-list-item class="item-icon-right">
						修改密码
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
<!--				<router-link to="/devicelock">
					<w-list-item class="item-icon-right">
						设备锁
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>-->
			</w-list>
			<!--<p class='point'>当前在线</p>
			<w-list class="mylist ">
				<w-list-item class="item-icon-right">
					<w-icon class='iphone-icon' type="iphone"></w-icon>
					<div class="item-note-left">
						<div>我的iphone</div>
						<div class="a-color">ip:1:1:1</div>
					</div>
					<div class="item-note">本机</div>
				</w-list-item>
				<w-list-item class="item-icon-right">
					<w-icon class="mac-icon" type="android-desktop"></w-icon>
					<div class="item-note-left">
						<div>我的iphone</div>
						<div class="a-color">ip:1:1:1</div>
					</div>
					<div class="item-note-down">下线</div>
				</w-list-item>
			</w-list>
			<router-link to="/loginrecord">
				<p class='point of-color'>最近登录记录....</p>
			</router-link>-->
		</div>
		<div class="w-footer">
			<w-button color="positive" block="true" @click="logout">退出当前账号</w-button>
		</div>
	</div>
</template>
<script>
	import config from '../../js/config'
	import httpUtils from '../../js/utils/http-utils'
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../js/utils/common-utils';
	export default {
		data() {
			return {

			}
		},
		mounted: function() {
			var uid = localStorage.getItem('userid') ?  localStorage.getItem('userid') : 0;
			if(!uid){
			    this.$router.push({path:'/setting'});
			}
		},
		methods: {
			logout() {
				var that = this;
				var sessionIndex = localStorage.getItem('sessionIndex');
				httpUtils.getRequest('/common/checkSessionindex', {
					sessionIndex: sessionIndex
				}, function(data) {
					if(data && data.data.response == true) {
						that.initWebsocket();
					} else {
                        localStorage.removeItem('userid');
                        localStorage.removeItem('sessionIndex');
                        localStorage.removeItem('favoriteApps');
                        localStorage.removeItem('messagelist');
                        sessionStorage.removeItem('userinfocontent');
                        that.$router.push({path:'/setting'});
					}
				});
			},
			initWebsocket() {
			    var that = this;
				var websocket;
				var ThemeableBrowser;
				if(!window.WebSocket) {
                    $toast.show('This browser is not support websocket!');
					return false;
				}
				var wsurl = config.aas_websocket_host + "/?id=" + device.uuid;
                websocket = new WebSocket(wsurl);
				//监听消息
                websocket.onmessage = function(event) {
					var jsonData = JSON.parse(event.data);
					if(jsonData.logout && jsonData.relayState == device.uuid) {
						localStorage.removeItem('userid');
						localStorage.removeItem('sessionIndex');
                        localStorage.removeItem('favoriteApps');
                        localStorage.removeItem('messagelist');
                        sessionStorage.removeItem('userinfocontent');

						ThemeableBrowser.close();
                        $toast.show('登出成功 :)');
                        that.$router.push({path:'/setting'});
                        websocket.close();
					} else {
						ThemeableBrowser.close();
                        $toast.show('登出失败，请重试 :( logout: '+jsonData.logout+'	relayState: '+ jsonData.relayState+' device uuid: '+device.uuid);
					}
				};
				// 关闭WebSocket
                websocket.onclose = function(event) {
					//WebSocket Status:: Socket Closed
				};
				// 打开WebSocket
                websocket.onopen = function(event) {
					var logouturl = config.aas_backend_host + '/login/ssologout?sessionIndex=' + localStorage.getItem('sessionIndex') + '&username=' + localStorage.getItem('ssoId') + '&uuid=' + device.uuid;

					ThemeableBrowser = cordova.ThemeableBrowser.open(logouturl, config.browser_target, config.browser_options);
				};
                websocket.onerror = function() {
					$toast.show('websocket error!');
				};
			},
		}
	}
</script>
<style scoped>
	.mylist {
		margin-bottom: 0;
	}
	
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
		background: #25a5ff;
		font-size: 16px;
	}
	
	.point {
		color: #999;
		font-size: 12px;
		margin-left: 5px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	
	.item-note {
		line-height: 34px;
		margin-top: 5px;
	}
	
	.item-note-left {
		float: left;
		margin-left: 36px;
	}
	
	.item-note-down {
		float: right;
		color: #25a5ff;
		font-size: 14px;
		border: 1px solid #aaa;
		padding: 5px 13px;
		border-radius: 5px;
		margin-top: 5px;
	}
	
	.iphone-icon {
		font-size: 36px;
		left: 10px;
	}
	
	.mac-icon {
		font-size: 28px;
		left: 10px;
	}
	
	.a-color {
		color: #AAAAAA;
	}
	
	.of-color {
		color: #25a5ff;
	}
</style>