<template>
  <div id="regist" v-on:keyup.enter = 'confirm1'>
    <div class="top">
      <h1>注册</h1>
    </div>
    <div id="yourname" class="log right">
      <label for="yname">用户名： </label>
      <input type="text" name="yname" id="yname" placeholder="输入用户名" v-model="name" v-on:blur="check2" />{{message2}}
    </div>
    <div id="password" class="log right">
      <label for="pass">密&#12288码：</label>
      <input type="password" name="pass" id="pass" placeholder="输入6位密码" v-model="password" v-on:input="check1" />{{message1}}
    </div>
    <div id="password1" class="log">
      <label for="pass1">再次输入密码：</label>
      <input type="password" name="pass1" id="pass1" placeholder="再输入密码" v-model="password1" v-on:input="check" />{{message}}
    </div>

    <div id="confirm" class="top">
      <button type="button" name="button" v-on:click='confirm1' ><span>确认</span></button>{{mes}}
    </div>

  </div>
</template>

<script>
//读取json文件内的账号密码信息
var json;
function loadXMLDoc()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			json = eval('(' + xmlhttp.responseText + ')');
		}
	}
	xmlhttp.open("GET","user.json",true);
	xmlhttp.send();
};
window.onload = loadXMLDoc();

export default {

  data () {
    return {
      name:'',
      password:'',
      password1:'',
      message:'',
      message1:'',
      confirmP:false,
      confirmN:true,
      mes:'',
      message2: ''
    }
  },
  methods:{
    //todo:检查密码长度是否符合要求
    check1(){
      if(this.password.length==6){
        this.message1 ='密码规格正确'
      }else{
        this.message1='密码长度不正确！！'
      }
    },
    //todo: 检查两次密码是否一致
    check(){
      if(this.password === this.password1){
        this.message = '正确';
        this.confirmP = true;
      }else{
        this.message = "请重新输入，密码不正确";
        this.confirmP =false;
      }
    },
    confirm1(){
      //todo： 检查密码与用户名是否都符合要求
      if(this.confirmP && this.confirmN) {
        //转换为ASCII码,避免有符号歧义，打好包数据
        var NAME = encodeURIComponent(this.name);
        var PASSWORD = encodeURIComponent(this.password);
        var sendOut = 'name='+NAME+'&'+"password="+PASSWORD;
        //由于不会写入json，使用localStorage验证新注册的账号密码
        localStorage.name = this.name;
        localStorage.password = this.password;
        console.log(sendOut);
        this.mes = "注册成功，将跳转到登录页面";
        setTimeout(function() {
          window.location.assign('http://localhost:8080')
        },2000)

      }else {
        this.mes = "注册信息有误，请更改";
      }
    },
    //todo： 检查用户名是否重复
    check2(){
      if(this.name) {
        this.confirN = true;
        this.message2 = '此用户名可用';
        for(var i =0;i<json.length;i++) {
          if(this.name === json[i].name) {
            this.message2 = '此用户名已经被使用';
            this.confirmN = false;
          };
        }
      }else {
        this.message2 ='';
      }

    }
  }
}
</script>

<style>

#regist{
  margin-left: 500px;
}
.top{
  margin-left: 100px;
}
.log{
  margin-bottom: 20px;
}
input{
  border:none;
}
input:focus{
  outline: 0;
	background-color:#FF0;
}
#confirm span{
  font-size: 16px;
}
.right{
  margin-left: 48px;
}
</style>
