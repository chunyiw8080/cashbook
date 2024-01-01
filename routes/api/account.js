const mongo = require('../../db/crud');
const moment = require('moment');
const express = require('express');
const cashbookModel = require('../../models/cashbookModel');
const tokenVerifyMiddleware = require('../../middleware/tokenVerifyMiddleware');

const router = express.Router();

//记账本的列表
router.get('/account', tokenVerifyMiddleware, async function(req, res, next) {
  console.log(req.user);
  try{
    var data = await mongo.findRecords(cashbookModel, null, cashbookModel.find, {time: -1});
  }catch(err){
    res.json({code: '1001', msg: '读取失败', data: null});
    return;
  }
    res.json({code: '0000', msg: '读取成功', data: data});
});

//添加记录 - 写入数据库
router.post('/account', tokenVerifyMiddleware, async function(req, res, next) {
  try{
    var data = await mongo.createNewRecord(cashbookModel, {...req.body, time: moment(req.body.time).toDate()}); 
  }catch(err){
    console.log(err);
    res.json({code: '1001', msg: '创建失败', data: null})
    return;
  }
  res.json({code: '0000', msg: '创建成功', data: data})
});

//删除记录
router.delete('/account/:id', tokenVerifyMiddleware, async function(req, res){
  //获取paramas中的id参数
  let id = req.params.id;
  //删除
  try{
    var data = await mongo.deleteRecords(cashbookModel, {_id: id}, cashbookModel.deleteOne);
  }catch(err){
    res.status(500).send('删除失败');
    return;
  }
  res.json({code: '0000', msg: '删除成功', data: data});
});

router.get('/account/:id', tokenVerifyMiddleware, async function(req, res){
    try{
        let {id} = req.params;
        var data = await mongo.findRecords(cashbookModel, id, cashbookModel.findById, null);
        console.log(data);
    }catch(err){
        return res.json({code: '1001', msg: '查询失败', data: null});
    }
    res.json({code: '0000', msg: '查询成功', data: data});
    
})

router.patch('/account/:id', tokenVerifyMiddleware, async function(req, res){
    try{
        var {id} = req.params;
        await mongo.updateRecords(cashbookModel, {_id: id}, cashbookModel.updateOne, req.body);
    }catch(err){ 
        return res.json({code: '1001', msg: '更新失败', data: null});
    }
    var record = await mongo.findRecords(cashbookModel, id, cashbookModel.findById, null);
    res.json({code: '0000', msg: '更新成功', record: record});
    
})
module.exports = router;