const cons = require('./DatabaseConn');
// conpro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// con > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;

// 상품 전체 읽기
function readUser() {
    const query = `select * from user`

    return conpro(query);
}

// 회원가입
function join(userInfor) {
    const query = `insert into
    user(userProfile, userNickName, userAddress, userDate, userComent, userWebsite, userEmail, userPassword, userPhone, userKakao, userFacebook, userNaver, userBasicAddress)
values 
("${userInfor.userProfile}","${userInfor.userNickName}","${userInfor.userAddress}","${userInfor.userDate}",
"${userInfor.userComent}","${userInfor.userWebsite}","${userInfor.userEmail}","${userInfor.userPassword}",
"${userInfor.userPhone}","${userInfor.userKakao}","${userInfor.userFacebook}","${userInfor.userNaver}",1) `

    con(query);
}


module.exports = {
    readUser,
    join
}