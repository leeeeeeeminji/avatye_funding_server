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
    const { cateIndex, userID, longTitle, shortTitle, summary, profileIMG, video, webAddress, searchTag, goalprice, beginDate, endDate, contents, giftTitle, giftDetail, giftPrice, giftCount, giftStock } = req.body;

    const insertQuery1 = `insert into project (cateIndex, userID, longTitle, shortTitle, summary, profileIMG, video, webAddress, searchTag, goalPrice, beginDate, endDate, contents) values (${cateIndex}, '${userID}', '${longTitle}', '${shortTitle}', '${summary}', '${profileIMG}', '${video}', '${webAddress}', '${searchTag}', ${goalprice}, '${beginDate}', '${endDate}', '${contents}')`;
    const insertQuery2 = `insert into projectGift (giftTitle, giftDetail, giftPrice, giftCount, giftStock) values ('${giftTitle}', '${giftDetail}', '${giftPrice}', '${giftCount}', '${giftStock}')`;

    return trans(insertQuery1, insertQuery2);
}

// 인기 프로젝트 순서로 불러오기
function bestProjectList() {
    const query =
        `select (p.nowPrice/p.goalPrice * 100) as percent,projectIndex, LongTitle,summary,
    profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
    from project p
        join category c
            on p.cateIndex = c.cateIndex
        join userProfile uP
            on p.userID = uP.userID
    where (p.nowPrice/p.goalPrice * 100) >= 100 and endDate > DATE_ADD(NOW(), INTERVAL 9 HOUR)
    order by percent desc;`
    return conpro(query);
}

// 신규 프로젝트
// 시작 날짜가 1주일 이내인 상품 노출
function newprojectlist() {
    const query =
        `select (p.nowPrice/p.goalPrice * 100) as percent,projectIndex, LongTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where p.beginDate > DATE_ADD((DATE_SUB(NOW(), INTERVAL 7 DAY)),INTERVAL 9 HOUR)
        order by beginDate;`
    return conpro(query);
}

// 마감 임박 프로젝트
// 마감 날짜가 1주일 이내인 상품 노출
function newprojectlist() {
    const query =
        `select (p.nowPrice/p.goalPrice * 100) as percent,projectIndex, LongTitle,summary,
        profileIMG, goalPrice,nowPrice,endDate,nickName,c.name,uP.userID
        from project p
            join category c
                on p.cateIndex = c.cateIndex
            join userProfile uP
                on p.userID = uP.userID
        where date_sub(p.endDate,INTERVAL 7 DAY) < DATE_ADD(NOW(),INTERVAL 9 HOUR)
        and p.endDate > DATE_ADD(NOW(),INTERVAL 9 HOUR)
        order by endDate;`
    return conpro(query);
}

module.exports = {
    readProject,
    createProject,
    bestProjectList,
    newprojectlist
} 