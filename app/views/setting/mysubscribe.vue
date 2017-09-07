<template>
	<div class="w-body">
	    <w-header color="blue-bg">
	      <router-link to="/setting" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">我的订阅</div>
	    </w-header>
	    <div class="w-content">
	     	<w-list class="mylist mt10">
	     		<w-list-item v-for="(item,index) in applist" class="item-icon-left">
		          <img  class="uicon loadappimg" src="assets/images/app-blank.png" :appicon="item.appIcon" onload="loadimg(this)"/><span class="mes-title">{{item.appName}}</span>
		          <router-link :to="{ path: '/appdetail',query: { uId: uId,appId:item.appVersionId, appflag:true} }">
		          	<div  class="details"  >查看详情</div>
		          </router-link>  	
		          <div  class="delete"  @click='unsubscribe(item.appVersionId,index)'>取消订阅</div>
		        </w-list-item>
	     	</w-list>
	    </div>
		<!--没有应用-->
		<div class='nomessage' v-show='applist == undefined || applist.length==0'>
			<img src="assets/images/nomessage.png" />
			<p>暂时没有订阅应用！</p>
		</div>
 	 </div>
</template>

<script>
	import httpUtils from 'http-utils';
	import leftDelete from '../../js/left-delete/left-delete'//左滑删除
	import silenceRequest from '../../js/utils/silence-request';
	export default{
		data(){
	      return{
	        applist:[],
	        uId:localStorage.getItem('userid')
	      }
	    },
	    beforeCreate(){
	    	$loading.show('数据加载中');
	    },
		mounted() {
			leftDelete.swipper();
			var that=this;
			httpUtils.getRequest("/appstore/myapplist",{uId:this.uId},function(data){
				$loading.hide();
				var data=data.data;
				if(data.statusCode==200)
				{
					that.applist=data.response;
				}
				that.$nextTick(function () {
					leftDelete.swipper();
				})
			})
		},
		methods:{
      unsubscribe: function (appId, index) {
        $loading.show('数据处理中');
        var that = this;
        httpUtils.postRequest('/appstore/unsubapp', {uId: this.uId, appId: appId}, function (data) {
          $loading.hide();
          if (data && data.data && data.data.result) {
            $toast.show('退订成功', 1500);
            that.applist.splice(index, 1);
            //重新加载本地缓存
            silenceRequest.intervalAppStore();
          } else {
            $toast.show(data.data.message, 1500);
          }
        });
      }
    }
	}
</script>

<style scoped>
	.w-content{
		overflow-x:hidden;
		bottom: 0px;
	}
  .mylist{
  	 margin-bottom: 0px;
    background: #ffffff;
    padding: 0;
    }
   .item{
  	overflow: inherit;
  }
  .item-icon-left{
  	margin: 0;
    border:0;
    padding:5px 5px 5px 60px;
    position: relative;
    transition:transform 0.4s;
    display: block;
  }
  .item-icon-left:after{content:"";position: absolute;background-color: #ddd;display: block;left: 0;bottom:0px;right: auto;height: 1px;width:100%;
       transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
  .swipeleft{transform:translateX(-175px);-webkit-transform:translateX(-175px);}
  
  .mylist .item-icon-left{padding:8px 15px;}
  .mylist .item-icon-left .uicon{width:40px;padding-right: 15px;vertical-align: middle}
  .mylist .item-icon-left .mes-title{font-size:16px;line-height: 39px;vertical-align: middle}
  .delete{
  	position: absolute;
    top: 0;
    right: -175px;
    text-align: center;
    background: #ff2929;
    color: #fff;
    width: 95px;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #dddddd;
  }
  .details{
  	position: absolute;
    top: 0;
    right: -80px;
    text-align: center;
    background: #c8c7cd;
    color: #fff;
    width: 80px;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #dddddd;
  }
  
  .panel{
  	
  }
</style>