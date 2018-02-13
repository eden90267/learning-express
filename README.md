# 學習 Express

## Express 框架介紹

> Node.js 輕量型 web 應用框架

### 資料庫：

- firebase
- mongo
- mysql

### Template：

- EJS
- Jade (Pug)

## Express 環境安裝

```shell
mkdir project
cd project
npm init -y
npm i express --save
```

## 開啟 web 伺服器

```javascript
// app.js
var express = require('express');
var app = express(); // 取得 express 所有功能

app.get('/', function (req, res) {
  // res.send('1234'); // 傳送資料
  res.send('<html><head></head><body><h1>Hi!</h1></body></html>');
});

// 監聽 port
var port = process.env.PORT || 3000; // 雲端伺服器會預設幫你找一個 port
app.listen(port);
```

```shell
node app.js
```

## 網址規則介紹

設計 router 路由：

http 傳輸協定 + sub domain + domain + PORT + 路徑 + 參數 (Query)

## 路由設計

### 固定網址路徑

```javascript
app.get('/user/edit-profile', function (req, res) {
  res.send('<html><head></head><body><h1>profile</h1></body></html>');
});

app.get('/user/edit-photo', function (req, res) {
  res.send('<html><head></head><body><h1>photo</h1></body></html>');
});
```

### 動態網址路徑

路徑帶 參數 給 node.js 取得資料後跟資料庫溝通，完成後在 render 結果

## params - 取得指定路徑

```javascript
app.get('/user/:name', function (req, res) {
  var myName = req.params.name;
  if (myName !== 'tim') {
    res.send(`<html><head></head><body><h1>查無此人</h1></body></html>`);
  } else {
    res.send(`<html><head></head><body><h1>${myName}</h1></body></html>`);
  }
});
```

## query - 取得網址參數

```javascript
// 某某人音樂列表，抓前 10 筆
app.get('/user/:name', function (req, res) {
  var myName = req.params.name;
  var limit = req.query.limit;
  var q = req.query.q;
  res.send(`<html><head></head><body><h1>${myName}想要找關鍵字叫做${q}的資料，是要找前${limit}筆資料</h1></body></html>`);
});
```

## middleware - 中介軟體

守門員，在裡面設立一些邏輯。可接收 req、res、next，安全的人就讓它進入到下一個關卡
(`next();`)，next() 一定要加上，不然網頁會卡住。

```javascript
app.get('/', function (req, res) {
  res.send('<html><head></head><body><h1>index</h1></body></html>');
});

app.use(function (req, res, next) {
  console.log('有人進來了');
  next();
});

app.use(function (req, res, next) {
  console.log('已驗證是登入狀態');
  next();
});

app.get('/user', function (req, res) {
  res.send('<html><head></head><body><h1>user</h1></body></html>');
});
```

### 404 路由設定

```javascript
app.get('/', function (req, res) {
  res.send('<html><head></head><body><h1>index</h1></body></html>');
});

app.use(function (req, res, next) {
  console.log('有人進來了');
  kk();
  next();
});

app.use(function (req, res, next) {
  res.status(404).send('抱歉，您的頁面找不到');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('程式有些問題，請稍候再試');
});
```

### 中介使用種類

```javascript
var login = function (req, res, next) {
  var _url = req.url;
  if (_url !== '/') {
    next();
  } else {
    res.send('你的登入資料有錯！');
  }
};

// app.use(login);

app.get('/', login, function (req, res) {
  res.send('<html><head></head><body><h1>index</h1></body></html>');
});
```

## static - 載入靜態資源

```javascript
// 增加靜態檔案的路徑
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('<html><head></head><body><img src="/images/logo.png"></body></html>');
});
```

## EJS - 語言介紹

- 是一個 template
- 30 頁 .html 要改 header 一個連結就得改 30 頁，但 HTML template
  就可以優雅的修改一個共用畫面
