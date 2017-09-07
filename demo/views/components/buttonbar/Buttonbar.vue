<template>
	<w-frame title="选项卡">
		 <div id="button" class="component-body">
		 	<h3>属性</h3>
		 	<h4>theme</h4>
		 	<p class="p-sub-item">样式背景,可选值为[assertive, positive, balanced, energized, calm, royal, dark, light, clear]</p>
		 	<h4>:tab-items</h4>
		 	<p class="p-sub-item">tab按钮数组,</p>
		 	<h4>:tab-index</h4>
		 	<p class="p-sub-item">当前选中的tab下标</p>
		 	<h4>on-tab-click</h4>
		 	<p class="p-sub-item">tab按钮点击以后，触发的方法，接受一个index参数,可以获取当前点击的tab下标例如:on-tab-click="clickActive"></p>
		 	<w-buttonbar theme="positive" :tab-items="tabs" :tab-index="tabActive" :on-tab-click="clickActive"></w-buttonbar>
		 </div>	
	 </w-frame>	
</template>

<script>
 import Frame from '../Frame'
    export default{
        components: {
            'w-frame': Frame
        },
        data:function(){
        	return {
        		 tabs: [
		          "tab 1",
		          "tab 2",
		          "tab 3"
		        ],
				tabActive:1
        	}
        },
        methods:{
        	clickActive:function(index){
        		this.tabActive=index;
        		console.log(index);
        	}
        }
       
    }
</script>

<style>
</style>