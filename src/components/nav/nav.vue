<template>
  <div class="bar bar-header">
    <router-link v-if="leftHref && isLeftRouter" tag="i" class="button button-icon icon" :class="'ion-' + leftIcon" :to="leftHref"></router-link>
    <a v-if="leftHref && !isLeftRouter" class="button button-icon icon" :class="'ion-' + leftIcon" :href="leftHref" @click="leftClick"></a>
    <h1 class="title">{{title}}</h1>
    <router-link v-if="rightHref && isRightRouter" tag="i" class="button button-icon icon" :class="'ion-' + rightIcon" :to="rightHref"></router-link>
    <a v-if="rightHref && !isRightRouter" class="button button-icon icon" :class="'ion-' + rightIcon" :href="rightHref" @click="rightClick"></a>
  </div>
</template>
<script>
  export default {
    name: 'w-nav',
    props: {
      leftLink: {
        type: String
      },
      rightLink: {
        type: String
      },
      leftIcon: {
        type: String,
        default: 'ios-arrow-back'
      },
      rightIcon: {
        type: String,
        default: 'navicon'
      },
      title: {
        type: String
      }
    },
    methods: {
      leftClick(){
        this.$emit('leftClick');
      },
      rightClick(){
        this.$emit('rightClick');
      }
    },
    mounted(){
      let reg = /^http:\/\/|^https:\/\/|^ftp:\/\//;
      this.leftHref = this.leftLink;
      this.rightHref = this.rightLink;
      if(this.leftLink != undefined){
        if(this.leftLink.match(reg)){
          this.isLeftRouter = false;
        }else if(this.leftLink.trim() == '' || this.leftLink.trim() == '#'){
          this.isLeftRouter = false;
          this.leftHref = 'javascript:void(0)';
        }
      }
      if(this.rightLink != undefined){
        if(this.rightLink.match(reg)){
          this.isRightRouter = false;
        }else if(this.rightLink.trim() == '' || this.rightLink.trim() == '#'){
          this.isRightRouter = false;
          this.rightHref = 'javascript:void(0)';
        }
      }
    },
    data() {
      return {
        isLeftRouter: true,
        isRightRouter: true,
        leftHref: '',
        rightHref: ''
      }
    }
  }
</script>