var express = require('express');
var app = express(); // 取得 express 所有功能

// 增加靜態檔案的路徑
app.use(express.static('public'));

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('views', './views'); // set()：各種 express 設定的方式
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {
    'show': true,
    'title': '<h1>六角學院</h1>',
    'boss': 'liao'
  });
});
app.get('/user', function (req, res) {
  res.render('user');
});








// 404
app.use(function (req, res, next) {
  res.status(404).send('抱歉，您的頁面找不到');
});
// 500
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('程式有些問題，請稍候再試');
});

// 監聽 port
var port = process.env.PORT || 3000;
app.listen(port);

