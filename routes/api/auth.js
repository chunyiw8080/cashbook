var express = require('express');
var router = express.Router();
const mongo = require('../../db/crud');
const userModel = require('../../models/userModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const {secret} = require('../../config/config');
router.post('/login', async function(req, res){
    try{
        let {username, password} = req.body;
        let data = await mongo.findRecords(userModel, {username: username, password: md5(password)}, userModel.findOne, null);
        
        if(!data){
            res.json({code: '2002', msg: '用户名或密码错误', data: null});
            return;
        }
        //创建当前用户的token
        let token = jwt.sign(
            {username: data.username, _id: data._id}, 
            secret, 
            {expiresIn: 60 * 60 * 24}
        );
        //响应token
        res.json({code: '0000', msg: '登录成功', data: token});
        //res.render('success', {msg: '登录成功', url: '/account'});
    }catch(err){
        console.log(err);
        res.json({code: '2001', msg: '数据库读取失败', data: null});
        return;
    }   
});

router.post('/logout', function(req, res){
    req.session.destroy(() => {
        res.render('success', {msg: '已退出', url: '/login'});
    });
});

module.exports = router;