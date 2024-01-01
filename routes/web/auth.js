var express = require('express');
var router = express.Router();
const mongo = require('../../db/crud');
const userModel = require('../../models/userModel');
const md5 = require('md5');

router.get('/reg', (req, res) => {
    res.render('auth/reg');
});

router.post('/reg', async function(req, res){
    console.log(req.body);
    try{
        let data = await mongo.createNewRecord(userModel, {...req.body, password: md5(req.body.password)});
        console.log(data);
    }catch(err){
        console.log(err);
        res.status(500).send('注册失败');
    }
    res.render('success', {msg: '注册成功', url: 'login'});
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async function(req, res){
    try{
        let {username, password} = req.body;
        if(!username || !password){
            return res.send('账号或密码不能为空');
        }
        let data = await mongo.findRecords(userModel, {username: username, password: md5(password)}, userModel.findOne, null);
        
        if(!data){
            return res.send('登录失败，账号或密码错误');
        }
        req.session.username = data.username;
        req.session._id = data._id;
        //console.log(data.username, data._id);
        res.render('success', {msg: '登录成功', url: '/account'});
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
    
});

router.post('/logout', function(req, res){
    req.session.destroy(() => {
        res.render('success', {msg: '已退出', url: '/login'});
    });
});

module.exports = router;
