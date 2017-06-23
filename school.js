const user = '';
const pwd = '';

const open = async function(url){
	const http = require('http');
	const hostname = 'localhost';
	const port = 3000;
	const phantom = require('phantom');
	const cheerio = require('cheerio');
	const instance = await phantom.create();
	const page = await instance.createPage();
	var i = 0;
	page.property('onUrlChanged', function(url){
		console.log(url);

	});
	page.property('onConsoleMessage', function(msg){
		console.log(msg);
	});
	setTimeout(async function(){
		console.log('newPage');

		await page.evaluate(function(){
			var base = document.createElement('base');
			base.href = 'http://self.dgut.edu.cn';
			document.head.insertBefore(base, document.head.firstChild);
			$(function(){
				$('a[href="/Flow"]')[0].click();
			})
			

		});

		
	}, 5000);

	setTimeout(async function(){
		await page.evaluate(function(){
			var base = document.createElement('base');
			base.href = 'http://self.dgut.edu.cn';
			document.head.insertBefore(base, document.head.firstChild);
			$(function(){
				$('#my1').attr('checked',true);
				$('#my1').attr('value', 6).attr('id', 'my5');
				//$('button[type="submit"]')[0].click();
			})

		});
		const content = await page.property('content');

		const server = http.createServer(function(req,res){
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html;charset=UTF-8');
			res.end(content);
			
		});
		if(server.listening)
			server.close();
		server.listen(port, hostname, function(){
		  console.log('服务器运行在 http://${hostname}:${port}/');
		});
	},10000)

	await page.open(url, function(status){
		
	});
	await page.evaluate(function(){
		var base = document.createElement('base');
		base.href = 'https://cas.dgut.edu.cn';
		document.head.insertBefore(base, document.head.firstChild);
		$(function(){
			$($('input')[2]).val(user);
			$($('input')[3]).val(pwd);
			$('input[type="submit"]').click();
		});
		

	});
	
	
};

open('http://self.dgut.edu.cn/Flow');