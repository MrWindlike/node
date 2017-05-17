const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DB_CONN_STR = 'mongodb://localhost:27017/Wechat'; 
 
const insertData = function(collection, data, callback) {  

    //插入数据
    collection.insertOne(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}

const searchData = function(collection, data, callback) {

    //查询数据
    collection.find(data).toArray(function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }    
        console.log(result);
        //callback(result);
    });
}

const deleteData = function(collection, data, callback = function(){}){
    //删除数据
    collection.removeMany(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }    
        callback(result);
    });
}

const updateData = function(collection, data, callback){
    //删除数据
    collection.updateOne(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }    
        console.log(result);
        callback(result);
    });
}
 
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    const data = {'name': 'a'};
    /*insertData(db.collection('Wechat'), data, function(result) {
        console.log('插入成功!');
        db.close();
    });*/
    //db.collection('Article').drop();
    deleteData(db.collection('Wechat'), data);
    searchData(db.collection('Wechat'), {}, function(result){
        console.log(result);
        db.close();
    });
});