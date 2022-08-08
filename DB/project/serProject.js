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

// proID에 해당하는 프로젝트 상세 불러오기
function findProject(req) {
    const proIndex = req.params.id;
    const query = `select * from project where proIndex = ${proIndex}`

    return conpro(query);
}

// 프로젝트 등록하기
function createProject(req) {   
    const {cateIndex, userID, longTitle, shortTitle, summary, profileIMG, video, webAddress, searchTag, goalprice, beginDate, endDate, contents, giftTitle, giftDetail, giftPrice, giftCount, giftStock}= req.body;

    const insertQuery1 = `insert into project (cateIndex, userID, longTitle, shortTitle, summary, profileIMG, video, webAddress, searchTag, goalprice, beginDate, endDate, contents) values (${cateIndex}, '${userID}', '${longTitle}', '${shortTitle}', '${summary}', '${profileIMG}', '${video}', '${webAddress}', '${searchTag}', ${goalprice}, '${beginDate}', '${endDate}', '${contents}')`;
    const insertQuery2 = `insert into projectGift (giftTitle, giftDetail, giftPrice, giftCount, giftStock) values ('${giftTitle}', '${giftDetail}', '${giftPrice}', '${giftCount}', '${giftStock}')`;

    return trans(insertQuery1, insertQuery2);
}

// 카테고리에 해당하는 프로젝트 불러오기
function readProjectByCate(req) {
    const category = req.params.category;
    const query = `select projectIndex, p.cateIndex, c.name, uP.nickName, longTitle, summary, profileIMG, endDate, nowAmount, ((nowAmount / goalprice) * 100) as percent from project p join category c on p.cateIndex = c.cateIndex join userProfile uP on p.userID = uP.userID where c.name = ${category}`

    return conpro(query);
}

// 메인 화면 주목할만한 프로젝트
function mdProject(){
    const query = `select projectIndex,longTitle,profileImage,goalprice,nowAmount,nickName,c.name from project
    join userProfile uP on project.userID = uP.userID
    join category c on project.cateIndex = c.cateIndex
    order by goalprice desc
    limit 8;`

    return conpro(query);
}

module.exports = {
    readProject,
    createProject,
    findProject,
    readProjectByCate,
    mdProject
} 