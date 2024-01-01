//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    uuid: String,
    reg_date: Date
});

//创建模型对象  对文档操作的封装对象
let userModel = mongoose.model('users', userSchema);

//暴露模型对象
module.exports = userModel;