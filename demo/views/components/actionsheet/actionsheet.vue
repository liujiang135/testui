<template>
	<w-frame title="操作列表">
		<div id="actionsheet" class="component-body">
			<p class="p-sub-item"></p>
			<h3>操作列表</h3>
			<w-button color="positive" block="true" @click="actionSheet">操作列表</w-button>
		</div>
	</w-frame>
</template>

<script>
	import Frame from '../Frame'
	export default{
		components: {
			'w-frame': Frame
		},
		methods: {
			actionSheet: function () {
				$actionSheet.show({
					title: '标题',
					buttons: [{text: '按钮1', color: '#E31FD7', callback: function(){
							alert('按钮1');
						}},{text: '按钮2', color: 'blue', callback: function(){
							alert('按钮2');
						}}],
					cancelText: "取消"
				})
			}
		}
	}
</script>

<style>
</style>