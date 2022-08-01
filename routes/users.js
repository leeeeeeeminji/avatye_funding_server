var express = require('express');
var router = express.Router();
//const db = require('./../shopping_DB/serUserDB');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
