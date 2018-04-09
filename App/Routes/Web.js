var express = require('express')
var router = express.Router();
var path = require ('path');
var qHandler = require(path.join('../Controller/Questions'));

router.get('/', qHandler.render);

router.post('/', qHandler.handlePost);

module.exports = router