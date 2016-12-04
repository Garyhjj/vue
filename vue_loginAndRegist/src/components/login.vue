<template>
  <div id="login" v-on:keyup.enter = 'confirm2'>
    <div class="top">
      <h1>登录</h1>
    </div>
    <div id="yourname" class="log">
      <label for="yname">用户名： </label>
      <input type="text" name="yname" id="yname" placeholder="输入用户名(myhjj[1-4])" v-model="name" />
    </div>
    <div id="password" class="log">
      <label for="password">密&#12288码：</label>
      <input type="password" name="yname" id="yname" placeholder="输入密码(12345[1-4])" v-model="password" />
    </div>
    <div id="confirm" class="top">
      <button type="button" name="button" v-on:click='confirm2'><span>确认</span></button>{{message}}
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
      success:false,
      message:'',
      seen:true,
    }
  },
  methods: {
    //确认账号密码是否正确
    confirm2(){
      this.success = false;
      for(var i =0;i<json.length;i++) {
        if(this.name === json[i].name) {
          if(this.password === json[i].password) {
            this.success = true;
          }
        }
      }
      //由于不会写入json，使用localStorage验证新注册的账号密码
      if(this.name === localStorage.name && this.password === localStorage.password){
        this.success = true;
      }
      if(this.success) {
        this.message = '登录成功，正在跳转'
      }else {
        this.message = '登录失败!!账号或密码错误'
      }

    }
  }
}
</script>

<style>
#login{
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
</style>
