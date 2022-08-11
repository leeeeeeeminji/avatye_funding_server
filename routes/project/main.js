var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serMainDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;



// 메인 화면 주목할만한 프로젝트
router.get('/pointproject', wrapper(async function(req, res) {
    wrapper( async function query(){
        let f = await db.mdProject();
        return res.send(f);
    });

    heartToken(req,res,query);

}));

// 메인 화면 인기 프로젝트
router.get('/bestproject', wrapper(async function(req, res) {
    
    let f = await db.bestProject();
    res.send(f);
    
}));

module.exports = router;
