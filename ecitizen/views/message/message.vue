<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<div slot="title">消息</div>
		</w-header>
		<div class="w-content">
			<div class="mes-panel">
				<w-scroll :on-refresh="onRefresh" :offset="offset" style='top:-80px'>
					<w-list class="mes-list mt10">
						<w-list-item class="item-icon-left" v-for="(item,index) in response">
								<a @click="toMessageList(item.appId,item.appName,item.unreadCount)">
								<w-icon><img :src="item.appIcon" width="39" /></w-icon>
								<div class="mes-title">{{item.appName}}</div>
								<span class="mes-time" v-for="(notice,index) in item.news" v-if="index == 0">{{dateFormat(notice.createTime)}}</span>
								<div class="mes-cont" v-for="(notice,index) in item.news" v-if="index == 0">{{notice.content}}</div>
								<div class="mes-count" v-if="item.unreadCount != 0"><span>{{item.unreadCount}}</span></div>
								</a>
							<div class="delete" @click='deletitem(item,index)'>删除</div>
						</w-list-item>
					</w-list>
				</w-scroll>
				<!--没有消息-->
				<div class='nomessage' v-show='response.length==0'>
					<img src="assets/images/nomessage.png" />
					<p>暂时没有收到消息!</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import leftDelete from '../../assets/js/left-delete/left-delete' //左滑删除
	import http from "../../assets/js/utils/http-utils"
	import { getLocalStorage, setLocalStorage, setTabbarMessageUnreadCount, updateTabbarMessageUnreadCount } from '../../assets/js/utils/common-utils'

	export default {
		data() {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				offset: 44,
				response: [],
				counterflg: '',
                responseData: {},
			}
		},
		beforeCreate() {
			//$loading.show('数据加载中');
		},
		mounted() {
			this.getallmessage();
			var that = this;
			this.counterflg = setInterval(function() {
				that.getallmessage();
			}, 120000);
		},
		methods: {
            toMessageList: function (appId,appName,unreadCount) {
                var  that = this;
                if(unreadCount > 0) {
                    http.getRequest("/message/markappmessagehaveread?appId=" + appId + "&userId=" + localStorage.getItem('userid') + "&sessionIndex=" + localStorage.getItem('sessionIndex'), function (data) {
                        console.log("markappmessagehaveread ==="+ data);
                        if(data.data.result == true && data.data.code == 200){
							//                 更新tabbar消息未读数
                            updateTabbarMessageUnreadCount(unreadCount);
						}
                        that.$router.push({path: "messageList", query: {fromApp: appId, appName: appName}});
                    });
                }else {
                    that.$router.push({path: "messageList", query: {fromApp: appId, appName: appName}});
				}
            },
			onRefresh: function(fn) {
				//下拉
				var that = this;
				setTimeout(function() {
					that.getmessage("true");
					fn()
				}, 1000)
			},
			getallmessage: function() {
			    var that = this;
                http.getRequest('/common/checkSessionindex', function(data) {
                    if(data && data.data.result =='success') {
                        that.getmessage();
                        }
                });
			},
			deletitem: function(item, index) {
				var fromApp = item.appId;
				var that = this;
				$loading.show('删除中...');
				http.getRequest("/message/deleteappmessage?appid=" + fromApp + "&" + "userid=" + this.uId, function(data) {
					$loading.hide();
					var callBackMessage = data.data;
					if(callBackMessage.result && callBackMessage.statusCode == 200) {
                        updateTabbarMessageUnreadCount(item.unreadCount)
						that.response.splice(index, 1);
					}
				})
			},
			dateFormat: function(time) {
				var now = new Date(time/1); // 字符串转整型？
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				return year + "/" + month + "/" + date;
			},
            getAPPiconAndAppName2:function (appId) {
                var categoryApps = JSON.parse(getLocalStorage("categoryApps"));
                for(var category in  categoryApps){
                    var catagroyApp = categoryApps[category];
                    if(catagroyApp.length > 0){
                        for(var  index = 0; index < catagroyApp.length; index ++){
                            if(appId == catagroyApp[index].appId){
                                return {"appName":catagroyApp[index].appName_cn,"appIcon":catagroyApp[index].appIcon};
                            }
                        }
					}
                }
			},
			getmessage: function(flag) {
				var that = this;
					if(flag != "true") {
						$loading.show('数据加载中');
					}
                    http.getRequest("/message/getallmessage?userid=" + this.uId, function(data) {
                        $loading.hide();
                        var body = data.data;
                        if(body.code == 200 && body.result) {
                            for(var index = 0; index < body.response.length; index++){
                                var item = body.response[index];
                               var  result = that.getAPPiconAndAppName2(item.appId);
                               item.appName = result.appName;
                               item.appIcon = result.appIcon;
                            }
                            that.response = body.response;
//							console.log("body.unreadCount ====="+body.unReadCount);
							setTabbarMessageUnreadCount(body.unReadCount);
                            that.$nextTick(function () {
                                leftDelete.swipper();
                            });

                        }
                    });

			},
			setmessageLocal: function() {
				//console.log("设置LocalStorage");
				var that = this;
				http.getRequest("/message/getallmessage?userid=" + this.uId, function(data) {
					var body = data.data;
					var response = body.response;
					var responseArr = [];
					for(var i = 0; i < response.length; i++) {
						responseArr.push(response[i].arry[0]);
					}
					that.$nextTick(function() {
						leftDelete.swipper();
					})
				})
			}
		},

		updated() {
			//设置滚动位置
			var path = location.hash.replace('#', '');
			document.querySelector('.w-scroll').scrollTop = sessionStorage.getItem(path) != undefined ? sessionStorage.getItem(path) : 0;
		},
		beforeRouteLeave(to, from, next) {
			//存储滚动位置
			sessionStorage.setItem(from.path, document.querySelector('.w-scroll').scrollTop);
			clearInterval(this.counterflg);
			next()
		},
	}
</script>
<style scoped>
	.mes-panel .mes-list {
		margin-bottom: 0px;
		background: #ffffff;
		padding: 0;
	}
	/*.mes-panel a{
  	display: block;
  }*/
	
	.mes-panel .item-icon-left {
		margin: 0;
		border: 0;
		padding: 5px 5px 5px 60px;
		position: relative;
		transition: transform 0.4s;
		display: block;
	}
	
	.mes-panel .item-icon-left:after {
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
	
	.swipeleft {
		transform: translateX(-106px);
		-webkit-transform: translateX(-106px);
	}

	.mes-panel .item {
		overflow: inherit;
	}

	.mes-panel .mes-cont {
		color: #afafaf;
		font-size: 12px;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 90%;
	}
	.mes-count{
		display: inline-block;
		position: absolute;
		right: 20px;
		bottom: 8px;
		background-color: #ff6b55;
		color: white;
		height: 14px;
		width: 14px;
		-webkit-border-radius: 7px;
		border-radius: 7px;
		font-size: 12px;
		text-align: center;
		line-height: 14px;

	}
	
	.mes-panel .mes-title {
		font-size: 16px;
		color: #424242;
		line-height: 26px;
		position: relative;
	}
	
	.mes-panel .mes-time {
		color: #afafaf;
		font-size: 12px;
		position: absolute;
		top: 10px;
		right: 15px;
	}
	
	.mes-panel .w-scroll .scroll-inner {
		top: -40px;
	}
	
	.mes-panel .delete {
		position: absolute;
		top: 0;
		right: -106px;
		text-align: center;
		background: #ff2929;
		color: #fff;
		width: 106px;
		height: 57px;
		line-height: 57px;
		border-bottom: 1px solid #dddddd;
	}
</style>