const phantom = require('phantom');

(async function(){
	const instance = await phantom.create();
	const page = await instance.createPage();

})()