const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
var title = "你爱你的母校吗？"
const url = "http://mp.weixin.qq.com/profile?src=3&timestamp=1494341091&ver=1&signature=VCaStKDpWEBLw1SQt1LfCDYJzVgWZ9kvGFwvbBignqq2IwPrD-c1FLS62FjZsOegrSKj-a*ROjANX9WxcRPPNA==";
var html = '';
var wechatName = '了然文化传播';



http.get(url, function(res){
	

	res.on('data', function(data){
		html += data;
	});
	console.log("Got response: " + res.statusCode); 
	
	
	res.on('end', function(){
		var begin = html.indexOf('msgList') + 10;
		var end = html.indexOf('seajs') - 11;
		var titleBegin = 0,
		titleEnd = 0;
		var script;
		
		
		var titles = [];
		for(var i = begin;i>=begin&&i<=end;){
			var titleBegin = html.indexOf('\"title\"', i) + 9,
			titleEnd = html.indexOf('\"}', titleBegin);
			if(titleBegin<begin)
				break;
			var title = html.substring(titleBegin,titleEnd);
			titles.push(title);
			i = titleEnd + 1;
		}
		console.log(titles);

		/*titles.forEach(function(title, index){
			//console.log(index);
			setTimeout(function(){
				var searchURL = "http://weixin.sogou.com/weixin?type=2&s_from=input&query="+ encodeURI(title.substring(0,5)) +"+"+encodeURI(wechatName)+"&ie=utf8";
				http.get(searchURL, function(res){
					console.log(res);
					var HTML = '';
					res.on('data', function(data){
						HTML += data;
					});

					res.on('end', function(){
						var begin = HTML.indexOf('target=\"_blank\" href') + 22;
						var end = HTML.indexOf('=\"', begin);
						var url = HTML.substring(begin, end + 1).replace(/&amp;/g,"&");
						console.log(title);
						console.log(url);

						http.get(url, function(res){
							var html = '';
							res.on('data', function(data){
								html += data;
							});

							res.on('end', function(data){
								fs.readFile('./script.html','utf-8',function(err, data){
									script = data.toString();
									html = html.replace(/<script[\s\S]*?<\/script>/g, '');
									html = html.replace(/<!--[\s\S]*?-->/g, '');
									html = html.replace(/<\/body>/, '</body>'+script);
									fs.writeFile('./template/'+title+'.html', html, function(err){
										console.log(err);
									});
								});
							});
						})
						
					});
				});
			},index*5000);
			
		});*/
		/*var searchURL = "http://weixin.sogou.com/weixin?type=2&s_from=input&query="+ encodeURI(titles[10]) +"+LiveYoung&ie=utf8";
		//console.log(searchURL);
		http.get(searchURL, function(res){
			//console.log(res);
			var HTML = '';
			res.on('data', function(data){
				HTML += data;
			});

			res.on('end', function(){
				var begin = HTML.indexOf('target=\"_blank\" href') + 22;
				var end = HTML.indexOf('=\"', begin);
				var url = HTML.substring(begin, end + 1).replace(/&amp;/g,"&");
				console.log(url);
			});
		});*/
	});

});

const server = http.createServer((req,res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end(html);
});
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});