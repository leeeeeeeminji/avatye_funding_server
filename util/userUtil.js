const jwt = require('jsonwebtoken');
const secret = 'hwan'
const db = require('../DB/user/serUserDB');


// 토큰 발급
async function newToken(loginMethod,loginID){
    const div = await db.readUserDIV(loginMethod,loginID);
    console.log(div[0].userID);
    const tokenDiv = div[0].userID;

    token = jwt.sign({
        type: 'JWT',
        userDIV: tokenDiv
    }, secret, {
        expiresIn: '15m', // 만료시간 15분
        issuer: tokenDiv
    });

    return token;
}

module.exports = {
    newToken
}