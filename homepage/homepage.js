var Ajax={
    get: function(url, fn) {
  
      var xhr = new XMLHttpRequest();            
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {

        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 

          fn.call(this, xhr.responseText);  
        }
      };
      xhr.send();
    },

    post: function (url, data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
          fn.call(this, xhr.responseText);
        }
      };
      xhr.send(data);
    }
  }
//封装的AJAX 方法 get ,post ,传参url ,fu
  var text = [];
  var img_num = 0;
//获取轮播图
Ajax.get('http://120.27.241.248:8089/album/newest',function(){

  let img = JSON.parse(this.responseText);


  console.log(list);
  
  let Album = img.Album

  Album.forEach(element => {
    //console.log(element);
    //console.log(element.name);
    
    text.push(element.name)

    let showimg = document.createElement('img');
    showimg.src = element.picUrl;
    showimg.setAttribute("class", "divimg"); 
    showimg.setAttribute("title", element.name); 
    list.appendChild(showimg)
    img_num++;
    //console.log(img_num);
});
  play();
});



var time;//定时器

var list = document.getElementById('list');

var banner = document.querySelector('.banner');

var Album_name = document.querySelector('.Album_name');

//自动轮播
function play(){
  //console.log(text);
  //console.log('开始轮播');
  //console.log(parseInt(list.style.left));
  
  Album_name.innerHTML = text[0];
    time = setInterval(function(){
      if(parseInt(list.style.left)>=-(img_num-2)*12){
          list.style.left = parseInt(list.style.left)+ -12 +'rem'
          list.style.transition = '1000ms'
          Album_name.innerHTML = text[(-parseInt(list.style.left))/12];
       
          //console.log(Album_name.innerHTML);
          
      }else if(parseInt(list.style.left)<-(img_num-2)*12){
          list.style.left = 0 + 'rem'
          list.style.transition =''
          Album_name.innerHTML = text[0];
      }
      
    },3000)
}

//获取歌词

Ajax.get("")


//页面跳转

var goto_person = document.getElementById('gotoperson');
var goto_library = document.getElementById('gotoLibrary');

goto_person.onclick = ()=>{
  window.open('http://127.0.0.1:8000/person','_self');
}
goto_library.onclick = ()=>{
  window.open('http://127.0.0.1:8000/library','_self')
}

//专辑详情

Ajax.get('http://120.27.241.248:8089/album',function(){
  let message  = JSON.parse(this.responseText)
  //console.log(message.message);
  let emj = document.querySelector('.New_Albums');
  emj.innerHTML = emj.innerHTML + message.message
})


//歌曲封面

var music_show = document.querySelector('.music_show');


Ajax.get('http://120.27.241.248:8089/top/playlist',function(){
  let albumlist = JSON.parse(this.responseText); 
  console.log(albumlist);
  albumlist = albumlist.playlist
  for(let i =0;i<10;i++){
    let div_album = document.createElement('div');
    let album_img = document.createElement('img');
    let name = document.createElement('p');
    let nickname = document.createElement('p');
    nickname.innerHTML = albumlist[i].creator.nickname;
    album_img.src = albumlist[i].coverImgUrl;
    name.innerHTML = albumlist[i].name;
    music_show.appendChild(div_album);
    div_album.appendChild(album_img);
    div_album.appendChild(name);
    div_album.appendChild(nickname);
    div_album.onclick = ()=>console.log(albumlist[i].id);
    
  }



})

