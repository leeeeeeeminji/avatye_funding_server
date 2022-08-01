var express = require('express');
var router = express.Router();
const moment = require("moment");
const db = require('./../DB/serUser');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

/* 유저 조회 */
router.get('/', wrapper(async function(req, res, next) {
  const f = await db.readUser(adsasd);
  res.send(f);
}));

// 회원 가입
router.post('/join',function(req,res){
  const rb = req.body;
  const today = moment();

  // 회원가입 시 소셜 하나만 들어오기 때문에 안들어온 나머지는 Null 처리
  if(rb.userKakao === undefined){
    rb.userKakao = "";
  }

  if(rb.userNaver === undefined){
    rb.userNaver = "";
  }

  if(rb.userFacebook === undefined){
    rb.userFacebook = "";
  }

  const userInfor = {
    userProfile: rb.userProfile,
    userNickName: rb.userNickName,
    userAddress: rb.userAddress,
    userDate: today.format("YYYY-MM-DD"),
    userComent: rb.userComent,
    userWebsite: rb.userWebsite,
    userEmail: rb.userEmail,
    userPassword: rb.userPassword,
    userPhone: rb.userPhone,
    userKakao: rb.userKakao,
    userFacebook: rb.userFacebook,
    userNaver: rb.userNaver,
    userBasicAddress: rb.userBasicAddress
  }

  db.join(userInfor);
  res.send("Join OK");

})



module.exports = router;
