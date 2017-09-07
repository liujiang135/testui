<template>
  <w-frame title="顶部导航条">
    <!--Nav-->
    <div id="nav" class="component-body">
      <h3>属性</h3>
      <h4>left-link</h4>
      <p class="p-sub-item">左边按钮的路由地址或链接地址（注：如果是链接地址，需要以"http://或https://开头"）</p>
      <h4>right-link</h4>
      <p class="p-sub-item">右边按钮的路由地址或链接地址（注：如果是链接地址，需要以"http://或https://开头"）</p>
      <h4>left-icon</h4>
      <p class="p-sub-item">左边按钮图标</p>
      <h4>right-icon</h4>
      <p class="p-sub-item">右边按钮图标</p>
      <h4>title</h4>
      <p class="p-sub-item">标题</p>
      <h3>事件</h3>
      <h4>leftClick</h4>
      <p class="p-sub-item">注：当left-link属性的值为空字符串（''）或'#'时，该事件有效。当left-link属性值为路由地址（任何非URI地址，都被视为路由地址）时，事件无效。</p>
      <h4>rightClick</h4>
      <p class="p-sub-item">注：当right-link属性的值为空字符串（''）或'#'时，该事件有效。当right-link属性值为路由地址（任何非URI地址，都被视为路由地址）时，事件无效。</p>
      <div style="position: relative; margin-bottom: 100px;">
        <w-nav title="标题" left-link="/home" right-link="#" @leftClick="leftClick" @rightClick="rightClick"></w-nav>
      </div>
    </div>
  </w-frame>
</template>

<script>
  import Frame from '../Frame'
  export default {
    components: {
      'w-frame': Frame
    },
    methods: {
      leftClick(){
        alert('leftClick!');
      },
      rightClick(){
        alert('rightClick!');
      }
    }
  }
</script>
