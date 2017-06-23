var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry:  './index.js',
  output: { 
    path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    publicPath: '/dist/',       //模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'index.js',     //每个页面对应的主js的生成配置
  },
  module: {
  	rules : [
  		{
			  test: /\.js$/,
			  loader: 'babel-loader',
			  exclude: /node_modules/,
			  query: {presets: ['es2015']}	
  		}
  	]
  }
}


