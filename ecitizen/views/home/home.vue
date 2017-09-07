<template>
	<div id="home">
		<w-header color="blue-bg" class='header'>
			<div class="header-search-nav" slot="title" @click="searchClick">
				<w-search class='home-search' v-model="keywords"  placeholder="输入需要查找的关键词语"></w-search>
			</div>
			<img class="saoyisao" src="assets/images/home/saoyisao.png" slot="right" alt="" @click="scan" />
		</w-header>
		<div class="w-content">
			<div class="swiper-container"  v-if="ads.length>0">
				<w-swiper ref="swiper" width="100%" height="160" pagerColor="#ffffff" pagerBgColor="#a2abc9">
					<w-swiper-item v-for="(item, index) in ads">
						<router-link :to="'/news?newsId=' + item.id+'&callbackurl=/home'"><img style="width: 100%; height: 100%;" :src="item.image" /></router-link>
					</w-swiper-item>
				</w-swiper>
			</div>
			<div class="w-cells" v-if="myApps">
				<div class="row" v-if="index % 4 == 0 && index < 7" v-for="(item, index) in myApps">
					<div class="col" v-for="n in 4">
						<router-link v-if="myApps[index] && index < 7" :to="'/appdetail?appId=' + myApps[index].appId + '&beforeRoute=/home'">
							<div class="cell-item">
								<img class="cell-item-img loadappimg" :src="myApps[index].appIcon"/>
								<div class="cell-item-text">{{myApps[index ++ ].appName_cn}}</div>
							</div>
						</router-link>
						<div v-else>
							<router-link v-if="(myApps.length + 1) % 4 == n % 4 || index == 7" to="/appstore">
								<div class="cell-item">
									<img class="cell-item-img" src="assets/images/home/main.png" />
									<div class="cell-item-text">更多应用</div>
								</div>
							</router-link>
						</div>
					</div>
				</div>
				<div class="row" v-if="myApps.length == 4">
					<div class="col">
						<router-link to="/appstore">
							<div class="cell-item">
								<img class="cell-item-img" src="assets/images/home/main.png" />
								<div class="cell-item-text">更多应用</div>
							</div>
						</router-link>
					</div>
					<div class="col" v-for="n in 3">
					</div>
				</div>
			</div>
			<w-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" class='scrollcontent'>
				<div class="news">
					<w-list-item class="new-item" v-for="(item, index) in news">
						<router-link :to="'/news?newsId=' + item.id +'&callbackurl=/home'">
							<div class="new-info" :style="{paddingRight: item.image==''?'0px':'140px'}">
								<p class="new-mes">{{item.title}}</p>
								<p class="new-time">{{item.createdTimestamp.split(" ")[0]}}</p>
								<img v-if="item.image!=''" class="new-pic" :src="item.image" />
							</div>
						</router-link>
					</w-list-item>
				</div>
				<div v-if="news.length > 0 && page>=recordsTotal/pageSize" class="nothing">
					<p>已经到底啦</p>
					<div></div>
				</div>
			</w-loadmore>
		</div>
		<!--w-content-->
	</div>
</template>
<script>
    import config from '../../assets/js/config';
	import httpUtils from 'http-utils';
	import { openApp, getLocalStorage, setLocalStorage, setSessionStorage, getSessionStorage } from '../../assets/js/utils/common-utils';
	var methods = {
		loadTop:function () {
			/*下拉加载*/
            var that = this;
            that.allLoaded = false;
            that.page = 1;
            httpUtils.getRequest('/news/newslist', {
                page: 1,
                pageSize: that.pageSize
            }, function(data) {
                var data = data.data;
                if(data && data.success) {
                    that.recordsTotal = data.recordsTotal;
                    if(that.recordsTotal/that.pageSize < 1){
                        that.allLoaded = true;
					}
                    that.news = [];
                    var news = data.data || [];
                    if(news.length > 0) {
                        that.firstLoaded = false;
                        for (var i in news) {
                            delete news[i].content;
                            that.news.push(news[i]);
                        }
                    }else{
                        that.firstLoaded = true;
					}
                    setSessionStorage("newlist", JSON.stringify(that.news));
                    setSessionStorage("homerepage", that.page);
                    setSessionStorage("homerecordsTotal", that.recordsTotal);
                }
                if(that.$refs.loadmore != undefined){
                    that.$refs.loadmore.onTopLoaded();
                }
            });
        },
		loadBottom: function() {
			/*上拉加载*/
			var that = this;
			if(that.recordsTotal / that.pageSize > that.page) {
				that.page++;
				setSessionStorage("homerepage", that.page);
			} else {
				that.allLoaded = true;
				setTimeout(function() {
					that.$refs.loadmore.onBottomLoaded();
				}, 1000)
				return false;
			}
			httpUtils.getRequest('/news/newslist', {
				page: that.page,
				pageSize: that.pageSize
			}, function(data) {
				var data = data.data;
//				console.log(data);
				if(data && data.success) {
                    if(that.recordsTotal/that.pageSize < that.page){
                        that.allLoaded = true;
                    }
					var news = data.data || [];
					if(news.length > 0){
                        that.firstLoaded = false;
                        for(var i in news) {
                            that.news.push(news[i]);
                        }
					}else{
                        that.firstLoaded = true;
                    }
					setSessionStorage("newlist", JSON.stringify(that.news));
				}
                if(that.$refs.loadmore != undefined){
                    that.$refs.loadmore.onBottomLoaded();
				}
			});
		},
		handleTopChange(status) {
			this.topStatus = status;
		},
		handleBottomChange(status) {
			this.bottomStatus = status;
		},
		scan: function() {
			cordova.plugins.barcodeScanner.scan(
				function(result) {
					if(result.text) {
						openApp(result.text);
					} else {
						$toast.show('没有扫到任何结果');
					}
				},
				function(error) {
                    $toast.show("扫描出现异常: " + error);
				}, {
					preferFrontCamera: false, // iOS and Android 前置摄像头
					showFlipCameraButton: false, // iOS and Android 摄像头转换按钮
					showTorchButton: false, // iOS and Android 手电筒按钮
					torchOn: false,
					prompt: "放入框内，自动扫描",
					resultDisplayDuration: 100,
					formats: "QR_CODE,PDF_417",
					orientation: "portrait"
				}
			);
		},
		getnewslist: function() {
			var that = this;
			/*
			 *新闻
			 */
			if(getSessionStorage("newlist") != null && JSON.parse(getSessionStorage("newlist")).length > 0) {
                that.news = JSON.parse(getSessionStorage("newlist"));
            } else {
				httpUtils.getRequest('/news/newslist', {
					page: 1,
					pageSize: that.pageSize
				}, function(data) {
					var data = data.data;
					if(data && data.success) {
					    console.log(data);
						that.recordsTotal = data.recordsTotal;
                        if(that.recordsTotal/that.pageSize < 1){
                            that.allLoaded = true;
                        }
						var news = data.data || [];
						for(var i in news) {
							delete news[i].content;
							that.news.push(news[i]);
						}
						setSessionStorage("newlist", JSON.stringify(that.news));
                        setSessionStorage("homerepage", 1);
						setSessionStorage("homerecordsTotal", that.recordsTotal);
					}
				});
			 }
		},
		getrotation: function() {
			/*
			 *获取幻灯片
			 */
			var that = this;
            var adslist = getLocalStorage("absnew",3600*6);
            if(adslist != null && JSON.parse(adslist).length > 0) {
                that.ads = JSON.parse(adslist)
            } else {
                httpUtils.getRequest('/news/rotation', function (data) {
                    var data = data.data;
                    if (data && data.success) {
                        var news = data.data || [];
                        if (news.length > 0) {
                            for (var i in news) {
                                delete news[i].content;
                                that.ads.push(news[i]);
                            }
                            setLocalStorage("absnew", JSON.stringify(that.ads));
                        }
                    }
                });
            }
		},
		loadmyapp: function() {
            var subsApps = JSON.parse(getLocalStorage('subsApps', config.app_cache_time));
            var recommendApps = JSON.parse(getLocalStorage('recommendApps', config.app_cache_time));
            if(subsApps){
                this.myApps = subsApps;
			}else{
                if(recommendApps){
                    this.myApps = recommendApps;
                }else{
                    $loading.show('数据加载中');
                    httpUtils.getRequest('/appstore/applist', function(data){
                        if(data && data.data){
                            $loading.hide();
                            //推荐的应用
                            that.myApps = data.data.subsApps ? data.data.subsApps : data.data.recommendApps;
                            setLocalStorage('recommendApps', JSON.stringify(data.data.recommendApps));
                            setLocalStorage('subsApps', JSON.stringify(data.data.subsApps));
                            setLocalStorage('categoryApps', JSON.stringify(data.data.categoryApps));
                        }
                    });
                }
			}
			var that = this;
			/*
			 *加载我的应用或推荐应用
			 */
            httpUtils.getRequest('/common/checkSessionindex', function(data) {
                if(data && data.data.result =='success') {
                    var subsApps = JSON.parse(getLocalStorage('subsApps',config.app_cache_time))
                    if(subsApps) {
                        that.myApps = subsApps;
                    } else {
                        httpUtils.getRequest("/appstore/myapplist", function(data) {
                            if(data.data && data.data.response !=null) {
                                that.myApps = data.data.response;
                                setLocalStorage('subsApps', JSON.stringify(that.myApps));
                            }
                        });
                    }
                }
            });
		},
		searchClick:function(){
			this.$router.push("/newssearch");
		}
	};
	export default {
		data() {
			return {
				keywords: '',
				myApps: JSON.parse(getLocalStorage('recommendApps', config.app_cache_time)),
				ads: getLocalStorage("absnew",3600*6) ? JSON.parse(getLocalStorage("absnew",3600*6)) : [],
				news: [],
				page: getSessionStorage("homerepage") != null ? getSessionStorage("homerepage") : 1, //上拉到的新闻页数
				pageSize: 5,
				recordsTotal: getSessionStorage("homerecordsTotal") != null ? getSessionStorage("homerecordsTotal") : 0, //总的新闻条数 
				allLoaded: false,
				bottomStatus: '',
				topStatus: '',
                firstLoaded:true
			}
		},
		methods: methods,
		mounted() {
            this.firstLoaded = false;
			var that = this;
			/*幻灯片*/
            this.getrotation();
			//获取我的应用列表
			this.loadmyapp();
			/*新闻*/
            if(getSessionStorage("newlist") != null && JSON.parse(getSessionStorage("newlist")).length > 0) {
                that.news = JSON.parse(getSessionStorage("newlist"));
            } else {
                this.getnewslist();
            }
		},
		updated() {
            //设置滚动位置
            if (this.firstLoaded == true){
                var path = location.hash.replace('#', '');
            	document.body.scrollTop = sessionStorage.getItem(path) != undefined ? sessionStorage.getItem(path) : 0;
        	}
		},
		beforeRouteLeave(to, from, next) {
			//存储滚动位置
			sessionStorage.setItem(from.path, document.body.scrollTop);
			if(to.path == '/appdetail'){
				$loading.show('请稍等...');
			}
			next()
		}
	}
</script>
<style scoped>
	#home {
		font-family: "黑体";
	}
	
	.header {
		position: fixed;
		z-index: 12;
	}
	#home .header-search-nav .bar.item-input-inset .item-input-wrapper{margin-right:36px;background-color: white;}
	#home .scrollcontent {
		padding-bottom: 50px;
	}
	#home .bar .buttons {
		right: 5px;
	}

	.w-content {
		overflow: initial;
	}

	.entrance {
		height: 75px;
		padding: 0px 0;
		position: relative;
	}
	
	.entrance .icon {
		font-size: 30px;
		line-height: 30px;
		width: 30px;
		height: 30px;
		margin-bottom: 6px;
	}
	
	.entrance span {
		display: block;
		font-size: 11px;
		line-height: 26px;
		max-width: 73px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: auto;
		color: #000000;
	}
	
	.w-cells {
		margin: 0px;
	}
	
	.button.button-positive.button-clear {
		color: #fff;
	}
	
	.home-icon {
		width: 26px;
		height: 26px;
		margin-top: 20px;
	}
	
	.home-search label {
		background-color: white;
	}
	/*.home-search .item-input-wrapper{margin-right: 10px;}*/
	
	.saoyisao {
		width: 26px;
		height: 26px;
		margin-top: 5px;
		margin-right: 10px;
	}
	
	#home form {
		width: 100%;
	}
	
	#home .w-cells {
		width: 100%;
		max-height: 160px;
		margin-bottom: 10px;
	}
	
	#home .w-cells .col {
		width: 25%;
		float: left;
	}
	
	.header-search-nav .bar.item-input-inset .item-input-wrapper {
		margin-right: 36px;
		background-color: white;
	}
	/*#home .bar-header{background-image:none;padding-right: 38px;position: fixed;}*/
	
	#home .bar-header form {
		width: 100%;
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
	
	.nothing {
		text-align: center;
		height: 50px;
		line-height: 50px;
		position: relative;
	}
	
	.nothing p {
		width: 100px;
		margin: auto;
		color: #666;
		background: #f5fafe;
	}
	
	.nothing div {
		width: 100%;
		z-index: -1;
	}
	
	.nothing div:after {
		content: "";
		position: absolute;
		background-color: #ddd;
		display: block;
		left: 0;
		bottom: 25px;
		left: 50%;
		height: 1px;
		width: 85%;
		transform-origin: 0% 0%;
		-webkit-transform-origin: 0% 0%;
		transform: scaleY(0.5) translateX(-50%);
		-webkit-transform: scaleY(0.5) translateX(-50%);
		z-index: -1;
	}
	
	#home .item-input-wrapper {
		background-color: #fff;
	}
	
	.swiper-container {
		height: 160px;
	}
</style>