let Ajax = {
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



function buildCatList(list, ) {

  return new Promise(function (resolve, reject) {

    setTimeout(function (name) {

      Ajax.get('https://www.tianqiapi.com/free/day?appid=43562826&appsecret=v0s3AZhX&city=北京', function () {
        let catList = JSON.parse(this.responseText).city
        resolve(catList)
      })
    }, 200)

  }
  )
}
function getseven(id) {
  return new Promise(function (resolve, reject) {

    setTimeout(function () {

      Ajax.get(`https://www.tianqiapi.com/free/week?appid=43562826&appsecret=v0s3AZhX&city=${id}`, function () {
        let data = JSON.parse(this.responseText)
        resolve(data)
      })
    }, 200)

  }
  )
} 


async function render() {

  var a = await buildCatList('')
  var b = await getseven(a);


  console.log(b)

}

render()

