const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 상품 상세 페이지
function datailProject(proIndex) {
    const query =
        `select project.projectIndex,cateIndex,project.userID,longTitle,summary,profileIMG,goalPrice,beginDate,endDate,nowPrice, cateIndex, longTitle, shortTitle, summary, profileIMG, goalprice, beginDate, endDate, nowAmount, sponsor, heart, share, contents, video, webAddress, searchTag, giftIndex, gitfTitle, giftDetail, giftPrice, giftCount, giftStock, profileImage, nickName, Comment, Private, basicAddress, phone
    from project
        left join projectGift pG
            on project.projectIndex = pG.projectIndex
        join userProfile uP
            on project.userID = uP.userID
    where project.projectIndex = "${proIndex}";`

    return conpro(query);
}


module.exports = {
    datailProject
} 