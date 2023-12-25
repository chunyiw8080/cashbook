const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
//获取db对象
const db = low(adapter)

//初始化数据
//posts: 空数据 user: 空对象
db.defaults({ posts: [], user: {} }).write();

//写入数据
//db.get('posts').push({id: 1, title: 'Hello'}).write();
//插入数据
//db.get('posts').unshift({id: 2, title: 'World'}).write();

//删除数据
//db.get('posts').remove({id: 1}).write();

//更新数据
db.get('posts').find({id: 2}).assign({title: 'Hello World'}).write();
//获取数据
// const result = db.get('posts').value();
// console.log(result);

//获取单条数据
const res = db.get('posts').find({id: 2}).value();
console.log(res);


