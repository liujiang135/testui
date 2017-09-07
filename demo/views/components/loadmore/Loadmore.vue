<template>
	<w-frame title="顶部导航条">
		<w-loadmore :top-method="loadTop" @top-status-change="handleTopChange" 
			:bottom-method="loadBottom" @bottom-status-change="handleBottomChange" 
			:bottom-all-loaded="allLoaded" ref="loadmore">
		<div id="loadmore" class="component-body">
			<h3>属性</h3>
			<h4>autoFill</h4>
			<p class="p-sub-item">若为真，loadmore 会自动检测并撑满其容器 。默认值:true</p>
			<h4>topPullText</h4>
			<p class="p-sub-item">topStatus 为 pull 时加载提示区域的文字。默认值:'下拉刷新'</p>
			<h4>topDropText</h4>
			<p class="p-sub-item">topStatus 为 drop 时加载提示区域的文字。默认值:'释放更新'</p>
			<h4>topLoadingText</h4>
			<p class="p-sub-item">topStatus 为 loading 时加载提示区域的文字。默认值:'加载中...'</p>
			<h4>topDistance</h4>
			<p class="p-sub-item">触发 topMethod 的下拉距离阈值（像素）。默认值:70</p>
			<h4>topMethod</h4>
			<p class="p-sub-item">下拉刷新执行的方法</p>
			<h4>bottomPullText</h4>
			<p class="p-sub-item">bottomStatus 为 pull 时加载提示区域的文字。默认值'上拉刷新'</p>
			<h4>bottomDropText</h4>
			<p class="p-sub-item">bottomStatus 为 drop 时加载提示区域的文字。默认值'释放更新'</p>
			<h4>bottomLoadingText</h4>
			<p class="p-sub-item">bottomStatus 为 loading 时加载提示区域的文字。默认值'加载中...'</p>
			<h4>bottomDistance</h4>
			<p class="p-sub-item">触发 bottomMethod 的上拉距离阈值（像素）。默认值:70</p>
			<h4>bottomMethod</h4>
			<p class="p-sub-item">上拉刷新执行的方法</p>
			<h4>bottomAllLoaded</h4>
			<p class="p-sub-item">若为真，则 bottomMethod 不会被再次触发。默认值:false</p>
			
			<ul class="page-loadmore-list">
		          <li v-for="item in list" class="item">{{ item }}</li>
		    </ul>
		</div>
		</w-loadmore>
	</w-frame>	
</template>

<script>
  import Frame from '../Frame'
  export default {
  	data() {
      return {
        list: [],
        topStatus: '',
        allLoaded: false,
        bottomStatus: '',
      };
    },
    components: {
      'w-frame': Frame
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },

      loadTop() {
        setTimeout(() => {
          let firstValue = this.list[0];
          for (let i = 1; i <= 5; i++) {
            this.list.unshift(firstValue - i);
          }
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },

      loadBottom() {
        setTimeout(() => {
          let lastValue = this.list[this.list.length - 1];
          if (lastValue < 40) {
            for (let i = 1; i <= 10; i++) {
              this.list.push(lastValue + i);
            }
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      }
    },

    created() {
      for (let i = 1; i <= 10; i++) {
        this.list.push(i);
      }
    },
    
   }
</script>

<style>
</style>