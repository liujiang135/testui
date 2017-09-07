import Vue from 'vue'
import router from './router/index'
/*UI组件*/
import Header from '../src/components/header/header'
import Button from '../src/components/button/button'
import Icon from '../src/components/icon/icon'
import Input from '../src/components/input/input'
import Search from '../src/components/input/search'
import {List, ListItem} from '../src/components/list/index'
import {Swiper, SwiperItem} from '../src/components/swiper/index'
import Scorll from "../src/components/scroll/scroll"
import Tabbar from '../src/components/tabbar/tabbar'
import Toggle from '../src/components/toggle/Toggle'
import Loadmore from "../src/components/loadmore/loadmore"
import Cascade from "../src/components/cascade/index"
import Picker from "../src/components/picker/picker"
import Popup from "../src/components/popup/popup"
import "../src/components/actionsheet/index"
/*注册组件*/
Vue.component(Button.name, Button);
Vue.component(Icon.name,Icon);
Vue.component(Input.name,Input);
Vue.component(Search.name,Search);
Vue.component(Swiper.name, Swiper);
Vue.component(SwiperItem.name, SwiperItem);
Vue.component(List.name, List);
Vue.component(ListItem.name, ListItem);
Vue.component(Scorll.name,Scorll);
Vue.component(Tabbar.name, Tabbar);
Vue.component(Header.name, Header);
Vue.component(Toggle.name, Toggle);
Vue.component(Loadmore.name,Loadmore);
Vue.component(Cascade.name,Cascade);
Vue.component(Picker.name,Picker);
Vue.component(Popup.name,Popup);

/*UI组件services*/
import '../src/services/backdrop/index'
import '../src/components/dialog/dialog'
import '../src/components/loading/index'
import '../src/services/cascadepanel/index'

new Vue({
  router,
  template:'<router-view></router-view>'
}).$mount('#app');
import FastClick from 'fastclick'
FastClick.attach(document.body);

