var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serMypageDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
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

/* mypage 조회 닉네임, 사진 , 가입한 날짜 정보 반환 */
router.get('/profile', wrapper(async function (req, res) {
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
        const userComment = await db.myProfile(msg.userDIV);
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

/* mypage 조회 올린 프로젝트 수 반환 */
router.get('/uploadcount', wrapper(async function (req, res) {
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
        const upLoadCount = await db.myUploadCount(msg.userDIV);
        return res.send(upLoadCount[0]);
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

/* mypage 구매한 프로젝트 수 반환 */
router.get('/buycount', wrapper(async function (req, res) {
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
        const upLoadCount = await db.myBuyCount(msg.userDIV);
        return res.send(upLoadCount[0]);
    }
}));

module.exports = router;
