import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

Vue.use(VueRouter);
//定义组件
import login from './components/login.vue'
import reg from './components/regist.vue'
//创建路由实例
//配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/',
      component: login

    },
    {
      path: '/regist',
      component: reg
    }
  ]
})
//根实例
new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
