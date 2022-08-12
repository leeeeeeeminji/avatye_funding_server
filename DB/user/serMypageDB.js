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

function myPageComment(userDIV) {
    const query = `select Comment from userProfile where userID ="${userDIV}";`
    return conpro(query);
}

function myProfile(userDIV) {
    const query =
        `select profileImage,nickName,Date from userProfile
        join user u 
            on userProfile.userID = u.userID
    where u.userID = "${userDIV}";`
    return conpro(query);
}

function myUploadProject(userID) {
    const query =
        `
        select  p.projectIndex,profileIMG,c.name,uP.nickName,uP.userID,p.LongTitle,summary,goalPrice,nowPrice,endDate,hc.heartCheck
        from project p
        left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
                    on hc.projectIndex = p.projectIndex
            join category c
                on p.cateIndex = c.cateIndex
            join user u
                on u.userID = p.userID
            join userProfile uP
                on u.userID = uP.userID
        where u.userID = '${userID}';
    `
    return conpro(query);
}

function myUploadCount(userID) {
    const query =
        `select count(*) as count from project where userID = '${userID}';`
    return conpro(query);
}

function myBuyProject(userID) {
    const query = `
    select  p.projectIndex,profileIMG,c.name,uP.nickName,uP.userID,p.LongTitle,summary,goalPrice,nowPrice,endDate,hc.heartCheck
    from \`order\` o
        join project p
            on o.projectIndex = p.projectIndex
        left join (select projectIndex,heartCheck from heart where userID = '${userID}') as hc
            on hc.projectIndex = p.projectIndex
        join category c
            on p.cateIndex = c.cateIndex
        join user u
            on o.userID = u.userID
        join userProfile uP
            on p.userID = uP.userID
    where o.userID = '${userID}'
    group by o.projectIndex
    order by endDate desc;`
    return conpro(query);
}

function myBuyCount(userID) {
    const query =
        `Select count(*) as count from (select count(*) as count from \`order\` where userID = '${userID}' group by projectIndex) as total;`
    return conpro(query);
}

module.exports = {
    myPageComment,
    myUploadProject,
    myBuyProject,
    myProfile,
    myUploadCount,
    myBuyCount
}