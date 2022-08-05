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

function myPageComment(userDIV){
    const query = `select Comment from userProfile where userID ="${userDIV}";`
    return conpro(query);
}

function myUploadProject(userID){
    const query = 
    `
    select  projectIndex,proProfile,c.name,uP.nickName,p.LongTitle,proSummary,proGoal,proNowAmount,proEndDate
    from project p
        join category c
        on p.cateIndex = c.cateIndex
        join user u
        on u.userID = p.userID
        join userProfile uP
        on u.userID = uP.userID
    where u.userID = "${userID}";
    `
    return conpro(query);
}

function myBuyProject(userDIV){
    const query = `
    select  projectIndex,proProfile,c.name,uP.nickName,p.LongTitle,proSummary,proGoal,proNowAmount,proEndDate
    from project p
        join category c
        on p.cateIndex = c.cateIndex
        join user u
        on u.userID = p.userID
        join userProfile uP
        on u.userID = uP.userID
    where p.userID = "${userDIV}";`
    return conpro(query);
}




module.exports = {
    myPageComment,
    myUploadProject,
    myBuyProject
}