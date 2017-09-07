<template>
  <span class="w-badge" 
  	:class="[
  		bgColor?bgColor+'-bg':''
  		]">
    <div v-html="num" class="w-badge-num"></div>
  </span>
</template>
<script>
	export default{
		name:"w-badge",
		props: {
      		num: [String,Number],
      		bgColor:{
      			type:String,
      			default:'energized'
      		}
    	}
	}
</script>
