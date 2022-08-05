const { query } = require('express');
const cons = require('./DatabaseConn');
const db = cons.dataCon;
const moment = require("moment");

const wrap = require('../routes/wrapper');
const wrapper = wrap.wrapper;
// conpro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// con > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const tran = cons.tran;

// 유저 전체 읽기
function readUser() {
    const query = `select * from user`

    return conpro(query);
}

// 토큰 발급에 필요한 유저 판별값 가져오기
function readUserDIV(loginMethod,loginID) {
    const query = `select userID from loginPath where loginMethod = "${loginMethod}" and loginID = "${loginID}";`
    return conpro(query);
}

// 카카오 회원가입
function joinkakao(ud) {
    const today = moment();
    const userDate = today.format("YYYY-MM-DD")
    //login path에 추가 
    console.log(ud);
    //user DB에 추가
    const query = `insert into loginPath values("${ud.loginMethod}","${ud.loginID}","${ud.userDiv}");`
    const query2 = `insert into user(userID,Date,Email) values("${ud.userDiv}","${userDate}","${ud.email}");`
    const query3 = `insert into userProfile(userID,nickName,profileImage) values("${ud.userDiv}","${ud.nickName}","${ud.userProfile}");`
    tran(query,query2,query3);
}

// 이메일 회원가입
function joinEmail(ud) {
    const today = moment();
    const userDate = today.format("YYYY-MM-DD")
    //login path에 추가 
    //user DB에 추가
    const query = `insert into loginPath values("${ud.loginMethod}","${ud.email}","${ud.userDiv}");`
    const query2 = `insert into user(userNickName,userDate,userEmail,userDIV,userProfile,userPassword) values("${ud.nickName}","${userDate}","${ud.email}","${ud.userDiv}","${ud.profile}","${ud.password}")`
    tran(query,query2);
}

// 이메일 로그인
function loginEmail(email) {
    const query = `select userPassword from user where userEmail = "${email}"`

    return conpro(query);
}

// 메소드 별 아이디가 있는지 없는지 여부 파악하는 곳
function duplicateCheck(method,id){
    const query = `select * from loginPath where loginMethod = "${method}" and loginID = "${id}";`
    return conpro(query);
};

module.exports = {
    readUser,
    joinkakao,
    joinEmail,
    duplicateCheck,
    loginEmail,
    readUserDIV
}