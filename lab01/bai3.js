const express = require('express');
const app = express();
const port = 3000;

//data
const inventors = [
	{ id: 1, first: "Albert", last: "Einstein", year: 1879, passed: 1995 },
	{ id: 2, first: "Isaac", last: "Newton", year: 1964, passed: 1727 },
	{ id: 3, first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
	{ id: 4, first: "Marie", last: "Curie", year: 1564, passed: 1938 },
	{ id: 5, first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
	{ id: 6, first: "Nicolaus", last: "Copermicius", year: 1473, passed: 1543 },
];


//router
app.get('/', (req, res) => {
	res.send('<p>Day la trang home</p>');
});
app.get('/inventors', (req, res, next) => {
	let list = '<h2>Danh sach cac nha khoa hoc</ul>';
	inventors.forEach(e => {
		list += `<li><a style='text-decoration:none; color:green;' href='/inventors/${e.id}'>${e.last}</a></li>`
	});
	list += '</ul><h2>';
	res.send(list);

});
app.get('/inventors/:id', (req, res) => {
	let id = req.params.id;
	inventor = inventors.find(e => e.id == id);
	infor = `<h2>Thong tin chi tiet nha khoa hoc: Fullname: ${inventor.first} ${inventor.last}, Year: ${inventor.year},
	Passed: ${inventor.passed}</h2>`;
	res.send(infor);
});


app.listen(port, () => {
	console.log(`Ung dung chay voi port: ${port}`);
})