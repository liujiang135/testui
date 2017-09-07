<template>
  <w-frame title="九宫格">
    <!--Cell-->
    <div id="cell" class="component-body">
      <h3>属性</h3>
      <h4>cols</h4>
      <p class="p-sub-item">显示列数：默认为4列（即宽度为25%）。<br/><b>注意：</b>当设置&lt;w-grid-item&gt;的width属性时，优先级高于&lt;w-grid&gt;的cols属性</p>
      <p style="font-size: 14px; color: orange; font-weight: bold;">以宫格方式显示</p>
      <w-grid cols="3">
        <w-grid-item>
          <router-link to="/home" tag="div">
            <div class="grid_icon">
              <w-icon type="ios-analytics" color="assertive" size="29"></w-icon>
            </div>
            <p class="grid_label"> router </p>
          </router-link>
        </w-grid-item>
        <w-grid-item>
          <router-link to="/home" tag="div">
            <div class="grid_icon">
              <w-icon type="ios-pie" color="positive" size="29"></w-icon>
            </div>
            <p class="grid_label"> router </p>
          </router-link>
        </w-grid-item>
        <w-grid-item>
          <router-link to="/home" tag="div">
            <div class="grid_icon">
              <w-icon type="ios-cog" color="balanced" size="29"></w-icon>
            </div>
            <p class="grid_label"> router </p>
          </router-link>
        </w-grid-item>
        <w-grid-item>
          <div onclick="alert('onclick')">
            <div class="grid_icon">
              <w-icon type="ios-timer" color="energized" size="29"></w-icon>
            </div>
            <p class="grid_label"> onclick </p>
          </div>
        </w-grid-item>
        <w-grid-item>
          <div onclick="alert('onclick')">
            <div class="grid_icon">
              <w-icon type="ios-alarm" color="assertive" size="29"></w-icon>
            </div>
            <p class="grid_label"> onclick </p>
          </div>
        </w-grid-item>
        <w-grid-item>
          <div onclick="alert('onclick')">
            <div class="grid_icon">
              <w-icon type="ios-speedometer" color="balanced" size="29"></w-icon>
            </div>
            <p class="grid_label"> onclick </p>
          </div>
        </w-grid-item>
      </w-grid>
      <p style="font-size: 14px; color: orange; font-weight: bold; margin-top: 10px;">以栅格方式显示</p>
      <w-grid cols="3">
        <w-grid-item width="50%">
          <div>
            <div class="grid_icon">
              <w-icon type="ios-calendar-outline" color="balanced" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
        <w-grid-item width="50%">
          <div>
            <div class="grid_icon">
              <w-icon type="ios-camera" color="positive" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
        <w-grid-item>
          <div>
            <div class="grid_icon">
              <w-icon type="ios-navigate" color="energized" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
        <w-grid-item>
          <div>
            <div class="grid_icon">
              <w-icon type="ios-printer" color="positive" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
        <w-grid-item>
          <div>
            <div class="grid_icon">
              <w-icon type="ios-locked" color="energized" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
        <w-grid-item width="25%">
          <div>
            <div class="grid_icon">
              <w-icon type="ios-color-filter" color="assertive" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
        <w-grid-item width="25%">
          <div>
            <div class="grid_icon">
              <w-icon type="ios-medkit" color="energized" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
        <w-grid-item width="25%">
        <div>
          <div class="grid_icon">
            <w-icon type="ios-keypad" color="balanced" size="29"></w-icon>
          </div>
          <p class="grid_label"> button </p>
        </div>
      </w-grid-item>
        <w-grid-item width="25%">
          <div>
            <div class="grid_icon">
              <w-icon type="ios-baseball" color="balanced" size="29"></w-icon>
            </div>
            <p class="grid_label"> button </p>
          </div>
        </w-grid-item>
      </w-grid>
    </div>
  </w-frame>
</template>

<script>
  import Frame from '../Frame'
  export default {
    components: {
      'w-frame': Frame
    }
  }
</script>

<style>
  .grid_icon {
    width: 28px;
    height: 28px;
    margin: 0 auto;
  }
  .grid_icon img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .grid_icon + .grid_label {
    margin: 5px 0 0;
  }
  .grid_label {
    display: block;
    text-align: center;
    color: #000;
    font-size: 14px;
  }
</style>
