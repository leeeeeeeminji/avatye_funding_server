var express = require('express');
var router = express.Router();
const db = require('../DB/serUserDB');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

/* 유저 조회 */
router.get('/', wrapper( async function(req, res, next) {
  const f = await db.readUser(adsasd);
  res.send(f);
}));



module.exports = router;
