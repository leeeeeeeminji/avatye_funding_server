const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// follow 추가 삭제
function follow(userID,followedID) {
    const query = 
    `call follow("${userID}","${followedID}");`

    return conpro(query);
}

module.exports = {
    follow,
} 