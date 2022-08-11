const { query } = require('express');
var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serMainDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 메인 화면 주목할만한 프로젝트
router.get('/pointproject', wrapper(async function(req, res) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    if(toke !== undefined){
    // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
    const msg = await middle.verifyToken(toke);
    // 에러 발생 시 res로 에러 반환
    if (msg.code) {
        console.log(msg.code + " : " + msg.massage);
        return res.send({ err: msg.code + " : " + msg.massage });
    } else {
        // 유저 DIV 값으로 DB에서 정보 읽어오기
        console.log(msg.userDIV);
        let f = await db.mdProject(msg.userDIV);
        return res.send(f);
    }
}else{
    console.log("토큰 없음");
    let f = await db.mdProject();
    return res.send(f);
}

}));


// 메인 화면 인기 프로젝트
router.get('/bestproject', wrapper(async function(req, res) {
    
    let f = await db.bestProject();
    res.send(f);
    
}));

module.exports = router;
