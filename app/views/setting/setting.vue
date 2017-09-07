<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<div slot="title">我的</div>
		</w-header>
		<div class="w-content">
			<w-list class="baseinfo mt10" v-if="uId >0">
				<router-link :to="{ path: '/userinfo',query: {loadinfo: 'true' } }">
					<w-list-item class="item-icon-right btmline">
						<div class="avatar"><img src="assets/images/avatar.png" width="62" /></div>
						<i class="user_v">
							<img :src="authentication" width="18" />
						</i>
						<div class="mes-title" style="height: 26px;">{{username}}</div>
						<div class="mes-cont">上次登录时间：{{logdate}}</div>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
			</w-list>
			<w-list class="baseinfo mt10" v-if="uId==0">
					<w-list-item class="item-icon-right btmline">
						<div class="avatar"><img src="assets/images/avatar-ulogin.png" width="62" /></div>
						<div class="mes-title ulogin" @click="tologin">去登录</div>
					</w-list-item>
			</w-list>
			<w-list class="mylist mt10">
				<!--<w-list-item class="item-icon-right">
          <img src="assets/images/i_s_ask.png" class="uicon"/><span class="mes-title">我的咨询</span>
          <w-icon type="ios-arrow-right" color="clrc"></w-icon>
        </w-list-item>-->
				<!--<w-list-item class="item-icon-right btmline15">
					<img src="assets/images/i_s_star.png" class="uicon" /><span class="mes-title">我的收藏</span>
					<w-icon type="ios-arrow-right" color="clrc"></w-icon>
				</w-list-item>-->
				<router-link :to="uId > 0 ? '/subscribe':''">
					<w-list-item class="item-icon-right btmline">
						<img src="assets/images/i_s_subscribe.png" class="uicon" /><span class="mes-title">我的订阅</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
			</w-list>

<!--			<w-list class="mylist mt10">
				<w-list-item class="item-icon-right btmline15">
					<img src="assets/images/i_s_pay.png" class="uicon" /><span class="mes-title">我的支付</span>
					<w-icon type="ios-arrow-right" color="clrc"></w-icon>
				</w-list-item>
				<w-list-item class="item-icon-right btmline15">
					<img src="assets/images/i_s_mess.png" class="uicon" /><span class="mes-title">我的投诉</span>
					<w-icon type="ios-arrow-right" color="clrc"></w-icon>
				</w-list-item>
				<w-list-item class="item-icon-right btmline">
					<img src="assets/images/i_s_post.png" class="uicon" /><span class="mes-title">我的办件</span>
					<w-icon type="ios-arrow-right" color="clrc"></w-icon>
				</w-list-item>
			</w-list>-->

			<w-list class="mylist mt10">
				<router-link :to=" uId >0 ? '/userconfig':''">
					<w-list-item class="item-icon-right btmline15">
						<img src="assets/images/i_s_config.png" class="uicon" /><span class="mes-title">账户设置</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
				<router-link to="/about">
					<w-list-item class="item-icon-right btmline">
						<img src="assets/images/i_s_about.png" class="uicon" /><span class="mes-title">关于我们</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
			</w-list>
		</div>
	</div>
</template>
<script>
    import config from '../../js/config';
	import httpUtils from 'http-utils';
	import silenceRequest from '../../js/utils/silence-request'
	import { getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../js/utils/common-utils';

	export default {
		data: function() {
			return {
			    uId: localStorage.getItem('userid') ?  localStorage.getItem('userid') : 0,
				username: '',
                logdate: localStorage.getItem('logdate') ?  localStorage.getItem('logdate'): "暂无",
				authentication: 'assets/images/i_v_off.png',
			}
		},
		mounted: function() {
		    var that = this;
            var sessionIndex = localStorage.getItem('sessionIndex');
            httpUtils.getRequest('/common/checkSessionindex', {
                sessionIndex: sessionIndex
            }, function(data) {
                if(data && data.data.response == true) {
                    that.userinfo();
                } else {
                    localStorage.removeItem('userid');
                    localStorage.removeItem('sessionIndex');
                    localStorage.removeItem('favoriteApps');
                    localStorage.removeItem('messagelist');
                    sessionStorage.removeItem('userinfocontent');
                    that.uid = 0;
                }
            });
		},
		methods: {
			userinfo: function() {
                var that = this;
				if (getSessionStorage("userinfocontent") != null) {
					var obj = JSON.parse(getSessionStorage("userinfocontent"));
					if (!!obj.full_name) {
						that.username = obj.full_name;
					} else if (!!obj.mobile_no) {
						that.username = obj.mobile_no.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2');
					} else {
						that.username = obj.email_id.replace(/^(\w{2})\w{3}(.*)$/, '$1***$2');
					}
					var auth_status = obj.auth_status;
					if (auth_status == '2') {
						that.authentication = "assets/images/i_v.png";
					} else {
						that.authentication = "assets/images/i_v_off.png";
					}
					return false;
				} else {
                    $loading.show('数据加载中');
                    httpUtils.getRequest("/userinfo/ajaxgetuserinfo", {userid: this.uId}, function (data) {
                        $loading.hide();
                        var data = data.data;
                        if (data.statusCode == 200) {
                            var response = data.data;
                            if (!!response.full_name) {
                                that.username = response.full_name;
                            } else if (!!response.mobile_no) {
                                that.username = response.mobile_no.replace(/^(\w{3})\w{4}(.*)$/, '$1****$2');
                            } else {
                                that.username = response.email_id.replace(/^(\w{2})\w{3}(.*)$/, '$1***$2');
                            }
                            if (response.auth_status == '2') {
                                that.authentication = "assets/images/i_v.png";
                            } else {
                                that.authentication = "assets/images/i_v_off.png";
                            }
                            var obj = response;
                            obj = JSON.stringify(obj);
                            setSessionStorage("userinfocontent", obj);
                        }
                    })
                }
			},
            tologin:function () {
			    var that = this;
                var ws;
                var loginTB;
				if(!window.WebSocket){
                    $toast.show('This browser is not support websocket!');
				}
				var wsurl = config.aas_websocket_host + "/?id="+ device.uuid;

				ws=new WebSocket(wsurl);
				//监听消息
				ws.onmessage = function(event) {
                    var jsonData = JSON.parse(event.data);
                    if(jsonData.path =='login' && jsonData.relayState == device.uuid){
                        localStorage.setItem('sessionIndex', jsonData.sessionIndex);
                        localStorage.setItem('userid', parseInt(jsonData.userid));
                        localStorage.setItem('ssoId', jsonData.ssoId);
                        localStorage.setItem('mobile', jsonData.mobile);
                        localStorage.setItem('logdate', jsonData.logdate);
                        loginTB.close();
						that.uId = parseInt(jsonData.userid);
						that.logdate = jsonData.logdate;
                        $toast.show('登录成功 :)',500);
						that.userinfo();
                        silenceRequest.intervalAppStore();
                        ws.close();
                    }else{
                        loginTB.close();
                        $toast.show('登录失败，请重试 :(');
                    }
				};
				// 关闭WebSocket
				ws.onclose = function(event) {
					//WebSocket Status:: Socket Closed
				};
				// 打开WebSocket
				ws.onopen = function(event) {
					var loginurl = config.aas_backend_host + '/login/sso?uuid=' + device.uuid;
                    loginTB = cordova.ThemeableBrowser.open(loginurl, config.browser_target, config.browser_options);
				};
				ws.onerror =function(){
                    $toast.show('websocket error!');
				};
			}
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
	}

	.btmline:after {
		content: "";
		position: absolute;
		background-color: #CFCFCF;
		display: block;
		left: 0px;
		bottom: 0px;
		right: auto;
		height: 1px;
		width: 100%;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	
	.btmline15:after {
		content: "";
		position: absolute;
		background-color: #CFCFCF;
		display: block;
		left: 15px;
		bottom: 0px;
		right: auto;
		height: 1px;
		width: 100%;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	
	.baseinfo {
		margin-bottom: 0px;
		background: #ffffff;
		padding: 0;
	}
	
	.baseinfo .avatar {
		position: absolute;
		left: 15px;
		top: 16px;
		width: 80px;
	}
	
	.baseinfo .user_v {
		position: absolute;
		left: 59px;
		bottom: 18px;
		height: 18px;
		width: 18px;
	}
	
	.baseinfo .item-icon-right {
		padding: 25px 15px 25px 90px;
	}
	
	.baseinfo .mes-cont {
		color: #707070;
		font-size: 12px;
		text-overflow: ellipsis;
		overflow: hidden;
		font-family: "黑体";
		position: relative;
		top: 7px;
	}
	.baseinfo .ulogin {
		color: #7a7a7a;
		height: 44px;
		line-height: 44px;
	}
	.mylist .item-icon-right {
		padding: 4px 15px;
	}
	
	.mylist .item-icon-right .uicon {
		width: 36px;
		padding-right: 15px;
		vertical-align: middle
	}
	
	.mylist .item-icon-right .mes-title {
		font-size: 15px;
		line-height: 37px;
		vertical-align: middle;
		font-family: "黑体";
		color: #1b1b1b;
	}
</style>