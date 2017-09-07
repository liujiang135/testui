<template>
	<w-frame title="徽章">
		<div id="badge" class="component-body">
			 <h3>属性</h3>
			  <h4>num</h4>
			   <p class="p-sub-item">显示的数值</p>
			   <h4>bg-color</h4>
			   <p class="p-sub-item">显示的背景颜色【assertive, positive, balanced, energized, calm, royal, dark, light, clear】</p>
			<w-badge num="99"  bg-color="assertive"></w-badge>
			<w-badge num="99"  bg-color="positive"></w-badge>
		</div>
	</w-frame>
</template>

<script>
	import Frame from '../Frame'
	export default{
		components: {
	      'w-frame': Frame
	    }
	}
</script>
