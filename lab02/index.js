const express = require('express');
var bbodyParser = require('body-parser');
const app = express();
const port = 3000;

// app.use(bbodyParser.urlencoded("/lab02/public"));

//Khai bao su dung template ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + '/public'));
console.log("dirname = " + __dirname)

//upload ảnh
var multer = require('multer');
//khai báo sử dụng multer
// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})
var upload = multer({ storage: storage })

// thêm product
app.post('/add', upload.single('productImage'), (req, res) => {
	//lấy dữ liệu từ form sau khi upload anh
	const file = req.file
	let title = req.body.productName;
	let price = req.body.price;
	let description = req.body.description;
	let nameImage = "product01.gif";
	if (file != null) {
		nameImage = file.filename;
	}

	//Thêm vào mảng json 1 cuối sách mới
	listProduct.push({
		id: listProduct.length + 1,
		title: title,
		price: price,
		description: description,
		imageURL: nameImage,
	})
	//chuyển về trang sản phẩm
	res.redirect('/product');
});

//data
var listProduct = [
	{
		id: 0101,
		title: 'Apple Book',
		price: 3000,
		description: "A very interesting book about so many even more interesting things!",
		imageURL: "product01.gif",
	},
	{
		id: 0102,
		title: 'Microsoft Book',
		price: 2000,
		description: "A very interesting book about so many even more interesting things!",
		imageURL: "product02.gif",
	},
	{
		id: 0103,
		title: 'VFast Book',
		price: 1000,
		description: "A very interesting book about so many even more interesting things!",
		imageURL: "product03.gif",
	}
];


//router
app.get("/", (req, res) => {
	let today = new Date();
	curentDay = today.getDay();
	let day = "";

	switch (curentDay) {
		case 0:
			day = "Chu Nhat"
			break;
		case 1:
			day = "Thu Hai"
			break;
		case 2:
			day = "Thu Ba"
			break;
		case 3:
			day = "Thu Tu"
			break;
		case 4:
			day = "Thu Nam"
			break;
		case 5:
			day = "Thu Sau"
			break;
		case 6:
			day = "Thu Bay"
			break;
		default:
			console.log(`Error: ${curentDay}`);
	}
	res.render('home', { kindOfDay: day });
})

app.get("/product", (req, res) => {
	res.render('product', { products: listProduct });
})

app.get("/add", (req, res) => {
	res.render('add-product', { products: listProduct });
})

app.get("/product-detail", (req, res) => {
	console.log("product detail")
	let id = req.query.id;
	console.log(id)
	let product = listProduct.find(item => item.id == id);
	res.render('product-details', { product: product });
})

app.listen(port, () => {
	console.log(`Ung dung chay voi port: ${port}`);
})

