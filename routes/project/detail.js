var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serDetailDB');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 상품 상세 페이지
router.get('/:id', wrapper(async function(req, res) {
    proIndex = req.params.id;
    let f = await db.datailProject(proIndex);

    res.send(f);
}));

module.exports = router;
