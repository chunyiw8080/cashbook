const jwt = require('jsonwebtoken');

const key = 'atguigu';
const {secret} = require('../config/config');

module.exports = (req, res, next) => {
    let token = req.get('token');
    if(!token){
        return res.json({code: '2003', msg: 'token缺失', data: null});
    }
    jwt.verify(token, secret, async (err, data) => {
        if(err){
            res.json({code: '2004', msg: 'token校验失败', data: null});
            return;
        }
        req.user = data;
        next();
    });
}