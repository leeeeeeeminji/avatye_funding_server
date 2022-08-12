var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serFollowDB');
const middle = require('../../middleware/userMiddleWare');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;

// 팔로우 추가 / 삭제
router.get('/add/:id', wrapper(async function(req, res) {
    followedID = req.params.id;
        // 토큰 가져오기
        const toke = req.get('user_token');
        // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
        const msg = await middle.verifyToken(toke);
        // 에러 발생 시 res로 에러 반환
        if (msg.code) {
            console.log(msg.code + " : " + msg.massage);
            return res.send({ err: msg.code + " : " + msg.massage });
        } else {
            let f = await db.follow(msg.userDIV,followedID);
            return res.send(f[0][0]);
        }
}));

// 내 팔로워 목록
router.get('/follower', wrapper(async function (req,res) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
    const msg = await middle.verifyToken(toke);
    // 에러 발생 시 res로 에러 반환
    if (msg.code) {
        console.log(msg.code + " : " + msg.massage);
        return res.send({ err: msg.code + " : " + msg.massage });
    } else {
        let f = await db.followerList(msg.userDIV);
        return res.send(f[0]);
    }
}))

// 내가 팔로우 한 사람 목록
router.get('/following', wrapper(async function (req,res) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
    const msg = await middle.verifyToken(toke);
    // 에러 발생 시 res로 에러 반환
    if (msg.code) {
        console.log(msg.code + " : " + msg.massage);
        return res.send({ err: msg.code + " : " + msg.massage });
    } else {
        let f = await db.followerList(msg.userDIV);
        return res.send(f[0]);
    }
}))

// 내 팔로워 목록
router.get('/anotherfollower/:id', wrapper(async function (req,res) {
        userDIV = req.params.id;
        let f = await db.followerList(userDIV);
        return res.send(f[0]);
}))

// 내가 팔로우 한 사람 목록
router.get('/anotherfollowing/:id', wrapper(async function (req,res) {
        userDIV = req.params.id;
        let f = await db.followerList(userDIV);
        return res.send(f[0]);

}))

module.exports = router;