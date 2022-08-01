const mysql = require('mysql');

const dataCon = mysql.createConnection({
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

module.exports = {
    dataCon,
    conpro,
    con
}