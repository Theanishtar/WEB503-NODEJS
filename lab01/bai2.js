const express = require('express');
const app = express();
const port = 3000;




//router
app.get('/', (req, res) => {
	res.send('<p>Day la trang home</p>');
});
app.get('/product/:id/:name', (req, res) => {
	// res.send('<p>Day la trang home</p>');
	// console.log(req.params.id);
	// console.log(req.params.name);
	res.json(req.query)

});
app.get('/product', (req, res) => {
	res.json(req.query)
});

app.listen(port, () => {
	console.log(`Ung dung chay voi port: ${port}`);
})