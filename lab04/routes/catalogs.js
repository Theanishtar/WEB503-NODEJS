let express = require('express');
let controllerCatalog = require('../controller/catalogs');
let router = express.Router();

//router.get('/', controllerCatalog.getCatalog);
router.get('/addnew', controllerCatalog.addNew);

router.get('/', function (req, res, next) {
	controllerCatalog.getCatalog;
});

module.exports = router;
