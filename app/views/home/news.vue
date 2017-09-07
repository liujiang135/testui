<template>
	<div id="news">
		<w-header >
			<router-link :to="callbackurl" class="button button-icon icon ion-ios-arrow-back" slot="left"></router-link>
	      	<div slot="title">
	      			新闻
	      	</div>
	      	<img v-if="favoriteStatus" class="saoyisao" src="assets/images/home/select.png" slot="right" @click="favorite"/>
	      	<img v-else class="saoyisao" src="assets/images/home/save.png" slot="right" @click="favorite"/>
	    </w-header>
	    <div class="w-content w-content-no-bottom">
	    	<div class="news-content">
	    		<div class="news-title">{{title}}</div>
	    		<div class="title-row">
	    			<p class="title">{{original}}</p>
	    			<p class="time">{{releaseTime}}</p>
	    		</div>
          <div v-html="content"></div>
	    	</div>
	    </div>	
	</div>
</template>

<script>
  import httpUtils from '../../js/utils/http-utils';
  var methods = {
    /*收藏新闻*/
    favorite(){
      var that = this;
      var newsId = that.id;
      var url = '';
      var hint = '';
      var favoriteStatus;
      if(that.favoriteStatus){
        url = '/news/unfavoritenews';
        hint = '已取消收藏';
        favoriteStatus = false;
      }else{
        url = '/news/favoritenews';
        hint = '已收藏';
        favoriteStatus = true;
      }
      httpUtils.postRequest(url, {newsId: newsId, userId: uId}, function(data){
        var data = data.data;
        if(data && data.success){
          $toast.show(hint, 1500).then(function(){
            that.favoriteStatus = favoriteStatus;
          });
        }
      });
    }
  };
  export default{
    data(){
      return {
        uId: localStorage.getItem('userid') ? localStorage.getItem('userid') : 0,
        id: '',
        title: '',
        original: '',
        releaseTime: '',
        content: '',
        favoriteStatus: false, //收藏状态
        callbackurl:this.$route.query.callbackurl
      }
    },
    methods: methods,
    mounted(){
    	console.log(this.callbackurl);
	  $loading.show('数据加载中');
      var that = this;
      var newsId = that.$route.query.newsId;

      httpUtils.getRequest('/news/newsdetail', {newsId: newsId, uId: this.uId}, function(result){
      	 $loading.hide();
        var data = result.data;
        if(data && data.success){
          var news = data.data;
          that.id = news.id;
          that.title = news.title;
          that.original = news.source;
          that.releaseTime = news.createdTimestamp;
          that.content = news.content;
          that.favoriteStatus = news.favoriteStatus;
        }else{
          console.log(data.message);
        }
      });
    },
	
  }
</script>

<style>
/*news.vue*/
#news .ion-ios-arrow-back{
	color: #1895ff
}
.saoyisao{width: 26px; height: 24px; margin-top: 5px;	margin-right: 5px;}
.news-title{font-size: 20px; line-height: 30px; padding-top: 18px;}
.news-content{
	background-color: white;
	padding: 0px 15px;
	padding-bottom: 20px;
	height: 100%;
	font-family:"黑体";
}
.news-content .title-row{
	width: 100%;
	height: 20px;
  margin: 10px 0;
}
.news-content .title-row .title{
	color: #1895ff;
	float: left;
}
.news-content .title-row .time{
	float: right;
	color: #7d7d7d;
}
.news-content img{max-width: 100% !important;}

</style>