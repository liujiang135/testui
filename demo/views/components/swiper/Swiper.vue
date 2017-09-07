<template>
  <w-frame title="图片轮播">
    <!--Swiper-->

    <div id="swiper" class="component-body">
      <h3>属性</h3>
      <h4>width</h4>
      <p class="p-sub-item">支持固定宽度和百分比（例如：200、50%）</p>
      <h4>height</h4>
      <p class="p-sub-item">支持固定高度和百分比（例如：200、50%）</p>
      <h4>pagerColor</h4>
      <p class="p-sub-item">分页符选中时的颜色（例如：#333333）</p>
      <h4>pagerBgColor</h4>
      <p class="p-sub-item">分页符未选中时的颜色（例如：#333333）</p>
      <h4>direction</h4>
      <p class="p-sub-item">滑动方向（*horizontal, vertical）</p>

      <div style="display: block;">
        <w-swiper ref="swiper" width="100%" height="200">
          <w-swiper-item v-for='item in arr'>
            <img style="width: 100%; height: 100%;" src="assets/img/swiper1.jpg"/>
          </w-swiper-item>

          <w-swiper-item>
            <img style="width: 100%; height: 100%;" src="assets/img/swiper2.jpg"/>
          </w-swiper-item>

          <w-swiper-item>
            <img style="width: 100%; height: 100%;" src="assets/img/swiper3.jpg"/>
          </w-swiper-item>
        </w-swiper>
      </div>
    </div>
  </w-frame>
</template>

<script>
  import Frame from '../Frame'
  export default {
    data() {
      return {
				
      }
    },
    components: {
      'w-frame': Frame
    }
  }

</script>
