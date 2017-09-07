<template>
	<div class="w-body">
		<div class="w-content">
			<div class="mypanel" v-if="uId >0">
				<img class="bg" src="assets/images/login/mypanel_bg.png"/>
					<div class='user_img'>
						<img src="assets/images/avatar.png" />
					</div>
					<p class='username'>{{username}}</p>
			</div>
			<div class="mypanel" v-if="uId==0">
				<img class="bg" src="assets/images/login/mypanel_bg.png"/>
				<div @click="tologin">
					<div class='user_img'>
						<div>
							<img src="assets/images/avatar-ulogin.png" />
						</div>
					</div>
					<p class='username'>去登陆</p>
				</div>
			</div>
			<w-list class="mylist mt10">
				<a class='btmline' @click="toauth">
					<w-list-item class="item-icon-right">
						<img src="assets/images/i_s_authentication.png" class="uicon" /><span class="mes-title">实名认证</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</a>
                <a @click="commonlogin('/subscribe')" class='btmline'>
					<w-list-item class="item-icon-right">
						<img src="assets/images/i_s_subscribe.png" class="uicon" /><span class="mes-title">我的订阅</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</a>
				<a @click="commonlogin('/userconfig')" class='btmline'>
					<w-list-item class="item-icon-right">
						<img src="assets/images/i_s_config.png" class="uicon" /><span class="mes-title">账户安全</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</a>
				<router-link to="/about" class='btmline'>
					<w-list-item class="item-icon-right">
						<img src="assets/images/i_s_about.png" class="uicon" /><span class="mes-title">关于我们</span>
						<w-icon type="ios-arrow-right" color="clrc"></w-icon>
					</w-list-item>
				</router-link>
			</w-list>
		</div>
        <div class="popup-content">
            <w-popup v-model="popupVisible" position="right" class="mint-popup-2" :modal="false">
                <div class="popup-header">
                    <a class="button button-icon" @click="hidePopup"><w-icon type="ios-close-empty" color="light"></w-icon></a>
                </div>
                <iframe style="width: 100%;height: 100%;" :src="loginurl"></iframe>
            </w-popup>
        </div>
	</div>
</template>
<script>
    import config from '../../assets/js/config';
	import httpUtils from 'http-utils';
	import silenceRequest from '../../assets/js/utils/silence-request'
	import { getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../assets/js/utils/common-utils';
    var ws;
	export default {
		data: function() {
			return {
                popupVisible:false,
                loginurl:"",
			    uId: localStorage.getItem('userid') ?  localStorage.getItem('userid') : 0,
				username: localStorage.getItem('username') ?  localStorage.getItem('username') : "",
				authentication: 'assets/images/i_v_off.png',
				authenticationflage:'NO',
			}
		},
		mounted: function() {
		    var that = this;
            httpUtils.getRequest('/common/checkSessionindex', function(data) {
                if(data && data.data.result =='success') {
					if(!!getSessionStorage("authenticationflage"))
					{
						that.authenticationflage=getSessionStorage("authenticationflage");
					}else{
						that.getauthstate();
					}
                } else {
                  localStorage.removeItem('userid');
                  localStorage.removeItem('sessionIndex');
                  localStorage.removeItem('userame');
                  localStorage.removeItem('favoriteApps');
                  localStorage.removeItem('messagelist');
                  that.uId = 0;
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
                        console.log(data);
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
			getauthstate:function(){
				//获取用户实名认证状态
				var that=this;
				httpUtils.getRequest("/userinfo/ajaxgetpersontenantmark",function(data){
//					console.log(data);
					 if (data.status == 200) {
					 	var data = data.data;
					 	if(data.response == "Y")
					 	{
					 		/*已认证*/
					 		that.authenticationflage="YES";
					 		setSessionStorage("authenticationflage","YES");
					 	}else if(data.response == "N")
					 	{
					 		/*未认证*/
					 		that.authenticationflage="NO";
					 		setSessionStorage("authenticationflage","NO");
					 	}else{
                            setSessionStorage("authenticationflage","NO");
						}
					 }else{
                         setSessionStorage("authenticationflage","NO");
					 }
				})
			},
            tologin:function () {
			    var  uuid = device.uuid;
			    var that = this;
                var loginTB;
				if(!window.WebSocket){
                    $toast.show('This browser is not support websocket!');
				}
				var wsurl = config.aas_websocket_host + "/?id="+ uuid;

				ws=new WebSocket(wsurl);
				//监听消息
				ws.onmessage = function(event) {
                    var jsonData = JSON.parse(event.data);
                    console.log(jsonData)
                    if(jsonData.path =='login'){
                        if(jsonData.result && jsonData.relayState == uuid){
                            localStorage.setItem('sessionIndex', jsonData.sessionIndex);
                            localStorage.setItem('userid', parseInt(jsonData.userid));
                            localStorage.setItem('username', jsonData.username);
                            localStorage.setItem('phone', jsonData.userinfo.phone);
                            localStorage.setItem('email', jsonData.userinfo.email);
                            that.popupVisible = false;
                            that.username = jsonData.username;
                            that.uId = parseInt(jsonData.userid);
                            $toast.show('登录成功 :)',500);
                            that.getauthstate();
//                        silenceRequest.intervalAppStore();
                            ws.close();
						}else{
                            that.popupVisible = false;
                            that.loginurl = '';
                            ws.close();
                            $toast.show('登录失败，请重试 :(');
                        }
                    }else{
                        that.popupVisible = false;
                        that.loginurl = '';
                        ws.close();
					}
				};
				// 关闭WebSocket
				ws.onclose = function(event) {
					//WebSocket Status:: Socket Closed
				};
				// 打开WebSocket
				ws.onopen = function(event) {
                    that.popupVisible =true;
                    that.loginurl = config.is_sso_host + '/login/sso?uuid=' + uuid;
//					location.href = loginurl;
//                    loginTB = cordova.ThemeableBrowser.open(loginurl, config.browser_target, config.browser_options);
				};
				ws.onerror =function(){
                    $toast.show('websocket error!');
				};
			},
			hidePopup:function () {
				this.popupVisible = false;
				this.loginurl = '';
				ws.close();
            },
			toauth:function () {
			    if(this.uId){
                    if(this.authenticationflage == 'YES'){
                        this.$router.push({path:"/prove"});
                    }else{
                        this.$router.push({path:"/passageway"});
                    }
				}else{
			        this.tologin()
				}
            },
            commonlogin:function (path) {
                if(this.uId){
                    this.$router.push({path:path});
                }else{
                    this.tologin()
                }
            }
		}
	}
</script>
<style scoped>
	.header-left-icon{}
	.w-content{
		top:0;
	}
	.mypanel{
		width: 100%;
		height: 240px;
		position: relative;
		margin-bottom: 30px;
	}
	.mypanel .bg{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.user_img{
		width: 110px;
		height: 110px;
		border-radius: 50%;
		background-color: #8de4f4;
		position: absolute;
		top: 67px;
		left: 50%;
		margin-left: -55px;
		padding: 4px;
	}
	.user_img img{
		width: 100%;
		height: 100%;
	}
	.user_img div{
	    background-color: white;
	    border-radius: 50%;
	    width: 100%;
	    height: 100%;
	    box-sizing: border-box;
	}
	.username{
	    position: absolute;
	    bottom: 23px;
	    left: 50%;
	    width: 130px;
	    text-align: center;
	    font-size: 16px;
	    margin-left: -65px;
	    color: white;
        overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.mylist {
		margin-bottom: 0;
	}
	
	.item-icon-right {
		position: relative;
		margin: 0;
		border: 0;
		padding: 25px 15px 25px 90px;
	}
	.btmline{
		margin-top: 1px;
		display: block;
	}
	.baseinfo {
		margin-bottom: 0;
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
		padding: 5px 15px;
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
	.mint-popup-2 {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.popup-header{position: absolute;top:10px;left: 0px;text-align:center;width: 44px;height: 44px;}
	.popup-header .button{width:44px;font-size:16px;}
	.popup-content {height: 100%;width:100%;}
</style>