console.log('this is person page');


var gotohome = document.getElementById('gotohome');

var gotolibrary = document.getElementById('gotolibrary');

gotohome.onclick = ()=>{
    window.open('http://127.0.0.1:8000/home','_self');
}


gotolibrary.onclick = ()=>{
    window.open('http://127.0.0.1:8000/library','_self')
}