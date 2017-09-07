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
							<router-link :to="{path:'/messagelist',query:{fromApp: item.fromApp}}">
								<w-icon><img :src="item.appIcon" width="39" /></w-icon>
								<div class="mes-title">{{item.appName}}</div>
								<span class="mes-time">{{dateFormat(item.timeStamp)}}</span>
								<div class="mes-cont">{{item.content}}</div>
							</router-link>
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
	import leftDelete from '../../js/left-delete/left-delete' //左滑删除
	import http from "../../js/utils/http-utils"
	import { getLocalStorage, setLocalStorage } from '../../js/utils/common-utils'

	export default {
		data() {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				offset: 44,
				response: [],
				counterflg: '',
			}
		},
		beforeCreate() {
			//$loading.show('数据加载中');
		},
		mounted() {
			this.getallmessage();
			var that = this;
			this.counterflg = setInterval(function() {
				that.setmessageLocal();
			}, 240000);
		},
		methods: {
			onRefresh: function(fn) {
				//下拉
				var that = this;
				setTimeout(function() {
					that.getmessage("true");
					fn()
				}, 1000)
			},
			getallmessage: function() {
				if(getLocalStorage("messagelist") != null) {
					$loading.hide();
					var that = this;
					that.response = [];
					that.response = JSON.parse(getLocalStorage("messagelist"));
					that.$nextTick(function() {
						leftDelete.swipper();
					})
				} else {
					this.getmessage();
				}
			},
			deletitem: function(item, index) {
				var fromApp = item.fromApp;
				var that = this;
				$loading.show('删除中...');
				http.getRequest("/message/deleteappmessage?appid=" + fromApp + "&" + "userid=" + this.uId, function(data) {
					//console.log(data.data);
					$loading.hide();
					var callBackMessage = data.data;
					if(callBackMessage.statusCode == 200) {
						that.response.splice(index, 1);
						setLocalStorage("messagelist", JSON.stringify(that.response));
					}
				})
			},
			dateFormat: function(time) {
				var now = new Date(time);
				var year = now.getFullYear();
				var month = now.getMonth() + 1;
				var date = now.getDate();
				return year + "/" + month + "/" + date;
			},
			getmessage: function(flag) {
				var that = this;
				if(this.uId){
					if(flag != "true") {
						$loading.show('数据加载中');
					}
                    http.getRequest("/message/getallmessage?userid=" + this.uId, function(data) {
                        $loading.hide();
                        var body = data.data;
                        var response = body.response;
                        that.response = [];
                        for(var i = 0; i < response.length; i++) {
                            that.response.push(response[i].arry[0]);
                        }
                        setLocalStorage("messagelist", JSON.stringify(that.response));
//					console.log(that.response);
                        that.$nextTick(function() {
                            leftDelete.swipper();
                        })
                    });
				}
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
					setLocalStorage("messagelist", JSON.stringify(responseArr));
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
		}
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