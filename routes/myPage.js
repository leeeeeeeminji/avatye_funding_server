var express = require('express');
var router = express.Router();
const db = require('../DB/serMypageDB');
const middle = require('../middleware/userMiddleWare');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

/* mypage 조회 comment 반환 */
router.get('/', wrapper(async function (req, res) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
    const msg = await middle.verifyToken(toke);
    // 에러 발생 시 res로 에러 반환
    if (msg.code) {
        console.log(msg.code + " : " + msg.massage);
        return res.send({ err: msg.code + " : " + msg.massage });
    } else {
        // 유저 DIV 값으로 DB에서 정보 읽어오기
        console.log(msg.userDIV);
        const userComment = await db.myPageComment(msg.userDIV);
        return res.send(userComment[0]);
    }
}));

/* mypage 조회 올린 프로젝트 정보 반환 */
router.get('/upload', wrapper(async function (req, res) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
    const msg = await middle.verifyToken(toke);
    // 에러 발생 시 res로 에러 반환
    if (msg.code) {
        console.log(msg.code + " : " + msg.massage);
        return res.send({ err: msg.code + " : " + msg.massage });
    } else {
        // 유저 DIV 값으로 DB에서 정보 읽어오기
        console.log(msg.userDIV);
        const upLoadProject = await db.myUploadProject(msg.userDIV);
        return res.send(upLoadProject);
    }
}));

/* mypage 조회 구매한 프로젝트 정보 반환 */
router.get('/buy', wrapper(async function (req, res) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
    const msg = await middle.verifyToken(toke);
    // 에러 발생 시 res로 에러 반환
    if (msg.code) {
        console.log(msg.code + " : " + msg.massage);
        return res.send({ err: msg.code + " : " + msg.massage });
    } else {
        // 유저 DIV 값으로 DB에서 정보 읽어오기
        console.log(msg.userDIV);
        const buyProject = await db.myBuyProject(msg.userDIV);
        return res.send(buyProject);
    }
}));

// 토큰 검증 테스트 / 테스트 중
router.get('/token', wrapper(async function (req, res, next) {
    const f = await middle.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwidXNlckRJViI6Imw2ZGE0aHg0IiwiaWF0IjoxNjU5NTE0MDA5LCJleHAiOjE2NTk1MTQwNjksImlzcyI6Imw2ZGE0aHg0In0.0FJrWV28KYHfWtT7uLRzs92SjnR2PP0vUxLkiTZUyPE");
    console.log(f);
    res.send(f);
}));


module.exports = router;
