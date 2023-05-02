const express = require('express');
const app = express();
const port = 3000;

//router
app.get('/', (req, res) => {
	res.send('<p>Day la trang home</p>');
});
app.get('/product', (req, res, next) => {
	res.send('<p>Day la trang product</p>');
});
app.get('/add-product', (req, res, next) => {
	res.send('<form action="/product method="POST"> <input type="text" name="productName"> <button type="submit">Add Product</button> </form>');
});


app.listen(port, () => {
	console.log(`Ung dung chay voi port: ${port}`);
})