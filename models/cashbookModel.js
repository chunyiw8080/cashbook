//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let cashBookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    time: Date,
    type: {type: Number, default: -1},
    account: {type: Number, required: true},
    remarks: String,
    uuid: String
});

//创建模型对象  对文档操作的封装对象
let cashbookModel = mongoose.model('posts', cashBookSchema);

//暴露模型对象
module.exports = cashbookModel;