//index.js
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, () => { console.log(`Project dang chay o port ${port}`) })