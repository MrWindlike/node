var user = '201541402129';
var pwd = 'liu13579.';


const open = async function(url){
	const http = require('http');
	const hostname = 'localhost';
	const port = 3000;
	const phantom = require('phantom');
	const cheerio = require('cheerio');
	const instance = await phantom.create();
	const page = await instance.createPage();
	var i = 0;
	page.on('onUrlChanged', async function(url){
		console.info('.');
		i++;
		if(i === 2){
			await page.evaluate(function(){
				var base = document.createElement('base');
				base.href = 'http://jwc.dgut.edu.cn/jyk/student.asp';
				document.head.insertBefore(base, document.head.firstChild);
				$(function(){
					$('a:contains(教学质量评价)')[0].click();
				})

			});
		}else if(i === 3){
			await page.evaluate(function(){
				var base = document.createElement('base');
				base.href = 'http://jwc.dgut.edu.cn/jyk/student.asp';
				document.head.insertBefore(base, document.head.firstChild);
				$(function(){
					if($('a:contains(进行评价)')[0])
						$('a:contains(进行评价)')[0].click();

				})

			});
		}else if(i === 4){
			await page.evaluate(function(){
				var base = document.createElement('base');
				base.href = 'http://jwc.dgut.edu.cn/jyk/student.asp';
				document.head.insertBefore(base, document.head.firstChild);

				$(function(){
					var radios = document.querySelectorAll('input[type="radio"]');
					radios[0].setAttribute('checked', true);
					radios[5].setAttribute('checked',true);
					radios[8].setAttribute('checked',true);
					radios[9].setAttribute('checked',true);
					radios[14].setAttribute('checked',true);
					radios[17].setAttribute('checked',true);
					radios[18].setAttribute('checked',true);
					radios[23].setAttribute('checked',true);
					radios[24].setAttribute('checked',true);
					radios[29].setAttribute('checked',true);
					radios[30].setAttribute('checked',true);
					var checkboxs = document.querySelectorAll('input[type="checkbox"]');
					for(var index = 0; index < checkboxs.length; index++)
						checkboxs[index].setAttribute('checked',true);
					checkboxs[4].removeAttribute('checked');
					checkboxs[10].removeAttribute('checked');
					checkboxs[19].removeAttribute('checked');
					checkboxs[26].removeAttribute('checked');
					document.querySelector('input[type="submit"]').click();
				})

			});
			// setTimeout(async function(){
			// 	const content = await page.property('content');

			// 	const server = http.createServer(function(req,res){
			// 		res.statusCode = 200;
			// 		res.setHeader('Content-Type', 'text/html;charset=UTF-8');
			// 		res.end(content);
					
			// 	});
			// 	if(server.listening)
			// 		server.close();
			// 	server.listen(port, hostname, function(){
			// 	  console.log('服务器运行在 http://${hostname}:${port}/');
			// 	});
			// },3000);
			
		}else if(i === 5){
			await page.evaluate(function(){
				var base = document.createElement('base');
				base.href = 'http://jwc.dgut.edu.cn/jyk/student.asp';
				document.head.insertBefore(base, document.head.firstChild);
				$(function(){
					$('a:contains([返回选课列表])')[0].click();
				})
			});
			i = 2;
		}
		

	});
	page.property('onConsoleMessage', function(msg){
		console.log(msg);
	});
	page.property('customHeaders ' ,{
		'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.2669.400 QQBrowser/9.6.10990.400',
		'Host':'jwc.dgut.edu.cn',
		'Upgrade-Insecure-Requests':1,
		'Origin':'https://cas.dgut.edu.cn',
		'Referer':'https://cas.dgut.edu.cn/User/Login?ReturnUrl=%2f%3fappid%3djyk&appid=jyk',
		'Content-Type':'application/x-www-form-urlencoded'
	});
	
	await page.open(url, function(status){
		console.log(status)
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

open('https://cas.dgut.edu.cn/User/Login?ReturnUrl=%2f%3fappid%3djyk&appid=jyk');