const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 전체 프로젝트 불러오기
function readProject() {
    const query = 'select * from project'

    return conpro(query);
}

// 프로젝트 등록하기
function createProject(req) {   
    const {cateIndex, userID, longTitle, shortTitle, summary, profileIMG, video, webAddress, searchTag, goalprice, beginDate, endDate, contents, giftTitle, giftDetail, giftPrice, giftCount, giftStock}= req.body;

    const insertQuery1 = `insert into project (cateIndex, userID, longTitle, shortTitle, summary, profileIMG, video, webAddress, searchTag, goalPrice, beginDate, endDate, contents) values (${cateIndex}, '${userID}', '${longTitle}', '${shortTitle}', '${summary}', '${profileIMG}', '${video}', '${webAddress}', '${searchTag}', ${goalprice}, '${beginDate}', '${endDate}', '${contents}')`;
    const insertQuery2 = `insert into projectGift (giftTitle, giftDetail, giftPrice, giftCount, giftStock) values ('${giftTitle}', '${giftDetail}', '${giftPrice}', '${giftCount}', '${giftStock}')`;

    return trans(insertQuery1, insertQuery2);
}

// 인기 프로젝트 순서로 불러오기
function bestProjectList() {
    const query = 
    `select (p.nowPrice/p.goalPrice * 100) as percent,projectIndex, LongTitle,summary,
    profileIMG, goalPrice,nowPrice,endDate,nickName,c.name
    from project p
        join category c
            on p.cateIndex = c.cateIndex
        join userProfile uP
            on p.userID = uP.userID
    where (p.nowPrice/p.goalPrice * 100) >= 100 and endDate > DATE_ADD(NOW(), INTERVAL 9 HOUR)
    order by percent desc;`
    return conpro(query);
}

module.exports = {
    readProject,
    createProject,
    bestProjectList
} 