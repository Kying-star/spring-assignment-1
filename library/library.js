console.log('this is library page');
var Ajax = {
  get: function (url, fn) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {

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
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
        fn.call(this, xhr.responseText);
      }
    };
    xhr.send(data);
  }
}
var gotohome = document.getElementById('gotohome');
var gotoperson = document.getElementById('gotoperson');
gotohome.onclick = () => {
  window.open('http://127.0.0.1:8000/home', '_self');
}
gotoperson.onclick = () => {
  window.open('http://127.0.0.1:8000/person', '_self')
}




var musicdiv = document.querySelector('.musiclist');



var music_lists=[];
var music_list_name = [];
var music_list_name_num=0;
var idlist = [][300];
Ajax.get('http://47.99.165.194/top/playlist?limit=10&order=new',function(){
  let allmusic = (JSON.parse(this.responseText)).playlists;
  allmusic.forEach(e=>{
    music_list_name.push(e.name)
    music_lists.push(e.id)
  })

  console.log(music_list_name);
 
 get(music_lists[0])
   function get(e){
    console.log(e);
    
    
    Ajax.get(`http://47.99.165.194/playlist/detail?id=${e}`,function(){
      let musiclist = JSON.parse(this.responseText);
    console.log(musiclist.playlist.name);
    
    let count=0;
    let i=0;
     musiclist.privileges.forEach((e)=>{
       //console.log(len);
       
       if(e.fee==0){
         Ajax.get(`http://47.99.165.194/song/url?id=${e.id}`,function(){
           let music = JSON.parse(this.responseText);
           //console.log(music);
           if(music.data[0].size!=0){
            console.log(music.data[0].id);
            //idlist[i].push(music.data[0].id);
           let audio = document.createElement('audio');
           audio.src = music.data[0].url
           audio.setAttribute('controls','controls')

           //console.log(audio.duration);
           
           musicdiv.appendChild(audio)
           }

           
           

           
         })
       }

     })
     //console.log(idlist);
     

    })

  }
  
  
  
  
})







//var music = document.querySelector('.music');






// var musicdiv = document.querySelector('.musiclist');

// music_list.forEach(element => {
//   Ajax.get(`http://120.27.241.248:8080/song/url?id=${element}`, function () {
//     let data = JSON.parse(this.responseText).data;
//     let audio = document.createElement('audio');
//     audio.src = data.url
//     audio.setAttribute('controls','controls')
//     musicdiv.appendChild(audio)
//     console.log(data.url);
    
//   })
// }
// )



