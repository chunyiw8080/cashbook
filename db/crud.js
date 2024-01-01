const db = require('./db');

db();

/**
 * 
 * @param {*} model 文档对象模型
 * @param {*} record 新的文档数据
 */
async function createNewRecord(model, record){
    try{
        const data = await model.create(record);
        //console.log(data);
        return data;
    }catch (err){
        console.log(err);
    }
} 

/**
 * 
 * @param {*} model 文档对象模型
 * @param {*} query 查询条件
 * @param {*} deleteFunction 删除方法
 */
async function deleteRecords(model, query, deleteFunction){
    try{
        const data = await deleteFunction.call(model, query);
        return data;
    }catch(err){
        console.log(err);
    }
}

/**
 * 
 * @param {*} model 文档对象模型
 * @param {*} query 查询条件
 * @param {*} update 文档更新方法
 * @param {*} newRecord 更新后的记录
 */
async function updateRecords(model, query, update, newRecord){
    try{
        const data = await update.call(model, query, newRecord);
        return data;
    }catch(err){
        console.log(err);
    }
}

/**
 * 
 * @param {*} model 文档对象模型
 * @param {*} query 查询条件
 * @param {*} search 检索方法
 * @param {*} sortCondition 排序方法
 * @returns 
 */
async function findRecords(model, query, search, sortCondition){
    try{
        const data = await search.call(model, query).sort(sortCondition);
        //console.log(data);
        return data;
    }catch(err){
        console.log('读取失败: ', err);
        return;
    }
}

module.exports = {createNewRecord, deleteRecords, updateRecords, findRecords};