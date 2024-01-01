/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
module.exports = function(success, error){
    if (typeof error !== 'function'){
        error = function(){
            console.log('链接失败');
        }
    }
    //导入Mongoose包
    const mongoose = require('mongoose');
    //导入配置
    const {dbHost, dbPort, dbName} = require('../config/config');
    //链接MongoDB
    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

    //设置回调
    mongoose.connection.once('open', () => {
        success();
    });
    mongoose.connection.once('error', () => {
        error();
    });
    mongoose.connection.once('close', () => {
        console.log('和数据库的链接中断');
    });

}