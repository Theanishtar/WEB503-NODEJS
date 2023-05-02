var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/find', function (req, res, next) {
	res.send("<h1>Trang tìm kiếm</h1>")
});

router.get('/prod/:id', function (req, res, next) {
	res.send("<h1>Trang chi tiết sản phẩm</h1>")
});


module.exports = router;
