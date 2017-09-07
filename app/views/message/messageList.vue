<template>
	<div class="w-body">
		<w-header color="blue-bg">
			<router-link to="/message" class="button button-icon icon ion-ios-arrow-back" slot="left"></router-link>
			<div slot="title">{{appName}}</div>
		</w-header>
		<div class="w-content message-list">
			<w-scroll :on-refresh="onRefresh" :offset="offset" style='top:-80px'>
				<p align="center" class="mes-time endinfo" style="display: none;margin:0px;margin-top: 25px;"><span>没有更多内容了</span></p>
				<w-list class="mes-detail">
					<div class="item-container" v-for="(item,index) in itemlist">
						<p align="center" class="mes-time"><span>{{dateFormat(item.timeStamp)}}</span></p>
						<w-list-item class="item-icon-left">
							<w-icon><img :src="item.appIcon" width="39" /></w-icon>
							<div class="mes-title">{{item.appName}}</div>
							<div class="mes-cont">{{item.content}}</div>
							<div class="tipGroup" @click="deleteitem(item,index)">
								<div class="tip">
									<span class="bot"></span> 删除
								</div>
							</div>
						</w-list-item>
					</div>
				</w-list>
			</w-scroll>
			<!--没有消息-->
			<div class='nomessage' v-show='itemlist.length==0'>
				<img src="assets/images/nomessage.png" />
				<p>暂时没有收到消息!</p>
			</div>
		</div>
	</div>
</template>
<script>
	import $ from '../../lib/jquery'
	import http from "../../js/utils/http-utils"
	import { getLocalStorage, setLocalStorage } from '../../js/utils/common-utils'
	export default {
		data() {
			return {
                uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
				infiniteCount: 0,
				allCount: 3,
				offset: 44,
				top: 1,
				bottom: 20,
				itemlist: [],
				appid: '',
				currentPage: 1,
				appName: '',
			}
		},
		beforeCreate() {
			$loading.show('数据加载中');
		},
		mounted() {
			this.appid = this.$route.query.fromApp;
			this.getappmessage();
		},
		methods: {
			onRefresh: function(fn) {
				//下拉
				this.currentPage++;
				$(".tipGroup").fadeOut();
				var that = this;
				setTimeout(function() {
					that.getappmessage();
					fn()
				}, 700)
			},
			getappmessage: function() {
				var that = this;
				http.getRequest("/message/getappmessage?appid=" + that.appid + "&currentPage=" + that.currentPage + "&userid=" + this.uId, function(data) {
					$loading.hide();
					var data = data.data;
					if(data.result == true) {
						var response = data.response;
						if(response.length == 0) {
							$(".endinfo").show();
							return false;
						} else {
							$(".endinfo").hide();
							that.appName = response[0].appName;
							for(var i = 0; i < response.length; i++) {
								that.itemlist.unshift(response[i]);
								that.appName = response[i].appName;
							}
							var timeout;
							that.$nextTick(function() {
								$('.item-icon-left').unbind();
								$(".item-icon-left").on("touchstart", function() {
									var then = this;
									timeout = setTimeout(function() {
										$(".tipGroup").fadeOut();
										$(then).children(".tipGroup").fadeIn();
									}, 700);
								})
								$(".item-icon-left").on("touchend", function() {
									clearTimeout(timeout);
								})
								$(".message-list").on("click", function() {
									$(".tipGroup").fadeOut();
								})
							})
						}
					} else {
						console.log(data.message);
					}
				});
			},
			deleteitem: function(item, index) {
				var _id = item._id;
				var that = this;
				$loading.show('删除中...').then(function() {
					http.getRequest("/message/deleteonemessage?_id=" + _id, function(data) {
						if(data.data.result == true) {
							for(var i = 0; i < that.itemlist.length; i++) {
								if(that.itemlist[i]._id == _id) {
									that.itemlist.splice(i, 1);
									$loading.hide();

								}
							}
						}
					})
				});
			},
			dateFormat: function(time) {
				var timestamp = Math.floor(time / 1000);
				var newDate = new Date();
				newDate.setTime(timestamp * 1000);
				return newDate.toLocaleString();
			}
		},
		watch: {
			itemlist: function() {
				var that = this;
				if(this.itemlist.length == 0) {
					var messagelist = JSON.parse(getLocalStorage("messagelist"));
					for(var i = 0; i < messagelist.length; i++) {
						if(that.appid == messagelist[i].fromApp) {
							
							messagelist.splice(i, 1);
							
							setLocalStorage("messagelist", JSON.stringify(messagelist));
						}
					}
				}
			}
		},
		updated() {
			//设置滚动位置
			var path = location.hash.replace('#', '');
			document.querySelector('.w-scroll').scrollTop = sessionStorage.getItem(path) != undefined ? sessionStorage.getItem(path) : 0;
		},
		beforeRouteLeave(to, from, next) {
			//存储滚动位置
			sessionStorage.setItem(from.path, document.querySelector('.w-scroll').scrollTop)
			next()
		}
	}
</script>
<style scoped>
	.message-list {
		margin: 15px 20px;
		bottom: 8px;
		margin-bottom: 0px;
	}
	
	.message-list .item-icon-left {
		margin: 0;
		border: 0;
		padding: 7px 10px 7px 60px;
		border: 1px solid #c7c7c7;
		border-radius: 5px;
		position: relative;
	}
	
	.message-list .mes-cont {
		color: #afafaf;
		font-size: 12px;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.message-list .mes-title {
		font-size: 16px;
		line-height: 26px;
		color: #424242;
		position: relative;
	}
	
	.message-list .mes-time {
		margin: 20px 0;
	}
	
	.message-list .mes-time span {
		text-align: center;
		color: #ffffff;
		font-size: 14px;
		padding: 7px;
		background: #d5d5d5;
		margin: 0;
		border-radius: 7px;
	}
	
	.message-list .w-scroll .scroll-inner {
		top: -57px;
	}
	
	.item-container .item {
		overflow: inherit;
		white-space: normal;
	}
	
	.tipGroup {
		position: absolute;
		top: -5px;
		right: 10px;
		display: none;
	}
	
	.message-list .tip {
		width: 68px;
		position: relative;
		background-color: #000;
		color: white;
		border-radius: 10px;
		line-height: 34px;
		text-align: center;
		font-size: 14px;
	}
	
	.message-list .tip span {
		width: 0;
		height: 0;
		font-size: 0;
		overflow: hidden;
		position: absolute;
		color: white;
	}
	
	.message-list .tip .bot {
		border-width: 9px;
		border-style: solid dashed dashed;
		border-color: #000 transparent transparent;
		left: 20px;
		bottom: -17px;
	}
	
	.nomessage {
		width: 139px;
		height: 93px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -70px;
		margin-top: -47px;
	}
	
	.nomessage img {
		width: 100%;
		height: 100%;
	}
	
	.nomessage p {
		text-align: center;
		font-size: 12px;
		color: #ccc;
		margin-left: 23px;
	}
</style>