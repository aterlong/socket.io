var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Socket.IO 聊天服务器' });
});

module.exports = router;
