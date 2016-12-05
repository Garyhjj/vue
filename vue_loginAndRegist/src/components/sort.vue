<template>
  <div id="sort">
  <ol>
    <li v-for="todo in todos">
      姓名：{{ todo.name }}&#12288
      性别：{{ todo.sex }}&#12288
      年龄：{{ todo.age }}&#12288
      邮箱：{{ todo.email }}
    </li>
  </ol>
  <button type="button" name="button" v-on:click="showD">显示原顺序</button>
  <ol>
    <li v-bind:class="{ active: todo1.isActive }" v-for="todo1 in todo1s">
      姓名：{{ todo1.name }}&#12288
      性别：{{ todo1.sex }}&#12288
      年龄：{{ todo1.age }}&#12288
      邮箱：{{ todo1.email }}
    </li>
  </ol>
  <button type="button" name="button" v-on:click="showS">排序后</button>
</div>
</template>

<script>
//读取json文件内的账号密码信息
var json2;
var json3;
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
			json2 = eval('(' + xmlhttp.responseText + ')');
      json3= json2.slice()
		}
	}
  //同步方式
	xmlhttp.open("GET","student.json",false);
	xmlhttp.send();
};

export default {

  data () {
    return {
      todos: [
    ],
    todo1s: [
    ]
    }
  },
  methods: {
    showD(){
      loadXMLDoc()
      this.todos=[];
      for(var i=0;i<json2.length;i++) {
        this.todos.push({name: json2[i].name,sex: json2[i].sex,age: json2[i].age,email: json2[i].email})
      }
    },
    showS(){
      loadXMLDoc()
      for (var k = 0; k < json3.length; k++) {
        for (var j = json3.length-1; j > 0; j--) {
            if (json3[j].age < json3[j-1].age) {
                var temp = json3[j - 1];
                json3[j - 1] = json3[j];
                json3[j] = temp;
            }
        }
      };
      this.todo1s=[];
      for(var i=0;i<json3.length;i++) {
        if(json3[i].age>10){
          this.todo1s.push({name: json3[i].name,sex: json3[i].sex,age: json3[i].age,email: json3[i].email})
        };
      }
      for(var i=0;i<this.todo1s.length;i++) {
        if(this.todo1s[i].sex === 'woman') {
          this.todo1s[i].isActive =true;
        }else{
          this.todo1s[i].isActive =false;
        }
      }
    }
  }
}
</script>

<style>
li.active{
  font-size: 18px;
  background-color: yellow;
  color:#333;
}
</style>
