<template>
  <div class="wc-app">
    <div class="bar bar-header blue-bg">
      <router-link tag="i" class="button button-icon icon ion-ios-arrow-back" :to="backlink"></router-link>
      <h1 class="title">{{title}}</h1>
    </div>
    <div class="page has-navbar" style="overflow: auto;">
      <div class="page-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'w-frame',
    props: {
      backlink: {
        type: String,
        default: '/home'
      },
      title: {
        type: String
      }
    }
  }
</script>