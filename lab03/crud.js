let express = require('express');
var bodyParser = require('body-parser');
let app = express();
let port = 3000;

//Khai bao su dung template ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + '/public'));
console.log("dirname = " + __dirname)


// add module mysql 
let mysql = require('mysql');
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'bookstore'	//tên database
});


//router
app.get("/", (req, res) => {
	res.render('home');
})

app.get("/tablecreate", () => {
	var sql = `CREATE TABLE books (
			id INT(11) AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(255), 
			slug VARCHAR(255),
			price float, 
			description VARCHAR(4000),
			imageURL VARCHAR(255),
			showhide BOOLEAN,
			idCat INT(11)
		)`;
	db.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
});

app.get("/addbook", (req, res) => {  //Cách 1
	let sql = `insert into books(title, price) values("Lĩnh Nam Chích Quái",350000)`;
	db.query(sql, function (err, data) {
		if (err) throw err;
		res.send(data); // data chứa thông tin: số dòng chèn ...
	});
});

app.get("/bookadd", (req, res) => {  //Cách 2
	var b = { title: 'Ngự Dược Nhật Ký', price: '147000', slug: 'ngu-duoc-nhat-ky' }
	db.query("insert into books SET ? ", b, function (err, data) {
		if (err) throw err;
		res.send(data);
	});
});

app.get("/addbook2", (req, res) => {
	let ten = req.query['title'];
	let gia = req.query['price'];
	let slug = req.query['slug'];
	let b = { title: ten, price: gia, slug: slug }
	db.query('insert into books SET ?', b, function (err, data) {
		if (err) throw err;
		res.redirect('/');
	});
})

app.get("/books", (req, res) => {
	let sql = `SELECT title, price, slug FROM books`;
	db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
		if (err) throw err;
		console.log(data)
		res.render('books', { listbooks: data }); //nạp view và truyền dữ liệu cho view
	});
});

app.get("/book/:id", (req, res) => {
	let id = req.params.id; //lấy giá trị tham số
	id = parseInt(id, 10); //ép kiểu thành số nguyên, dùng hệ số 10
	let sql = `SELECT * FROM books where id=${id}`;
	db.query(sql, function (err, data) { //data sẽ chứa dữ liệu
		if (err) throw err;
		app.set("view engine", "ejs"); //khai báo view sẽ dùng, có thể bỏ qua
		app.set("views", "./views"); //khai báo folder chứa wiew, có thể bỏ qua
		console.log(data);
		res.render("book", { book: data[0] }); //nạp view và truyền tham số
	});
});

app.get("/delBook/:id", (req, res) => {
	let id = req.params.id;
	db.query("DELETE FROM books WHERE id = ?", [id], function (err, data) {
		if (err) throw err;
		if (data.affectedRows == 0) console.log(`Không có id book để xóa: ${id}`);
		res.redirect('/books');
	}
	)
});

app.get("/updatelBook/", (req, res) => {
	let id = req.query.id;
	let t = req.query.title;
	let p = req.query.price;
	db.query(`UPDATE books SET title=?,price=? WHERE id = ?`, [t, p, id],
		function (err, data) {
			if (err) throw err;
			if (data.affectedRows == 0) {
				console.log(`Không có id book để cập nhật: ${id}`);
			}
			res.redirect('/books');
		})
});














app.listen(port, () => {
	console.log(`Ung dung chay voi port: ${port}`);
})