var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serProjectDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 전체 프로젝트 불러오기
router.get('/', wrapper(async function(req, res, next) {
    
    let f = await db.readProject();
    res.send(f);
    
}));

// 프로젝트 만들기
router.post('/createProject', function(req, res) {

    let f = db.createProject(req);
    res.send(f);

});

// 인기 상품 불러오기
router.get('/bestprojectlist',wrapper(async  function(req, res) {

    let f = await db.bestProjectList(req);
    res.send(f);

}));

// 신규 상품 불러오기
router.get('/newprojectlist',wrapper(async  function(req, res) {

    let f = await db.newprojectlist(req);
    res.send(f);

}));


module.exports = router;
