import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 引入组件模板
import Index from '../views/index'
import Home from '../views/home/home'
import News from "../views/home/news"
import Newssearch from "../views/home/newssearch"

import AppStore from '../views/app/appstore'
import AppDetail from '../views/app/appdetail'
import AppSearch from '../views/app/appsearch'
import AppAuthorization from  '../views/app/appAuthorization.vue'

import Message from '../views/message/message'
import MesssageList from '../views/message/messageList'

import Setting from '../views/setting/setting'
import UserConfig from '../views/setting/config'
import About from '../views/setting/about'
import Devicelock from '../views/setting/devicelock'
import Loginrecord from '../views/setting/loginrecord'
import Changephone from '../views/setting/changephone'
import Getcode from '../views/setting/getcode'
import Mysubscribe from '../views/setting/mysubscribe'
//实名制
import Prove from '../views/setting/realnameauthentication/prove'
import Passageway from '../views/setting/realnameauthentication/passageway'
import Updateabode from '../views/setting/realnameauthentication/updateabode'
import Updatecommunity from '../views/setting/realnameauthentication/updatecommunity'
//修改个人资料
import Updatephone from '../views/setting/userinfo/updatephone'
import Updatephonecode from '../views/setting/userinfo/updatephonecode'
import Updatephonesuccess from '../views/setting/userinfo/updatephonesuccess'
import Updateemail from '../views/setting/userinfo/updateemail'
import Emailcode from '../views/setting/userinfo/emailcode'
import Emailcodesuccess from '../views/setting/userinfo/emailcodesuccess'
/*登录页面*/
import Login from '../views/login/login'
import Register from '../views/login/register'
import Forgetpassword from '../views/login/forgetpassword'
import Password from '../views/login/password'
/*账户设置*/
import EditPassword from '../views/setting/userconfig/editpassword'

let routemaps = [
  {
    path: '/',
    component:Index,
    redirect:"home",
    children:[
      {path: 'home', component: Home},
      {path: 'appstore', component: AppStore},
      {path: 'message', component: Message},
      {path: 'setting', component: Setting}
    ]
  },
  {
  	path:'/login',
  	component:Login
  },
  {
  	path:'/register',
  	component:Register
  },
  {
  	path:'/forgetpassword',
  	component:Forgetpassword
  },
  {
  	path:'/password',
  	component:Password
  },
  {
    path: '/messagelist',
    component: MesssageList
  },
  {
    path: '/userconfig',
    component: UserConfig
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/editpassword',
    component: EditPassword
  },
  {
    path: '/devicelock',
    component: Devicelock

  },
  {
    path: '/loginrecord',
    component: Loginrecord
  },
  {
    path: '/changephone',
    component: Changephone
  },
  {
    path: '/getcode',
    component: Getcode
  },
  {
    path: '/appdetail',
    component: AppDetail
  },
  {
      path: '/appauthorization',
      component: AppAuthorization
  },
  {
    path: '/appsearch',
    component: AppSearch
  },
  {
  	path: '/news',
   	component: News
  },
  {
  	path:'/newssearch',
  	component:Newssearch,
  	children:[
  		{
  			path:"newsdetail",
  			component:News
  		}
  	]
  },
  {
  	path:'/subscribe',
  	component:Mysubscribe
  },
  {
  	path:'/prove',
  	component:Prove
  },
    {
        path:'/passageway',
        component:Passageway
    },
   {
    path:'/updateabode',
    component:Updateabode
   },
   {
    path:'/updatecommunity',
    component:Updatecommunity
   },
  {
  	path:'/updatephone',
  	component:Updatephone
  },
  {
  	path:'/updatephonecode',
  	component:Updatephonecode
  },
  {
  	path:'/updatephonesuccess',
  	component:Updatephonesuccess
  },
  {
  	path:'/updateemail',
  	component:Updateemail
  },
  {
  	path:'/emailcode',
  	component:Emailcode
  },
  {
  	path:'/emailcodesuccess',
  	component:Emailcodesuccess
  }
];
const router = new VueRouter({
    routes: routemaps
});
export default router;
