const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_CONN_STR = 'mongodb://admin:admin@localhost:27017/Wechat'; 

module.exports =  class Mongodb{
    constructor(url){
        this.url = url;
    }

    insertData(collect, data={}, callback=function(){}) { 
        var _this = this; 
        MongoClient.connect(_this.url, (err, db) => {
            if(db){
                db.collection(collect).insertOne(data, function(err, result) { 
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }
                    console.log('Insert Success');
                    db.close();
                    callback(result);
                });
            }
            else
                console.log(err);
        });
    }

    async searchData({collect, data = {}, index = {}, limitNum = 0,skipNum = 0,callback = function(){}}) {
        var _this = this;
        //查询数据
       await MongoClient.connect(_this.url, function(err, db){
            if(db){
                db.collection(collect).find(data, index).limit(limitNum).skip(skipNum).toArray(function(err, result) { 
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }    
                    console.log(result);
                    db.close();
                    callback(result);
                });
            }
            else
                console.log(err);
        });
    }

    deleteData(collect, data={}, callback = function(){}){
        var _this = this;
        //删除数据
        MongoClient.connect(_this.url, function(err, db){
            if(db){
                db.collection(collect).removeMany(data, function(err, result) { 
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }    
                    console.log('Delete Success');
                    db.close();
                    callback(result);
                });
            }
            else
                console.log(err);
        });
    }

    updateData({collect, data={}, set={}, callback = function(){}}){
        var _this = this;
        //更新数据
        MongoClient.connect(_this.url, function(err, db){
            if(db){
                db.collection(collect).updateOne(data, {$set:set},  function(err, result) { 
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }    
                    console.log('Update Success');
                    db.close();
                    callback(result);
                });
            }
            else
                console.log(err);
        });
    }

    count(collect, data = {}, callback = function(){}){
        var _this = this;
        MongoClient.connect(_this.url, function(err, db){
            db.collection(collect).count(data, function(err, count){
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }   
                    db.close();
                    callback(count);
            });
        });
    }
}

/*const Mongodb = require('./mongodb.js');

var db = new Mongodb(DB_CONN_STR);
db.count('article',{},function(count){
    db.updateData({collect:'Wechat', data:{name:'thisismissf'}, set:{num:count}});
})*/



