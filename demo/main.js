import Vue from 'vue'
import VueRouter from 'vue-router'
import Wingconn from 'wingconn'
Vue.use(VueRouter)
// Demos
import Index from './views/Index'
import Home from './views/Home'
import Button from './views/components/button/Button'
import Toggle from './views/components/toggle/Toggle'
import Radio from './views/components/radio/Radio'

import Icon from './views/components/icon/Icon'
import Input from './views/components/input/Input.vue'
import Search from './views/components/search/Search.vue'
import Swiper from './views/components/swiper/Swiper'
import Checkbox from './views/components/checkbox/Checkbox.vue'
import Grid from './views/components/grid/Grid'
import List from './views/components/list/List'
import Tab from './views/components/tab/Tab.vue'
import Buttonbar from './views/components/buttonbar/Buttonbar.vue'

import Scroll from "./views/components/scroll/Scroll.vue"
import Badge from "./views/components/badge/Badge.vue"
import Actionsheet from "./views/components/actionsheet/actionsheet.vue"
import Header from "./views/components/header/Header"
import Loadmore from "./views/components/loadmore/Loadmore.vue"

import Dialog from './views/components/dialog/Dialog'
import Loading from './views/components/loading/Loading'
import Nav from './views/components/nav/Nav'
import Tabbar from './views/components/tabbar/Tabbar'
import Picker from './views/components/picker/Picker'
import Cascade from './views/components/cascade/Cascade'
import Popup from './views/components/popup/Popup'

import  Color from './views/components/utility/color'
const routes = [
    {
        path: '/',
        component: Index,
        redirect: '/home'
    },
    {
        path : '/home',
        component: Home,
    },
    {
        path:'/button',
        component: Button
    },
    {
        path:'/toggle',
        component: Toggle
    },
    {
        path:'/radio',
        component: Radio
    },
    {
        path:'/icon',
        component:Icon
    },
    {
        path:'/input',
        component:Input
    },
    {
        path:'/search',
        component:Search
    },
    {
        path:'/swiper',
        component: Swiper
    },
    {
        path:'/checkbox',
        component:Checkbox

    },
    {
        path:'/list',
        component: List
    },
    {
        path:'/tab',
        component:Tab

    },
    {
        path:"/scroll",
        component:Scroll

    },
    {
        path:'/dialog',
        component: Dialog
    },
    {
        path:'/loading',
        component: Loading
    },
    {
        path:'/nav',
        component: Nav
    },
    {
    	path:'/badge',
    	component:Badge
    },
    {
    	path:"/actionsheet",
    	component:Actionsheet
    },
    {
    	path:"/header",
    	component: Header
    },
    {
        path:'/tabbar',
        component: Tabbar,
        children: [
            {path: 'button', component: {template: '<h1 style="text-align: center; line-height: 150px;">button</h1>'}},
            {path: 'toggle', component: {template: '<h1 style="text-align: center; line-height: 150px;">toggle</h1>'}},
            {path: 'radio', component: {template: '<h1 style="text-align: center; line-height: 150px;">radio</h1>'}},
            {path: 'list', component: {template: '<h1 style="text-align: center; line-height: 150px;">list</h1>'}}
        ]
    },
    {
    	path:'/buttonbar',
    	component: Buttonbar
    },
    {
    	path:'/grid',
    	component: Grid
    },
    {
        path:'/color',
        component: Color
    },
    {
        path:'/loadmore',
        component: Loadmore
    },
    {
        path:'/picker',
        component: Picker
    },
    {
    	path:'/cascade',
        component: Cascade
    },
    {
    	path:'/popup',
    	component: Popup
    }
];
const  router = new VueRouter({
    routes:routes
});
new Vue({
    router,
    template:'<router-view></router-view>',
}).$mount('#app')

import FastClick from 'fastclick'
FastClick.attach(document.body)
