var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serHeartDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 좋아요 추가 / 삭제
router.get('/add/:id', wrapper(async function(req, res) {
    proIndex = req.params.id;
        // 토큰 가져오기
        const toke = req.get('user_token');
        // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
        const msg = await middle.verifyToken(toke);
        // 에러 발생 시 res로 에러 반환
        if (msg.code) {
            console.log(msg.code + " : " + msg.massage);
            return res.send({ err: msg.code + " : " + msg.massage });
        } else {
            console.log(msg.userDIV);
            let f = await db.heart(msg.userDIV,proIndex);
            return res.send(f[0][0]);
        }
}));

// 찜 목록
router.get('/list', wrapper(async function(req, res) {
    proIndex = req.params.id;
        // 토큰 가져오기
        const toke = req.get('user_token');
        // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
        const msg = await middle.verifyToken(toke);
        // 에러 발생 시 res로 에러 반환
        if (msg.code) {
            console.log(msg.code + " : " + msg.massage);
            return res.send({ err: msg.code + " : " + msg.massage });
        } else {
            console.log(msg.userDIV);
            let f = await db.heartList(msg.userDIV);
            return res.send(f);
        }
}));

module.exports = router;
