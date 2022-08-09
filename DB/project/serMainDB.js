const cons = require('../DatabaseConn');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const conpro = cons.conpro;
const con = cons.con;
const trans = cons.tran;

// 메인 화면 주목할만한 프로젝트
// 일단 목표 금액이 가장 높은 프로젝트 표시
function mdProject(){
    const query = 
    `select 
    projectIndex,longTitle,profileImage,goalprice,nowAmount,nickName,c.name 
    from project
        join userProfile uP 
            on project.userID = uP.userID
        join category c 
            on project.cateIndex = c.cateIndex
    order by goalprice desc
    limit 8;`

    return conpro(query);
}

// 메인 화면 주목할만한 프로젝트
// 일단 판매율 가장 높은 프로젝트 표시
function bestProject() {
    const query = 
    `select
    (goalprice/nowAmount) as percent,projectIndex, longTitle,
    profileIMG, goalprice,endDate,nickName,c.name
    from project p
        join category c
            on p.cateIndex = c.cateIndex
        join userProfile uP
            on p.userID = uP.userID
    where endDate > now()
    order by percent desc
        limit 10;`
    return conpro(query);
}


module.exports = {
    mdProject,
    bestProject
} 