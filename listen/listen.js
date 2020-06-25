
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
  var lrc = document.getElementById('lrc')
  var music = document.getElementById('music');
  var lrcfrom = document.getElementById('lrc');
  music.onclick = ()=>{
    Ajax.get('http://120.27.241.248:8089/lyric?id=1328909529',function(){
      console.log(JSON.parse(this.responseText))
      var request = JSON.parse(this.responseText).data.lrc.lyric
      console.log(request);
      
      var lrcarr = request.split('\n')
      console.log(lrcarr)
      for(i in lrcarr){
        lrcarr[i] = lrcarr[i].substr(lrcarr[i].lastIndexOf("]")+1)
        var li = document.createElement('li');
        li.innerHTML = lrcarr[i];
        lrcfrom.appendChild(li);

      }
    })
  }