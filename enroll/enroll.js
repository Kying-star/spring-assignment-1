console.log("this is enroll page")

var input_username = document.getElementById("input_username")
input_username.setAttribute("placeholder","用户名");
console.log(input_username);

var input_password = document.getElementById("input_password")
input_password.setAttribute("placeholder","密码");

var btn_enroll = document.getElementById('enroll_btn');

//用户名判空
var uesrname_isright = function(){
    console.log('输入的用户名为'+this.value)
    if(this.value == ""){
        document.getElementById('input_username_isright').innerHTML = "用户名不能为空";
    }else{
        document.getElementById('input_username_isright').innerHTML = "";       
    }
}
var password_isright = function(){
    console.log('输入的密码为'+this.value)
    if(this.value == ""){
        document.getElementById('input_password_isright').innerHTML = "密码不能为空";
    }else{
        document.getElementById('input_password_isright').innerHTML = "";       
    }
}



//判断用户输入
input_username.oninput = debounce(uesrname_isright,300,false)
input_password.oninput = debounce(password_isright,300,false)

function debounce(func,wait,immediate){//防抖函数
    let timeout;
    return function(){
        let args = arguments;
        let content = this;
        clearTimeout(timeout);
        if(immediate){
            let callnow = !timeout;
            timeout = setTimeout(()=>{
                timeout = null;
            },wait);
            if(callnow) func.apply(content,args)
        }else{
            timeout = setTimeout(function(){
                func.apply(content,args)
            },wait);
        }
    }
}

//登录

var enroll = document.getElementById('enroll_btn');

enroll.onclick = function(){
    let username = document.getElementById('input_username').value;
    let password = document.getElementById('input_password').value;
    if(username==''||password==''){
        alert('请填写完整您的信息');
        return;
    }
    window.open('http://127.0.0.1:8000/home','_self')
}