<template>
	<transition name="slide">
		<div>
			<w-header color="blue-bg" class='news-search'>
				<router-link to="/home" class="button button-icon icon ion-ios-arrow-left header-left-icon" slot="left"></router-link>
				<div slot="title">
					<w-search class='newssearch' v-model="keywords" :on-search="search" placeholder="搜索关键字"></w-search>
				</div>
			</w-header>
			<div class="w-content">
				<!--历史记录-->
				<div class='history' v-show='issearchflag'>
					<p class='history_title'>搜索历史</p>
					<ul class='history_list'>
						<li v-for="item in historynews" @click="history(item)">{{item}}</li>
					</ul>
					<p class='clear_history' @click='clearhistory'>清空搜索历史</p>
				</div>
				<!--新闻列表-->
				<w-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" class='scrollcontent'>
					<div class="news"></a>
						<w-list-item class="new-item" v-for="(item, index) in news">
							<a :name="item.id"></a>
							<router-link :to="'/news?newsId=' + item.id +'&callbackurl=/newssearch'" >
								<div class="new-info" :style="{paddingRight: item.image==''?'0px':'140px'}">
									<p class="new-mes">{{item.title}}</p>
									<p class="new-time">{{item.createdTimestamp.split(" ")[0]}}</p>
									<img v-if="item.image!=''" class="new-pic" :src="item.image" />
								</div>
							</router-link>
						</w-list-item>
					</div>
					<div v-if="allLoaded" class="nothing">
						<p>暂无更多内容</p>
					</div>
				</w-loadmore>
				<!--搜索没咨询-->
				<div v-if="nonthingresult" class="nothing nonthing_result">
					<p>
						<w-icon type="ios-information-outline" class='nonthing_result_icon'></w-icon><span>未找到相关资讯</span></p>
					<div></div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
    import $ from '../../lib/jquery'
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../assets/js/utils/common-utils';

	export default {
		data() {
			return {
				issearchflag: false, //搜索以后隐藏历史记录
				historynews: [],
				news: [],
				keywords: "",
				bottomStatus: '',
				page: 1,
				pageSize: 10,
				recordsTotal: 0,
				allLoaded: false,
				nonthingresult: false,
			}
		},
		mounted: function() {
		    $('input[type="search"]').focus(); //搜索框获得焦点
			this.gethistory();
		},
		methods: {
			loadBottom: function() {
				var that = this;
				if(that.recordsTotal / that.pageSize > that.page) {
					that.page++;

				} else {
					that.allLoaded = true;
					that.$refs.loadmore.onBottomLoaded();
					return false;
				}
				httpUtils.getRequest('/news/newslist', {
					page: that.page,
					pageSize: that.pageSize,
					title: that.keywords
				}, function(data) {
					console.log(data.data);
					var data = data.data;
					if(data.statusCode == 200) {
						var news = data.data;
						if(news.length == 0) {
							console.log("没有新闻");
						} else {
							for(var i in news) {
								that.news.push(news[i]);
							}
						}
						that.$refs.loadmore.onBottomLoaded();
					}
				})
			},
			search: function() {
				var that = this;
				if(that.keywords == '') {
					return false;
				}
				that.issearchflag = false;
				that.sethistory();
				$loading.show('数据加载中');
				httpUtils.getRequest('/news/newslist', {
					page: 1,
					pageSize: that.pageSize,
					title: that.keywords
				}, function(data) {
					$loading.hide();
					console.log(data.data);
					var data = data.data;
					if(data.statusCode == 200) {
						var news = data.data;
						that.allLoaded = false;
						that.recordsTotal = data.recordsTotal;
						if(news.length == 0) {
							that.nonthingresult = true;
							that.news = [];
						} else {
							that.nonthingresult = false;
							that.news = news;
							that.$nextTick(function() {
								if(that.recordsTotal < that.pageSize) {
									that.allLoaded = true;
								}
							})
						}
					}
				})
			},
			history: function(keywords) {
				this.keywords = keywords;
				this.search();
			},
			sethistory: function() {
				var that = this;
				if(!!getLocalStorage("newssearchhistory")) {
					var newshistory = JSON.parse(getLocalStorage("newssearchhistory"));
					for(var i in newshistory) {
						if(newshistory[i] == that.keywords) {
							return false;
						}
					}
					if(newshistory.length > 5) {
						newshistory.pop();
					}
					newshistory.unshift(that.keywords);
					setLocalStorage("newssearchhistory", JSON.stringify(newshistory));
				} else {
					var arr = [];
					arr.push(that.keywords);
					setLocalStorage("newssearchhistory", JSON.stringify(arr))
				}

			},
			gethistory: function() {
				var that = this;
				if(!!getLocalStorage("newssearchhistory")) {
					that.issearchflag = true;
					that.historynews = JSON.parse(getLocalStorage("newssearchhistory"));
					console.log(that.historynews);
				} else {
					that.issearchflag = false;
				}
			},
			clearhistory: function() {
				localStorage.clear("newssearchhistory");
				this.issearchflag = false;
			}
		},
		updated() {
			//设置滚动位置
			var path = location.hash.replace('#', '');
			document.body.scrollTop = sessionStorage.getItem(path) != undefined ? sessionStorage.getItem(path) : 0;
		},
		beforeRouteLeave(to, from, next) {
			//存储滚动位置
			sessionStorage.setItem(from.path, document.body.scrollTop)
			next()
		}
	}
</script>

<style scoped>
	.w-content {
		position: absolute;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0px;
		overflow: initial;
	}
	.header{
		position: fixed;
	}
	.newssearch {
		margin-left: 30px;
		box-shadow: 0 0 0px rgba(0, 0, 0, 0.15);
		
	}
	.bar-light .button:hover {
		color: #1895ff;
	}
	
	.history {
		width: 100%;
		padding: 0px 5px;
		background-color: #FFFFFF;
		padding-top: 10px;
	}
	
	.history_title {
		line-height: 35px;
		position: relative;
		color: #1895ff;
		padding-left: 15px;
		margin-bottom: 0px;
	}
	
	.history_title:after {
		content: "";
		position: absolute;
		background-color: #ddd;
		display: block;
		left: 0;
		bottom: -1px;
		left: 50%;
		height: 1px;
		width: 100%;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleY(0.5) translateX(-50%);
		-webkit-transform: scaleY(0.5) translateX(-50%);
		z-index: 0;
	}
	
	.history_title:before {
		content: "";
		position: absolute;
		background-color: #1895ff;
		display: block;
		left: 6px;
		top: 10px;
		height: 14px;
		width: 3px;
	}
	
	.history_list {}
	
	.history_list li {
		line-height: 35px;
		padding-left: 10px;
		height: 35px;
		overflow: hidden;
		position: relative;
	}
	
	.history_list li:after {
		content: "";
		position: absolute;
		background-color: #ddd;
		display: block;
		left: 0;
		bottom: 0px;
		left: 50%;
		height: 1px;
		width: 100%;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleY(0.5) translateX(-50%);
		-webkit-transform: scaleY(0.5) translateX(-50%);
		z-index: 0;
	}
	
	.clear_history {
		width: 150px;
		text-align: center;
		margin: auto;
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 13px;
		color: #B2B2B2;
	}
	
	.new-item {
		border: none;
		padding: 0px;
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 15px;
		padding-right: 10px;
		box-sizing: border-box;
		margin: 0px;
	}
	
	.new-info {
		padding-right: 140px;
		height: 68px;
		float: left;
		position: relative;
		width: 100%;
	}
	
	.new-info:after {
		content: "";
		position: absolute;
		background-color: #ddd;
		display: block;
		left: 0;
		bottom: -15px;
		right: auto;
		height: 1px;
		width: 100%;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleY(0.5);
		-webkit-transform: scaleY(0.5);
	}
	
	.new-info .new-mes {
		white-space: normal;
		height: 40px;
		overflow: hidden;
	}
	
	.new-info .new-time {
		float: left;
		margin-top: 10px;
	}
	
	.new-info .new-more {
		float: right;
		margin-top: 18px;
		width: 20px;
		margin-right: 9px;
	}
	
	.new-pic {
		position: absolute;
		top: 0px;
		right: 5px;
		width: 125px;
		height: 68px;
	}
</style>