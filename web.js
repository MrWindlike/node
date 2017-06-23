const express = require('express');
const app = express();
const wechat = express();
const Mongo = require('./mongodb.js');
const DB_CONN_STR = 'mongodb://admin:admin@localhost:27017/Wechat'; 
const wechatdb = new Mongo(DB_CONN_STR);

app.all('*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "http://192.168.1.100:8080");  
	res.header("Access-Control-Allow-Headers", "X-Requested-With");  
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
	res.header("X-Powered-By",' 3.2.1')  
	res.header("Content-Type", "application/json;charset=utf-8"); 
	next();
});

app.get('/', function(req, res){
	let wechats = [];
	wechatdb.searchData({collect:'Wechat', callback:function(result){
		
		result.forEach(function(wechat){

			wechats.push(wechat.name);
		});
		res.send(wechats);
	}});
	
})



app.listen(80);