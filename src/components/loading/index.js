import Vue from 'vue'
import Loading from './Loading'
import {createElement, timeout} from '../../services/utils'

function WLoading() {
  let vm = undefined;
  function showToast(tips, duration) {
    if (vm && vm.getState() > 0) {
      vm.update({
        tips: tips
      });

      setTimeout(() => {
        vm.hide();
      }, duration || 1500);
      return;
    }

    createElement('wingconn-loading');
    vm = new Vue(Loading).$mount('[wingconn-loading]');
    vm.show({
      tips: tips
    });

    return timeout(duration || 1500).then(() => {
      return vm.hide();
    });
  }

  function showLoading(tips) {
    if (vm && vm.getState() > 0) {
      vm.update({
        tips: tips,
        showSpinner: true
      });
      return;
    }

    createElement('wingconn-loading');
    vm = new Vue(Loading).$mount('[wingconn-loading]');
    vm.show({
      tips: tips,
      showSpinner: true
    });

    return timeout();
  }

  function hide() {
    if (vm){
      let el = vm.$el;
     
      if(el.parentNode!=null)
      {
      	 el.parentNode.removeChild(el);
      }
      vm.hide();
    }
  }

  function update(options) {
    vm.update(options);
  }

  return {
    showToast,
    showLoading,
    hide,
    update
  }
}

let loading = new WLoading();

window.$loading = {
  show: loading.showLoading,
  hide: loading.hide
};

window.$toast = {
  show: loading.showToast,
  hide: loading.hide
};
