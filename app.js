/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Luyh
 * @Date: 2020-11-12 10:01:40
 * @LastEditors: Luyh
 * @LastEditTime: 2020-11-12 12:02:02
 */
var http = require('http');//http模块
var fs = require('fs');//文件模块
var url = require('url');//url解析模块，用于解析get请求中 例如 /pinglun?username=asda+&mes=das+
var template = require('art-template');
var serve = http.createServer();

var mes=[
    {
        name:'张三',
        mes:'今天天气不错',
        dataTime:'2020-05-15'
    },
    {
        name:'张三',
        mes:'今天天气不错',
        dataTime:'2020-05-15'
    },
    {
        name:'张三',
        mes:'今天天气不错',
        dataTime:'2020-05-15'
    },
    {
        name:'张三',
        mes:'今天天气不错',
        dataTime:'2020-05-15'
    },
    {
        name:'张三',
        mes:'今天天气不错',
        dataTime:'2020-05-15'
    }
]

serve.on('request',function(req,res){
    // 使用url.parse() 方法将路径解析为一个方便的操作对象 第二个参数为true表示直接将查询的字符串转为一个对象(通过query属性来访问)
    var parseObj = url.parse(req.url,true);
    console.log(parseObj)
    // 单独获取不包含字符串的路径部分
    var pathname = parseObj.pathname;
    if(pathname === '/'){
        fs.readFile('./view/index.html',function(error,data){
            if(error){
                res.end('404 Not Found')
            }
            var htmlStr=template.render(data.toString(),{
                mes:mes
            })
            res.end(htmlStr)
        })
    }else if(pathname === '/add' ){
        fs.readFile('./view/add.html',function(error , data){
            if(error){
                res.end('404 Not Found')
            }
            res.end(data.toString())
        })
    }else if(pathname.indexOf('/public/') === 0 ){
        fs.readFile('.'+pathname,function(error , data){
            if(error){
                res.end('404 Not Found')
            }
            res.end(data)
        })
    }else if(pathname === '/pinglun' ){
        var commont = parseObj.query;
        commont.dataTime = '2020-06-15';
        mes.push(commont);
        res.statusCode = 302;
        res.setHeader('Location','/');
        res.end();
    }else{
        fs.readFile('./view/404.html',function(err,data){
            if(err){
                res.setHeader('Content-Type','Text/plain;charset=utf-8')
                res.end('404 Not Found')
            }
            res.end(data)
        })
    }
})
serve.listen(3000,function(){
    console.log('服务器启动成功')
})
