import Vue from 'vue'
import {createElement} from '../../services/utils'
import Alert from './Alert'
import Confirm from './Confirm'

class Dialog {
  show(type, options) {
    let rnd = Math.random().toString(36).substring(3, 6);
    let marker = `von-${type}-${rnd}`;
    createElement(marker);
    let selector = `[${marker}]`;

    let obj = {};
    switch(type){
      case 'alert':
        obj = Alert;
        break;
      case 'confirm':
        obj = Confirm;
        break;
      default:
        console.error('parameter \"type\" is not valid !');
        return;
    }
    let vm = new Vue(obj).$mount(selector);

    vm.$el.setAttribute('wingconn-dialog', '');

    return vm.show(options);
  }

  alert(options) {
    return this.show('alert', options);
  }

  confirm(options) {
    return this.show('confirm', options);
  }
}

window.$dialog = new Dialog();
