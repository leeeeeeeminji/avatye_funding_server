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
    const query = `select userComent from user where userDIV = "${userDIV}"`
    return conpro(query);
}

function myUploadProject(userDIV){
    const query = `
    select  proIndex,proProfile,cateName,userNickName,proLongTitle,proSummary,proGoal,proNowAmount,proEndDate
    from project
        join category
        on project.cateIndex = category.cateIndex
        join user
        on user.userDIV = project.userDIV
    where user.userDIV = "${userDIV}"`
    return conpro(query);
}

function myBuyProject(userDIV){
    const query = `
    select  project.proIndex,proProfile,cateName,userNickName,proLongTitle,proSummary,proGoal,proNowAmount,proEndDate
from project
    join category
    on project.cateIndex = category.cateIndex
    join user
    on user.userDIV = project.userDIV
    join \`order\` o
    on project.proIndex = o.proIndex
where o.buyUser = "143my9evd3o"`
    return conpro(query);
}




module.exports = {
    myPageComment,
    myUploadProject,
    myBuyProject
}