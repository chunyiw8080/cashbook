const mongo = require('../../db/crud');
const moment = require('moment');
const express = require('express');
const cashbookModel = require('../../models/cashbookModel');
const checkLoginMiddleware = require('../../middleware/checkLoginMiddleware');

var router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/account');
});

//记账本的列表
router.get('/account', checkLoginMiddleware, async function(req, res) {
  try{
    var data = await mongo.findRecords(cashbookModel, null, cashbookModel.find, {time: -1});
  }catch(err){
    res.status(500).send('读取失败');
    return;
  }
  
  res.render('list', {accounts: data, moment: moment});
});

//添加记录表单
router.get('/account/create', checkLoginMiddleware, function(req, res) {
  res.render('create');
});

//添加记录 - 写入数据库
router.post('/account', checkLoginMiddleware, function(req, res) {
  try{
    mongo.createNewRecord(cashbookModel, {...req.body, time: moment(req.body.time).toDate()}); 
  }catch(err){
    res.status(500).send('插入失败');
    return;
  }
  
  res.render('success',{msg: '添加成功！', url: '/account'});
});

//删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  //获取paramas中的id参数
  let id = req.params.id;
  //删除
  try{
    mongo.deleteRecords(cashbookModel, {_id: id}, cashbookModel.deleteOne);
  }catch(err){
    res.status(500).send('删除失败');
    return;
  }
  res.render('success',{msg: '删除成功', url: '/account'});
});

module.exports = router;
