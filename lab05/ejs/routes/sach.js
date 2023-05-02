var express = require('express');
var router = express.Router();
var db = require('./../models/database');
router.get('/', function (req, res, next) {
	//chức năng trả về danh sách các record
	//phương thức request: get
	//lấy ra các record trong table
	//trả về danh sách sách dạng json
	let sql = `SELECT id, tenSach, moTa, urlHinh FROM sach`;
	db.query(sql, function (err, data) {
		res.json(data);
	});
});
router.post('/', function (req, res, next) {
	//chức năng thêm mới record vào table
	//phương thức request: post
	//tiếp nhận dữ liệu gửi trong body request
	//thực hiện chèn record mới vào table 
	//trả về thông báo đã chèn dạng json 
	let data = req.body;
	let sql = 'INSERT INTO sach SET ?';
	db.query(sql, data, (err, d) => {
		if (err) throw err;
		res.json({ "thongbao": "Đã chèn xong sách" });
	});
});
router.get('/:id', function (req, res, next) {
	//chức năng trả về chi tiết 1 record
	//phương thức request: get
	//tiếp nhận id của reord trong url
	//lấy ra record theo id từ table
	//trả về chi tiết record dạng json
	let id = req.params.id;
	let sql = 'SELECT * FROM sach WHERE id = ?'
	db.query(sql, id, (err, d) => {
		res.json(d[0]);
	});
});
router.put('/:id', function (req, res, next) {
	//chức năng cập nhật record trong table 
	//phương thức request: put
	//tiếp nhận dữ liệu gửi trong body request
	//thực hiện cập nhật record vào table 
	//trả về thông báo json đã cập nhật
	let data = req.body;
	let id = req.params.id;
	let sql = 'UPDATE sach SET ? WHERE id = ?';
	db.query(sql, [data, id], (err, d) => {
		if (err) throw err;
		res.json({ "thongbao": 'Đã cập nhật sách' });
	});
});
router.delete('/:id', function (req, res) {
	//chức năng xóa 1 record trong table
	//phương thức request: delete
	//tiếp nhận id trong url
	//thực hiện xóa record
	//trả về thông báo json đã xóa
	let id = req.params.id;
	let sql = 'DELETE FROM sach WHERE id = ?'
	db.query(sql, id, (err, d) => {
		if (err) throw err;
		res.json({ "thongbao": 'Đã xóa thành công' });
	});
});
module.exports = router;