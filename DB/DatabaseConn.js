const mysql = require('mysql');
const mysql1 = require('mysql2/promise');

const dataCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'm',
    multipleStatements:true
});

const pool = mysql1.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tiger' ,
    database: 'ava_shopping'
})


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
    pool,
    conpro,
    con
}