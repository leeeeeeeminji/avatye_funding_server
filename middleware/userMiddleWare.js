const jwt = require('jsonwebtoken');
const secret = 'hwan'
const db = require('../DB/serUserDB');


// 토큰 발급
async function newToken(loginMethod,loginID){
    const div = await db.readUserDIV(loginMethod,loginID);
    console.log(div[0].userID);
    const tokenDiv = div[0].userID;

    token = jwt.sign({
        type: 'JWT',
        userDIV: tokenDiv
    }, secret, {
        expiresIn: '1m', // 만료시간 15분
        issuer: tokenDiv
    });

    return token;
}

// 토큰 검증
async function verifyToken(token){
    try{
        decodeToken = jwt.verify(token,secret);
        return decodeToken;
    }catch(err){
        if(err.name === 'TokenExpireError'){
            return {
                code:419,
                massage: '토큰이 만료되었습니다.'
            }
        }
        return {
            code: 401,
            massage: '유효하지 않은 토큰입니다.'
        }
    }
}

module.exports = {
    newToken,
    verifyToken
}