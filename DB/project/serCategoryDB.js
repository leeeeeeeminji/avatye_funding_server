const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 전체 카테고리 불러오기
function readCategory(req) {
    const query =
        `select name,group_concat(detailName) as catename from category group by name;`

    return conpro(query);
}



module.exports = {
    readCategory
} 