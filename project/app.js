var express = require('express');
var app = express(); // 取得 express 所有功能

// 增加靜態檔案的路徑
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('<html><head></head><body><img src="/images/logo.png"></body></html>');
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

