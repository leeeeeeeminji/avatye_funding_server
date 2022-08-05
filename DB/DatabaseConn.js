const mysql = require('mysql');

const dataCon = mysql.createPool({
    host: 'avatumble.catfwgqmvd2y.ap-northeast-2.rds.amazonaws.com',
    user: 'root',
    password: 'avatyetiger',
    port: 3306,
    database: 'ava_tumblbug',
    multipleStatements:true
});

// DB 커넥션 후 Promise 반환
function conpro(query) {
    return new Promise((res, rej) => {
        dataCon.query(query, function (err, rows) {
            if (err) {
                rej("Error");
            } else {
                console.log(rows);
                res(rows);
            }
        })
    })

}

// DB 커넥션
function con(query){
    dataCon.query(query, function (err) {
        if (err) {
            throw err
        } 
    })
}

// 트랜젝션
function tran(query1,query2,query3) {
    return new Promise((res,rej) => {
    dataCon.getConnection(function(err,conn){
        if(!err){
            conn.beginTransaction(function(err){
                if(err){
                    console.log("트랜젝션 에러");
                    res("ERR")
                }else{
                    conn.query(query1 + query2 + query3,function(err,rows){
                        if(!err){
                            conn.commit();
                        }else{
                            console.log("쿼리 에러" + err);
                            res("ERR")
                            conn.rollback();
                        }
                    })
                }
            })
        }else{
            console.log("에러");
            res("ERR")
        }
        conn.release();
    })
    console.log("성공");
    res("OK")
})
}

module.exports = {
    dataCon,
    conpro,
    con,
    tran
}