const { query } = require('express');
const cons = require('../DatabaseConn');
const db = cons.dataCon;
const moment = require("moment");

const wrap = require('../../util/wrapper');
const wrapper = wrap.wrapper;
// conpro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// con > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const tran = cons.tran;

function anotherPage(userDIV) {
    const query = `select Comment from userProfile where userID ="${userDIV}";`
    return conpro(query);
}

function anotherProfile(userDIV) {
    const query = `select profileImage,nickName,Date from userProfile
    join user u on userProfile.userID = u.userID
    where u.userID = "${userDIV}";`
    return conpro(query);
}

function anotherUploadProject(userDIV) {
    const query =
        `
    select  projectIndex,profileIMG,c.name,uP.nickName,p.LongTitle,summary,goalprice,nowAmount,endDate
    from project p
        join category c
            on p.cateIndex = c.cateIndex
        join user u
            on u.userID = p.userID
        join userProfile uP
            on u.userID = uP.userID
    where u.userID = "${userDIV}";
    `
    return conpro(query);
}

function anotherBuyProject(userDIV) {
    const query = `
    select  p.projectIndex,profileIMG,c.name,uP.nickName,p.LongTitle,summary,goalprice,nowAmount,endDate
    from \`order\` o
        join project p
            on o.projectIndex = p.projectIndex
        join category c
            on p.cateIndex = c.cateIndex
        join user u
            on o.userID = u.userID
        join userProfile uP
            on u.userID = uP.userID
    where o.userID = "${userDIV}";`
    return conpro(query);
}




module.exports = {
    anotherPage,
    anotherUploadProject,
    anotherBuyProject,
    anotherProfile
}