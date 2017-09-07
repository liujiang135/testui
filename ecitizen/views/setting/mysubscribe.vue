<template>
	<div class="w-body">
	    <w-header color="blue-bg">
	      <router-link to="/setting" class="button button-icon icon ion-ios-arrow-left" slot="left"></router-link>
	      <div slot="title">我的订阅</div>
	    </w-header>
	    <div class="w-content">
	     	<w-list class="mylist mt10">
	     		<w-list-item v-for="(item,index) in applist" class="item-icon-left">
		          <img  class="uicon loadappimg" :src="item.appIcon"/><span class="mes-title">{{item.appName_cn}}</span>
		          <!--<router-link :to="{ path: '/appdetail',query: { uId: uId,appId:item.appVersionId, appflag:true} }">-->
		          	<!--<div  class="details"  >查看详情</div>-->
		          <!--</router-link>  	-->
		          <div class="delete" @click='unsubscribe(item.appId,index)'>取消订阅</div>
				  <router-link :to="'/appauthorization?appId=' + item.appId + '&appName='+ item.appName_cn +'&opsPage=mysubscribe&beforeRoute=/appstore'">
					<div  class="details">应用授权</div>
				  </router-link>

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
	import leftDelete from '../../assets/js/left-delete/left-delete'//左滑删除
	import silenceRequest from '../../assets/js/utils/silence-request';
    import {$$, setLocalStorage, getLocalStorage} from '../../assets/js/utils/common-utils';
    import config from '../../assets/js/config';
	export default{
		data(){
	      return{
	        applist:[]
	      }
	    },
		mounted() {
			leftDelete.swipper();
			var that=this;
            var subsApps = JSON.parse(getLocalStorage('subsApps',config.app_cache_time))
            if(subsApps) {
                that.applist = subsApps;
                that.$nextTick(function () {
                    leftDelete.swipper();
                })
            } else {
                $loading.show('数据加载中...');
				httpUtils.getRequest("/appstore/myapplist",function(data){
					$loading.hide();
					var data=data.data;
					if(data.statusCode==200 && data.result && data.response !=null){
						that.applist=data.response;
					}
                    setLocalStorage('subsApps', JSON.stringify(data.response));
					that.$nextTick(function () {
						leftDelete.swipper();
					})
				})
			}
		},
		methods:{
      unsubscribe: function (appId, index) {
        $loading.show('数据处理中...');
        var that = this;
        httpUtils.postRequest('/appstore/unsubapp', {appId: appId}, function (data) {
          if (data && data.data && data.data.result) {
            $toast.show('应用退订成功:)', 1500);
            that.applist.splice(index, 1);
            //重新初始化用户订阅应用数据
              setLocalStorage('subsApps', JSON.stringify(that.applist));
          } else {
            $toast.show(data.data.response, 1500);
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
  .swipeleft{transform:translateX(-160px);-webkit-transform:translateX(-160px);}

  .mylist .item-icon-left{padding:8px 15px;}
  .mylist .item-icon-left .uicon{width:40px;padding-right: 15px;vertical-align: middle}
  .mylist .item-icon-left .mes-title{font-size:16px;line-height: 39px;vertical-align: middle}
  .delete{
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
  .details{
  	position: absolute;
    top: 0;
    right: -160px;
    text-align: center;
    background: #34bbf3;
    color: #fff;
    width: 80px;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid #dddddd;
  }

  .panel{

  }
</style>