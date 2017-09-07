import Vue from 'vue'
import Button from './components/button/button'
import {Swiper, SwiperItem} from './components/swiper/index'

import Icon from './components/icon/icon'
import Input from './components/input/input'
import Search from './components/input/search'
import Checkbox from './components/checkbox/checkbox'
import {Grid, GridItem}  from   "./components/grid/index"
import Tabs from "./components/tabs/tab.vue"
import Badge from "./components/badge/badge.vue"
import Buttonbar from "./components/buttonbar/buttonbar"

import Toggle from './components/toggle/toggle'
import Radio from './components/radio/radio'
import {List, ListItem} from './components/list/index'
import Scorll from "./components/scroll/scroll.vue"
import Nav from './components/nav/nav'
import Tabbar from './components/tabbar/tabbar'
import Header from './components/header/header'
import Loadmore from "./components/loadmore/loadmore"
import Picker from "./components/picker/picker"
import Cascade from "./components/cascade/index"
import Popup from "./components/popup/popup" 

import './services/backdrop/index'
import './components/dialog/dialog'
import './components/loading/index'
import './services/cascadepanel/index'
import './components/actionsheet/index'

Vue.component(Button.name, Button);
Vue.component(Toggle.name, Toggle);
Vue.component(Radio.name, Radio);
Vue.component(Icon.name,Icon);
Vue.component(Input.name,Input);
Vue.component(Search.name,Search);
Vue.component(Swiper.name, Swiper);
Vue.component(SwiperItem.name, SwiperItem);
Vue.component(Checkbox.name, Checkbox);
Vue.component(List.name, List);
Vue.component(ListItem.name, ListItem);
Vue.component(Tabs.name,Tabs);
Vue.component(Scorll.name,Scorll);
Vue.component(Nav.name,Nav);
Vue.component(Badge.name,Badge);
Vue.component(Buttonbar.name,Buttonbar);
Vue.component(Tabbar.name, Tabbar);
Vue.component(Header.name, Header);
Vue.component(Loadmore.name,Loadmore);
Vue.component(Grid.name, Grid);
Vue.component(GridItem.name, GridItem);
Vue.component(Picker.name, Picker);
Vue.component(Cascade.name, Cascade);
Vue.component(Popup.name, Popup);

export default {

    Button,
    Icon,
    Input,
    Swiper,
    SwiperItem,
    Toggle,
    Radio,
    Search,
    Checkbox,
    Tabs,
    List,
    ListItem,
    Scorll,
    Nav,
    Badge,
    Tabbar,
    Header,
    Buttonbar,
    Loadmore,
    Grid,
    GridItem,
    Picker,
    Cascade,
    Popup

}
