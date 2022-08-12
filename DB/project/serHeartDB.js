const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 찜 추가 / 삭제
function heart(userID, proIndex) {
    const query =
        `call heart("${userID}","${proIndex}");`

    return conpro(query);
}

// 찜 목록
function heartList(userID) {
    const query =
        `select profileIMG,c.name,uP.nickName,longTitle,summary,goalPrice,nowPrice,endDate from heart h
        join project p
            on h.projectIndex = p.projectIndex
        join userProfile uP
            on p.userID = uP.userID
        join category c
            on p.cateIndex = c.cateIndex
    where h.userID = "${userID}" and heartCheck = 1;`

    return conpro(query);
}


module.exports = {
    heart,
    heartList
} 