var express = require('express');
var router = express.Router();
const db = require('./../DB/serProduct');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

/* GET users listing. */
router.get('/', wrapper(async function(req, res, next) {
    
    let f = await db.readProduct();
    res.send(f);
    
}));

module.exports = router;
