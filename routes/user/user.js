var express = require('express');
var router = express.Router();
const db = require('../../DB/user/serUserDB');
const util = require('../../util/userUtil');
const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

/* 유저 조회 */ // 토큰 가져온거 테스트 중
router.get('/', wrapper(async function (req, res, next) {
}));

// 이메일 로그인
router.post('/login', [
  body('userEmail').isEmail(),
  body('userPassword').isLength({ min: 6, max: 20 }),
], wrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const rb = req.body;
  // 유저가 입력한 이메일 패스워드
  const userEmail = rb.userEmail;
  const userPassword = rb.userPassword;
  // DB에서 해당 아이디에 매칭되어있는 해쉬된 비밀번호 가져오기
  const password = await db.loginEmail(userEmail);
  let dbPassword = "";
  // 만약 매칭되는 비밀번호가 없다면 ( 아이디가 없다면 ) res로 에러 출력
  if (password.length === 0) {
    res.send(
      { login: false }
    );
  } else {
    // 매칭되는 비밀번호가 있다면 dbPassword에 값 넣어줌
    dbPassword = password[0].Password;
    // 유저 입력 비밀번호, 가져온 비밀번호 비교 후 같으면 true 반환
    let loginCheck = await bcrypt.compare(userPassword, dbPassword);
    if (loginCheck === true) {
      const nick = await db.loginNickname("EMAIL", userEmail);
      const token = await util.newToken("EMAIL", userEmail);
      res.send(
        {
          login: loginCheck,
          token: token,
          nickName: nick[0].nickName
        }
      );
    } else {
      res.send({
        login: loginCheck
      })
    }
  }
}))

// 이메일 회원 가입
// 비밀번호 6-20 / 이메일 = 그냥 형식에만 맞게 / 닉네임 2글자 이상 20자 이하
router.post('/join',
  [
    body('userEmail').isEmail(),
    body('userPassword').isLength({ min: 6, max: 20 }),
    body('userNickName').isLength({ min: 2, max: 20 })
  ],
  wrapper(async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const rb = req.body;

    // 비밀번호 암호화 하기
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(rb.userPassword, salt);

    // DB로 넘겨줄 값 정리
    let userInfor = {
      nickName: rb.userNickName,
      email: rb.userEmail,
      password: password,
      loginMethod: "EMAIL",
      userDiv: (new Date().getTime() * Math.floor((Math.random() * 9999))).toString(36)
    }

    // 아이디 중복 체크 ( 중복이 아니라면 회원 가입 완료 / 중복이라면 중복이라는 res 출력 )
    const f = await db.duplicateCheck(userInfor.loginMethod, userInfor.email);
    if (f.length === 0) {
      db.joinEmail(userInfor);
      res.send("OK");
    } else {
      res.send("article");
    }

  }));

// 카카오 로그인
router.post('/kakao', wrapper(async (req, res) => {
  const rb = req.body;
  console.log(rb);
  // 가져온 정보 중 필요한 정보 추출
  const userData = {
    loginID: rb.loginID,
    nickName: rb.nickName,
    email: rb.email,
    loginMethod: "KAKAO",
    userProfile: rb.userProfile,
    userDiv: (new Date().getTime() * Math.floor((Math.random() * 9999))).toString(36)
  }

  // 해당 계정이 DB에 등록되어있는지 / 없으면 회원가입 / 있으면 로그인
  const f = await db.duplicateCheck(userData.loginMethod, userData.loginID);

  if (f[0] === undefined) {
    console.log("언디파인 회원가입 시작");

    // kakao 아이디 새로 만들기
    let f = await db.joinkakao(userData);
    console.log("아이디 만들기 ㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
    console.log(f);
    // kakao 아이디 만들다가 오류가 나면 회원가입 오류 반환
    if (f === "ERR") {
      res.send("회원가입 오류");
    }
    // 트랜젝션 결과가 OK라면 토큰 발급 후 반환
    if (f === "OK") {
      const nick = await db.loginNickname(userData.loginMethod, userData.loginID);
      const token = await util.newToken(userData.loginMethod, userData.loginID);
      res.send({
        login: true,
        token: token,
        nickName: nick[0].nickName
      });
    }
  } else {
    const nick = await db.loginNickname(userData.loginMethod, userData.loginID);
    const token = await util.newToken(userData.loginMethod, userData.loginID);
    res.send({
      login: true,
      token: token,
      nickName: nick[0].nickName
    });
  };

}));


module.exports = router;
