<template>
  <w-frame title="按钮">
    <!--List-->
    <div id="list">
      <div class="item item-divider">图标列表布局</div>
      <w-list>
        <w-list-item>
          正常
        </w-list-item>
        <w-list-item class="item-icon-left">
          左侧图标
          <w-icon type="home" color="positive"></w-icon>
        </w-list-item>
        <w-list-item class="item-icon-right">
          右侧图标
          <w-icon type="ios-arrow-right" color="royal"></w-icon>
        </w-list-item>
        <w-list-item class="item-icon-right">
          文字
          <a href="http://www.baidu.com">
            <span class="item-note">备注</span>
            <i class="icon ion-ios-arrow-right royal"></i>
          </a>
        </w-list-item>
        <w-list-item class="item item-icon-left item-icon-right">
          <w-icon type="chatbubble-working"></w-icon>
            左右图标<span class="item-note">备注</span>
          <w-icon type="ios-telephone-outline"></w-icon>
          </a>
        </w-list-item>
        <div class="item item-divider">头像列表</div>
        <w-list-item class="item item-avatar">
          <img src="assets/img/avatar1.jpg">
          <h2>张三</h2>
          <p>东北F4</p>
        </w-list-item>
        <w-list-item class="item item-avatar">
          <img src="assets/img/avatar2.jpg">
          <h2>赵四</h2>
          <p>东北F4</p>
        </w-list-item>
        <div class="item item-divider">缩略列表</div>
        <w-list-item class="item item-thumbnail-left item-icon-right">
          <img src="assets/img/thumb1.jpg">
          <h2>标题一</h2>
          <p>简述简述</p>
          <w-icon type="ios-arrow-right" color="royal"></w-icon>
        </w-list-item>
        <w-list-item class="item item-thumbnail-left item-icon-right">
          <img src="assets/img/thumb2.jpg">
          <h2>标题二</h2>
          <p>简述简述</p>
          <w-icon type="ios-arrow-right" color="royal"></w-icon>
        </w-list-item>
      </w-list>
    </div>
  </w-frame>
</template>
<script>
  import Frame from '../Frame'
  import Icon from '../../../../src/components/icon/icon'
  export default {
    data() {
      return {}
    },
    components: {
      'w-frame': Frame,
      'w-icon': Icon
    }
  }
</script>