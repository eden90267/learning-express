var express = require('express');
var router = express.Router(); // 可以把路由資訊都先寫入


router.get('/edit-profile', function (req, res) {
  res.send('profile');
});
router.get('/photo', function (req, res) {
  res.send('photo');
});
router.get('/card', function (req, res) {
  res.send('card');
});

module.exports = router;