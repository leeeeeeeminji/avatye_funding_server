var express = require('express');
var router = express.Router();
const moment = require("moment");
const db = require('./../DB/serUser');
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;
const axios = require('axios');
const qs = require('qs');
const bcrypt = require('bcrypt');
const saltRounds = 10; //남들이 비밀번호 모르게 하는 일종의 노이즈 / 이 숫자가 많아질수록 시간이 오래걸림

/* 유저 조회 */
router.get('/', wrapper(async function (req, res, next) {
  const f = await db.readUser();
  res.send(f);
}));

// 이메일 회원 가입
router.post('/join', wrapper(async function (req, res) {
  const rb = req.body;

  // 비밀번호 암호화 하기
  const password = await passBcrypt(rb.userPassword);

  let userInfor = {
    profile: rb.userProfile,
    nickName: rb.userNickName,
    email: rb.userEmail,
    password: password,
    loginMethod: "EMAIL",
    userDiv: new Date().getTime().toString(36)
  }

  // 비밀번호 암호화 
  function passBcrypt(userPassword) {
    return new Promise((res,rej) => {
        bcrypt.hash(userPassword, 10, (err,hash) => {
          if(err){
            rej("err");
          }else{
            console.log(hash);
            res(hash)
          }
        })
      })
    }


  // 유효성 검사 /비밀번호 6-20 / 이메일 = 그냥 형식에만 맞게 / 아이디 2글자 이상 20자 이하


  // 아이디 중복 체크 ( 중복이 아니라면 회원 가입 완료 / 중복이라면 중복이라는 res 출력 )
  const f = await db.duplicateCheck(userInfor.loginMethod,userInfor.email);
  console.log(f.length);
  if(f.length === 0){
    db.joinEmail(userInfor);
    res.send("Join OK");
  }else{
    res.send("중복 아이디");
  }



}));

// 카카오 로그인 관련 계정
const kakao = {
  clientID: '630231afd01507218d07fba06f16720d',
  clientSecret: 'LRpqtId10A8c7UkqYfEuh51fKLyWSiQv',
  redirectUri: 'http://localhost:3000/user/kakao/callback'
}

// 카카오 로그인 진입 / 있다면 로그인 없다면 회원가입
router.get('/kakao', (req, res) => {
  const kakaoAuthURL =
    `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_nickname,profile_image,account_email,birthday,`;
  res.redirect(kakaoAuthURL);
})

// 로그인 후 콜백 받아 정보 전달
router.get('/kakao/callback', async (req, res) => {
  let token;
  try {
    token = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        // 특정 string 넣기 
        client_id: kakao.clientID,
        client_secret: kakao.clientSecret,
        redirectUri: kakao.redirectUri,
        code: req.query.code,
        //auth/kakao/callback일때 get값으로 준 코드야
      })
      //객체를 string으로 변환 
    })
  } catch (err) {
    res.json(err.data)
  }


  //kakao에게 요청
  let user;
  try {
    user = await axios({
      method: "GET",
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${token.data.access_token}`
      }
    })
  } catch (err) {
    res.json(err.data)
  }
  //  가져온 정보 읽어오는 부분
    console.log(user);

  // 가져온 정보 중 필요한 정보 추출
  const userData = {
    loginID: user.data.id,
    nickName: user.data.properties.nickname,
    email: user.data.kakao_account.email,
    loginMethod: "KAKAO",
    userProfile: user.data.properties.profile_image,
    userDiv: new Date().getTime().toString(36)
  }

  // 해당 계정이 DB에 등록되어있는지 / 없으면 회원가입 / 있으면 로그인
  const f = await db.duplicateCheck(userData.loginMethod, userData.loginID);

  if (f[0] === undefined) {
    console.log("언디파인 회원가입 시작");
    // kakao 아이디 새로 만들기
    db.joinkakao(userData);
    res.send('회원가입');
  } else {
    console.log("로그인 토큰 제작해서 보내주기");
    res.redirect('http://localhost:8080/');
  };

  // res.send('success');
});


module.exports = router;
