var express = require('express');
var app = express(); // 取得 express 所有功能

// 增加靜態檔案的路徑
app.use(express.static('public'));

var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('views', './views'); // set()：各種 express 設定的方式
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');

// 增加 body 解析
app.use(bodyParser.json()); // 支援 json
app.use(bodyParser.urlencoded({extended: false})); // 支援傳統表單格式：解析表單內容資料，讓表單順利抓出 name 的資料

// 路由
app.get('/', function (req, res) {
  res.send('你現在進入的東西是到首頁');
  console.log('有人造訪首頁！');
});

app.get('/search', function (req, res) {
  res.render('search');
});

app.post('/searchList', function (req, res) {
  console.log(req.body);
  // 轉址
  res.redirect('search'); // 用 res.render('search')，網址會變成 /searchList，它是看路由來決定網址，所以需要用 res.redirect('search') 轉指到 search 頁去
});

app.post('/searchAJAX', function (req, res) {
  console.log(req.body);
  console.log(req.body.list[2]);
  res.send('hello!');
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

