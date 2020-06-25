const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
let server = http.createServer(function (request, response) {
    //获取输入的url解析后的对象
    let pathname = url.parse(request.url, true).pathname;
    if (pathname == "/index") {
        pathname = '/index.html';
        staticname = 'src'
    }
    console.log(staticname);
    
    //static文件夹的绝对路径
    let staticPath = path.resolve(__dirname,staticname);
    //获取资源文件绝对路径
    let filePath = path.join(staticPath, pathname);
    console.log(filePath);


    //异步读取file
    fs.readFile(filePath, function (err, data) {
        if (err) {
            console.log(err);
            // 如果找不到文件资源报错可以显示准备好的 404页面
            let errPath = path.join(staticPath, '/404.html');
            fs.readFile(errPath, (err, data404) => {
                if (err) {
                    console.log('error');
                    response.write('404 Not Found');
                    response.end();
                } else {
                    response.writeHead(404, { "Content-Type": "text/html;charset='utf-8'" });
                    response.write(data404);
                    response.end();
                }
            })
        } else {
            console.log('ok');
            response.write(data);
            response.end();
        }
    })
})
let staticname;
server.listen(8888)
console.log('running http://localhost:8888');
