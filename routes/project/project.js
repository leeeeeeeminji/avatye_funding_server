var express = require('express');
var router = express.Router();
const db = require('../../DB/project/serProjectDB');
const wrap = require('../../util/wrapper');
const middle = require('../../middleware/userMiddleWare');
const wrapper = wrap.wrapper;

// 찜 목록 나타내는 부분 모듈화 처리
const readHeart = wrapper(async function (req, res, query) {
    // 토큰 가져오기
    const toke = req.get('user_token');
    if (toke !== undefined) {
        // 토큰 가져온 후 검증 - 에러 코드 or 유저 판별 DIV 반환
        const msg = await middle.verifyToken(toke);
        // 에러 발생 시 res로 에러 반환
        if (msg.code) {
            console.log(msg.code + " : " + msg.massage);
            return res.send({ err: msg.code + " : " + msg.massage });
        } else {
            // 유저 DIV 값으로 DB에서 정보 읽어오기
            console.log(msg.userDIV);
            query(msg.userDIV);
        }
    } else {
        console.log("토큰 없음");
        query(msg.userDIV);
    }
})



// 전체 프로젝트 불러오기
router.get('/', wrapper(async function (req, res, next) {
    const query = async function(userDIV){
        let f = await db.readProject(userDIV);
        res.send(f);
    }

    readHeart(req,res,query);


}));

// 프로젝트 만들기
router.post('/createProject', wrapper (async function (req, res) {
    const rb = req.body;  

    let f = await db.createProject(rb);
    res.send(f);

    // let f = db.createProject(req);
    // res.send(f);

}));

// 인기 상품 불러오기
router.get('/bestprojectlist', wrapper(async function (req, res) {
    const query = async function(userDIV){
        let f = await db.bestProjectList(userDIV);
        res.send(f);
    }

    readHeart(req,res,query);

}));

// 신규 상품 불러오기
router.get('/newprojectlist', wrapper(async function (req, res) {
    const query = async function(userDIV){
        let f = await db.newprojectlist(userDIV);
        res.send(f);
    }

    readHeart(req,res,query);


}));

// 마감 임박 상품 불러오기
router.get('/deadlineprojectlist', wrapper(async function (req, res) {
    const query = async function(userDIV){
        let f = await db.deadlineprojectlist(userDIV);
        res.send(f);
    }

    readHeart(req,res,query);

}));

// 공개 예정 상품 불러오기
router.get('/tobeprojectlist', wrapper(async function (req, res) {

    let f = await db.tobeprojectlist(req);
    res.send(f);

}));

module.exports = router;
