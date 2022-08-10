var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serCategoryDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;


// 메인 화면 주목할만한 프로젝트
router.get('/', wrapper(async function(req, res) {
    
    let f = await db.readCategory();
    res.send(f);
    
}));

module.exports = router;
