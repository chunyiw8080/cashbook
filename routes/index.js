const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync(__dirname + '/../data/db.json');
const db = low(adapter);

const shortid = require('shortid');

var express = require('express');
var router = express.Router();

//记账本的列表
router.get('/account', function(req, res, next) {
  //获取所有账单信息
  let accounts = db.get('accounts').value();
  console.log(accounts);
  res.render('list', {accounts: accounts});
});

//添加记录表单
router.get('/account/create', function(req, res, next) {
  res.render('create');
});

//添加记录 - 写入数据库
router.post('/account', function(req, res, next) {
  //生成id
  let id = shortid.generate();
  //...req.body: 结构赋值
  db.get('accounts').unshift({id: id, ...req.body}).write();
  //成功提醒
  res.render('success',{msg: '添加成功！', url: '/account'});
});

//删除记录
router.get('/account/:id', (req, res) => {
  //获取paramas中的id参数
  let id = req.params.id;
  //删除
  db.get('accounts').remove({id: id}).write();
  res.render('success',{msg: '删除成功', url: '/account'});
});
module.exports = router;
