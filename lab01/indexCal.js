const express = require('express');
const cal = require('./calculator');

const app = express();
const port = 3000;
app.get('/add', (req, res) => {
	let rs = 0;
	let numberA = parseInt(req.query.a);
	let numberB = parseInt(req.query.b);
	rs = cal.add(numberA, numberB);
	res.json(rs)
})
app.listen(port, () => {
	console.log(`Ung dung chay voi port: ${port}`);
})

