<template>
  <div id="app">
    <div id="header">
      <ul>
        <li><router-link to="/">登录</router-link></li>
        <li><router-link to="/regist">注册</router-link></li>
      </ul>
    </div>
    <div id="content">
      <router-view></router-view>

    </div>
    <sort></sort>

  </div>
</template>

<script>
//引入组件
import sort from './components/sort.vue'

export default {
  name: 'app',
  data () {
    //本vue实例数据
    return{

    }
  },
  components:{sort}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#header{
  background-color: #888;
  height:50px;

}
#header ul{
  float: left;
  list-style-type: none;
  margin-left: 160px;
}
#header ul li{
  float: left;
  margin-right: 20px;
}
#header ul li a{
  text-decoration: none;
  color:#fff;
}
#header ul li a:hover{
  color: red;
}
</style>
