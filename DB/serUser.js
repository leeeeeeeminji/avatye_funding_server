const { query } = require('express');
const cons = require('./DatabaseConn');
const db = cons.dataCon;
const moment = require("moment");
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

// 카카오 회원가입
function joinkakao(ud) {
    const today = moment();
    const userDate = today.format("YYYY-MM-DD")
    //login path에 추가 
    //user DB에 추가
    const query = `insert into loginPath values("${ud.loginMethod}","${ud.loginID}","${ud.userDiv}");`
    const query2 = `insert into user(userNickName,userDate,userEmail,userDIV,userProfile) values("${ud.nickName}","${userDate}","${ud.email}","${ud.userDiv}","${ud.userProfile}")`
    tran(query,query2);
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

// 메소드 별 아이디가 있는지 없는지 여부 파악하는 곳
function duplicateCheck(method,id){
    const query = `select * from loginPath where loginMethod = "${method}" and loginID = "${id}";`
    return conpro(query);
};

module.exports = {
    readUser,
    joinkakao,
    joinEmail,
    duplicateCheck
}