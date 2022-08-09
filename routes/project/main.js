var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serMainDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;


// 메인 화면 주목할만한 프로젝트
router.get('/pointproject', wrapper(async function(req, res) {
    
    let f = await db.mdProject();
    res.send(f);
    
}));

// 메인 화면 인기 프로젝트
router.get('/bestproject', wrapper(async function(req, res) {
    
    let f = await db.bestProject();
    res.send(f);
    
}));

module.exports = router;
